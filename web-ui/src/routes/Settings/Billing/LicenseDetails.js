import Div from 'components/Div';
import Card from 'components/Card';
import Heading from 'components/Heading';
import Text from 'components/Text';
import PillButton from 'components/buttons/PillButton';
import React from 'react';

const LicenseDetails = ({
  license,
  updateUserLicense,
  cancelUserLicense,
  adminCancelAndDeleteLicenseImmediately,
  processing,
}) => (
  <Div marginTop="xl">
    <Card alignItems="flex-start">
      <Heading as="h2">Your license</Heading>

      <Div marginTop="xs">
        {license ? (
          <>
            {license.Status === 'trialing' ? (
              <LicenseTrialing
                license={license}
                processing={processing}
                cancelUserLicense={cancelUserLicense}
              />
            ) : license.Status === 'active' ? (
              <LicenseActive
                license={license}
                processing={processing}
                updateUserLicense={updateUserLicense}
              />
            ) : license.Status === 'incomplete' ? (
              <Div marginTop="md">
                {processing ? (
                  <Text as="p">Your license is being created, please wait...</Text>
                ) : (
                  <Text as="p">
                    Subscription process didn't finish due to unsuccessful payment method
                    verification. Please try again. If problems persist, please try another payment
                    method and/or contact us for further assistance.
                  </Text>
                )}
              </Div>
            ) : (
              <Div>
                <Div marginTop="md">
                  <Text as="p">
                    Your license has been cancelled or it has expired. Please subscribe again to get
                    a new license.
                  </Text>
                </Div>

                <Div marginTop="md">
                  <Text as="p">
                    <b>TESTING NOTE!</b>
                    <br />
                    You cannot make any changes in See The Good. To be able to fully use STG, please
                    cancel and delete your license below. <br />
                    This is only for testing period. In the final version even full absence of a
                    license limits the usage of the product (exact details TBD).
                  </Text>
                </Div>
              </Div>
            )}

            <Div marginTop="xl">
              <PillButton
                label="Cancel and delete my license immediately [FOR TESTING ONLY]"
                disabled={!!processing}
                spinner={processing === 'admin-cancel'}
                onClick={adminCancelAndDeleteLicenseImmediately}
              />

              <Div marginTop="xl">
                <Text as="p">
                  <b>TESTING NOTES</b>
                </Text>
                <Text as="p">
                  Final version will definitely display more information about the license in a
                  human-friendly form.
                </Text>
                <Text as="p">License status: {license.Status}</Text>
              </Div>

              <Div marginTop="xs"></Div>
            </Div>
          </>
        ) : (
          <Text>You don't have a license yet. Please subscribe below to get one.</Text>
        )}
      </Div>
    </Card>
  </Div>
);

const LicenseTrialing = ({ license, processing, cancelUserLicense }) => (
  <>
    <Div marginTop="md">
      {license.PaymentMethodReady ? (
        <Text as="p">
          Your trial will end and card will be charged automatically at{' '}
          <b>{formatTime(license.TrialEndsAt)}</b>
        </Text>
      ) : (
        <Text as="p">
          Your trial will end at <b>{formatTime(license.TrialEndsAt)}</b>. Please update your
          payment method to continue using Positive after trial period end.
        </Text>
      )}
    </Div>

    <Div marginTop="md">
      <PillButton
        label="Cancel my trial immediately"
        disabled={!!processing}
        spinner={processing === 'cancel'}
        onClick={cancelUserLicense}
      />
    </Div>
  </>
);

const LicenseActive = ({ license, processing, updateUserLicense }) => (
  <>
    <Div marginTop="md">
      {license.CancelAt ? (
        <Text as="p">
          Your license will cancel at <b>{formatTime(license.CancelAt)}</b>
        </Text>
      ) : license.PaymentMethodReady ? (
        <Text as="p">
          Your license will renew and card will be charged automatically at{' '}
          <b>{formatTime(license.EndsAt)}</b>
        </Text>
      ) : (
        <Text as="p">
          Please update your payment method to continue using Positive after{' '}
          <b>{formatTime(license.EndsAt)}</b>
        </Text>
      )}
    </Div>

    <Div marginTop="md">
      {license.CancelAt ? (
        <PillButton
          label="Renew my license automatically"
          disabled={!!processing}
          spinner={processing === 'update'}
          onClick={() => updateUserLicense({ cancelAtPeriodEnd: false })}
        />
      ) : (
        <PillButton
          label="Stop renewing my license automatically"
          disabled={!!processing}
          spinner={processing === 'update'}
          onClick={() => updateUserLicense({ cancelAtPeriodEnd: true })}
        />
      )}
    </Div>
  </>
);

const formatTime = timeString => new Date(timeString).toLocaleDateString('fi-FI');

export default LicenseDetails;
