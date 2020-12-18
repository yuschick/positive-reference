import { useForm } from 'react-hook-form';
import { CardElement } from '@stripe/react-stripe-js';
import Div from 'components/Div';
import Card from 'components/Card';
import Heading from 'components/Heading';
import Text from 'components/Text';
import SelectBlock from 'components/SelectBlock';
import PillButton from 'components/buttons/PillButton';
import React, { useEffect } from 'react';
import Checkbox from 'components/Checkbox';
import styled from 'styled-components';
import { spacing } from 'theme';

const LicenseForm = ({
  createUserLicense,
  processing,
  error,
  cardElementOptions,
  plans,
  taxRates,
}) => {
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { allowExceedingTrialLimit: true },
  });

  useEffect(() => {
    // This would be according to user's geographical location.
    const selectedTaxRateID = taxRates.find(taxRate => taxRate.Region === 'FI')?.ID;

    if (selectedTaxRateID) {
      reset({ taxRateId: selectedTaxRateID });
    }
  }, []);

  return (
    <Div marginTop="xl">
      <Card alignItems="flex-start">
        <Heading as="h2">Subscribe</Heading>
        <Div marginTop="xs">
          <Text>Subscription gives you a license and full access to Positive.</Text>
        </Div>

        <Div marginTop="xxl" size="75% !important">
          <Heading as="h3">1. Select your plan</Heading>
          <Div marginTop="md">
            <SelectBlock.Group name="planId" register={register({ required: true })}>
              {plans.map(plan => (
                <SelectBlock.Button
                  type="radio"
                  key={plan.ID}
                  label={planLabel(plan)}
                  value={plan.ID}
                />
              ))}
            </SelectBlock.Group>
          </Div>
        </Div>

        <Div marginTop="xxl" size="75% !important">
          <Heading as="h3">2. Enter your payment details</Heading>

          <TestCards />

          <Div marginTop="lg">
            <CardElement options={cardElementOptions} />
          </Div>
        </Div>

        <Div marginTop="xxl" size="75% !important">
          <Heading as="h3">3. Country of residence</Heading>
          <Text as="i">
            Testing note: We need it for VAT. Here would be options for all countries where the
            service would be offered.
          </Text>
          <Div marginTop="md">
            <select
              name="taxRateId"
              id="taxRateId"
              style={{ padding: '0.5rem 1rem', width: '50%' }}
              ref={register({ required: true })}
            >
              {taxRates.map(taxRate => (
                <option key={taxRate.ID} value={taxRate.ID}>
                  {taxRateTranslated(taxRate)}
                </option>
              ))}
            </select>
          </Div>
        </Div>

        <Div marginTop="xxl">
          <Heading as="h3">4. Activate your license</Heading>
          <Text as="p" color="alert">
            {error ? error.message : null}
          </Text>

          <StyledCheckbox
            label="Skip trial limit check (allows multiple trials for the same user or card)"
            name="allowExceedingTrialLimit"
            value="true"
            register={register}
          />

          <PillButton
            marginTop="sm"
            label={processing ? 'Processing...' : 'Confirm'}
            disabled={!!processing}
            spinner={processing === 'create'}
            onClick={handleSubmit(createUserLicense)}
          />
        </Div>
      </Card>
    </Div>
  );
};

const StyledCheckbox = styled(Checkbox)`
  margin: ${spacing('md')} 0;
`;

const planLabel = ({ PriceCents, Interval, TrialPeriodDays }) => {
  const period = { yearly: 'year', monthly: 'month', daily: 'day' }[Interval];
  const price = `${PriceCents / 100}€/${period}`;

  if (TrialPeriodDays) {
    return `${TrialPeriodDays}-day trial, then ${price}`;
  } else {
    return `${price} (no trial)`;
  }
};

const taxRateTranslated = ({ Region }) => ({ EE: 'Estonia', FI: 'Finland' }[Region]);

export const TestCards = () => (
  <Div marginTop="md">
    <Text as="p">
      <b>TESTING CARDS</b>
    </Text>
    <br />
    <ul style={{ listStyleType: 'none' }}>
      <li>
        <b>Succeeds right away</b>
      </li>
      <li>Card number: 4242 4242 4242 4242</li>
    </ul>
    <br />
    <ul style={{ listStyleType: 'none' }}>
      <li>
        <b>Requires security confirmation through customer's bank</b>
      </li>
      <li>Card number: 4000 0025 0000 3155</li>
    </ul>
    <br />
    <ul style={{ listStyleType: 'none' }}>
      <li>
        <b>Fails with card declined</b>
      </li>
      <li>Card number: 4000 0000 0000 0002</li>
    </ul>
    <br />
    <ul style={{ listStyleType: 'none' }}>
      <li>
        <b>For all cards:</b>
      </li>
      <li>Date: Any future date (MM/YY)</li>
      <li>CVC: Any 3 digits</li>
      <li>ZIP: Any 5 digits</li>
    </ul>
    <br />
    <ul style={{ listStyleType: 'none' }}>
      <li>
        Find more testing cards here:{' '}
        <a href="https://stripe.com/docs/testing">stripe.com/docs/testing</a>
      </li>
    </ul>
  </Div>
);

export default LicenseForm;
