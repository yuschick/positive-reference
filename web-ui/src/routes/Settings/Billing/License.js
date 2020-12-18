import { useSession } from 'context/SessionContext/SessionContext';
import React, { useEffect, useState } from 'react';
import Page from 'components/Page';
import Helmet from 'react-helmet';
import Heading from 'components/Heading';
import LicenseDetails from 'routes/Settings/Billing/LicenseDetails';
import LicenseForm from 'routes/Settings/Billing/LicenseForm';
import userLicenseApi from 'routes/Settings/Billing/userLicenseApi';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useToast } from 'context/ToastContext';
import UpdatePaymentMethodForm from 'routes/Settings/Billing/UpdatePaymentMethodForm';
import Text from 'components/Text';

const License = () => {
  const { user } = useSession();
  const { addToast } = useToast();

  const stripe = useStripe();
  const elements = useElements();

  const [license, setLicense] = useState(null);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);

  const [plans, setPlans] = useState([]);
  const [taxRates, setTaxRates] = useState([]);

  const stopProcessing = () => setProcessing('');

  const setErrorStopProcessing = err => {
    setError(err);
    stopProcessing();
  };

  useEffect(() => {
    if (error) addToast(error.message, true);
  }, [error]);

  useEffect(() => {
    fetchUserLicense();
  }, []);

  useEffect(() => {
    fetch('/api/v1/plans')
      .then(res => res.json())
      .then(setPlans);
  }, []);

  useEffect(() => {
    fetch('/api/v1/tax-rates')
      .then(res => res.json())
      .then(setTaxRates);
  }, []);

  // fetchUserLicense fetches user's license. Optionally can be asked to retry for N amount of times
  // if there are expected to be changes to the license due to asynchronous processing.
  const fetchUserLicense = async ({ expectingChangesRetries } = {}) => {
    setProcessing('loading-license');

    const license = await userLicenseApi.fetchLicense({ userId: user.id });

    // If the license is expected to being processed, fetch it again in 0.5s as it might change.
    // Limit retries using the `expectingChangesRetries` parameter.
    if (license && expectingChangesRetries > 0) {
      if (license.Status === 'incomplete' || !license.PaymentMethodReady) {
        setTimeout(
          () => fetchUserLicense({ expectingChangesRetries: expectingChangesRetries - 1 }),
          500,
        );
        return;
      }
    }

    setLicense(license);
    setErrorStopProcessing(null);
  };

  const stripeCreatePaymentMethod = async () => {
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      throw new Error('Stripe card element not found');
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) throw error;

    return paymentMethod.id;
  };

  const handleActionRequired = async ({ license, paymentMethodId }) => {
    if (license.ActionRequired === 'confirmCardSetup') {
      const result = await stripe.confirmCardSetup(license.ClientSecret, {
        payment_method: paymentMethodId,
      });

      if (result.error) {
        // Start code flow to handle updating the payment details
        // Display error message in your UI.
        // The card was declined (i.e. insufficient funds, card has expired, etc)
        setError(result.error);
      }
    }

    if (license.ActionRequired === 'confirmCardPayment') {
      const result = await stripe.confirmCardPayment(license.ClientSecret, {
        payment_method: paymentMethodId,
      });

      if (result.error) {
        // Start code flow to handle updating the payment details
        // Display error message in your UI.
        // The card was declined (i.e. insufficient funds, card has expired, etc)
        setError(result.error);
      }
    }

    if (license.ActionRequired === 'requirePaymentMethod') {
      setError(new Error('Your card was declined.'));
    }
  };

  const createUserLicense = async ({ planId, taxRateId, allowExceedingTrialLimit }) => {
    setProcessing('create');

    try {
      // Use card information from the form to create payment method directly in Stripe.
      const paymentMethodId = await stripeCreatePaymentMethod();

      const license = await userLicenseApi.createLicense({
        userId: user.id,
        paymentMethodId: paymentMethodId,
        planId: planId,
        taxRateId: taxRateId,
        allowExceedingTrialLimit: allowExceedingTrialLimit === "true",
      });

      // Perform additional user-facing actions when it's required to successfully take the
      // pamyent method into use.
      await handleActionRequired({ license, paymentMethodId });

      return fetchUserLicense({ expectingChangesRetries: 5 });
    } catch (error) {
      await fetchUserLicense();
      setErrorStopProcessing(error);

      // If creating a payment in Stripe fails (card declined, etc.), then our system will
      // have a license with cancelled status. To show it properly in our billing prototypeview,
      // let's try to fetch the license even when we encountered an error during the creation process.
      // The license should display with a message that it has been cancelled or expired, and the
      // customer should subscribe again.
      // return fetchUserLicense();
    }
  };

  const updateUserLicense = ({ cancelAtPeriodEnd }) => {
    setProcessing('update');

    return userLicenseApi
      .updateLicense({ userId: user.id, cancelAtPeriodEnd: cancelAtPeriodEnd })
      .then(fetchUserLicense)
      .catch(setErrorStopProcessing);
  };

  const updateUserLicensePaymentMethod = async () => {
    setProcessing('update-payment-method');

    try {
      // Use card information from the form to create payment method directly in Stripe.
      const paymentMethodId = await stripeCreatePaymentMethod();

      const license = await userLicenseApi.updateLicensePaymentMethod({
        userId: user.id,
        paymentMethodId,
      });

      // Perform additional user-facing actions when it's required to successfully take the
      // pamyent method into use.
      await handleActionRequired({ license, paymentMethodId });

      return fetchUserLicense({ expectingChangesRetries: 5 });
    } catch (error) {
      setErrorStopProcessing(error);
    }
  };

  const cancelUserLicense = () => {
    setProcessing('cancel');

    return userLicenseApi
      .cancelLicense({ userId: user.id })
      .then(fetchUserLicense)
      .catch(setErrorStopProcessing);
  };

  const adminCancelAndDeleteLicenseImmediately = () => {
    setProcessing('admin-cancel');

    return userLicenseApi
      .adminCancelAndDeleteLicense({ licenseId: license.ID })
      .then(fetchUserLicense)
      .catch(setErrorStopProcessing);
  };

  return (
    <Page>
      <Helmet>
        <title>Billing | Positive</title>
      </Helmet>

      <Heading as="h1" appearAs="h1-jumbo">
        Billing [prototype]
      </Heading>

      <LicenseDetails
        license={license}
        updateUserLicense={updateUserLicense}
        cancelUserLicense={cancelUserLicense}
        adminCancelAndDeleteLicenseImmediately={adminCancelAndDeleteLicenseImmediately}
        processing={processing}
      />

      {!plans?.length ? (
        <Text as="p">DEBUG NOTE: No plans available (probably needs sync).</Text>
      ) : null}
      {!taxRates?.length ? (
        <Text as="p">DEBUG NOTE: No tax rates available (probably needs sync).</Text>
      ) : null}

      {(!license || (license.Status !== 'trialing' && license.Status !== 'active')) &&
      plans?.length &&
      taxRates?.length ? (
        <LicenseForm
          createUserLicense={createUserLicense}
          processing={processing}
          error={error}
          cardElementOptions={CARD_ELEMENT_OPTIONS}
          plans={plans}
          taxRates={taxRates}
        />
      ) : null}

      {license &&
      !license.PaymentMethodReady &&
      (license.Status === 'trialing' || license.Status === 'active') ? (
        <UpdatePaymentMethodForm
          updateUserLicensePaymentMethod={updateUserLicensePaymentMethod}
          processing={processing}
          error={error}
          cardElementOptions={CARD_ELEMENT_OPTIONS}
        />
      ) : null}
    </Page>
  );
};

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '24px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

export default License;
