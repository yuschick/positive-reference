import React from 'react';
import Div from 'components/Div';
import Card from 'components/Card';
import Heading from 'components/Heading';
import Text from 'components/Text';
import { CardElement } from '@stripe/react-stripe-js';
import PillButton from 'components/buttons/PillButton';
import { TestCards } from 'routes/Settings/Billing/LicenseForm';

const UpdatePaymentMethodForm = ({
  updateUserLicensePaymentMethod,
  processing,
  error,
  cardElementOptions,
}) => {
  return (
    <Div marginTop="xl">
      <Card alignItems="flex-start">
        <Div size="75% !important">
          <Heading as="h2">Update payment method</Heading>

          <TestCards />

          <Div marginTop="lg">
            <CardElement options={cardElementOptions} />
          </Div>
        </Div>

        <Div marginTop="md">
          <Text as="p">{error ? error.message : null}</Text>
          <PillButton
            marginTop="sm"
            label={processing ? 'Processing...' : 'Confirm'}
            disabled={!!processing}
            spinner={processing === 'update-payment-method'}
            onClick={updateUserLicensePaymentMethod}
          />
        </Div>
      </Card>
    </Div>
  );
};

export default UpdatePaymentMethodForm;
