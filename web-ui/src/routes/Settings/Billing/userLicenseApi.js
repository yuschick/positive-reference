import { url } from 'config';

// TODO: create proper API with proper types in the correct place. This here is a low effort thing
//  for the prototyping period.
//  Also the URLs are only for user licenses. In some situations it should be for both user or group.

const fetchLicense = ({ userId }) =>
  fetch(url.user.license.make({ userId })).then(response => {
    if (response.status === 404) {
      return null;
    }

    if (response.status >= 400) {
      throw new Error(`Get license request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  });

const createLicense = async ({
  userId,
  paymentMethodId,
  planId,
  taxRateId,
  allowExceedingTrialLimit,
}) => {
  const response = await fetch(url.user.license.make({ userId }), {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      StripePaymentMethodId: paymentMethodId,
      PlanID: planId,
      TaxRateID: taxRateId,
      AllowExceedingTrialLimit: allowExceedingTrialLimit,
    }),
  });

  const json = await response.json();

  if (response.status >= 400) {
    throw new Error(`Creating license failed: ${errorMessageFromJSON(json)}`);
  }

  return json;
};

const updateLicense = async ({ userId, cancelAtPeriodEnd }) => {
  let response = await fetch(url.user.license.make({ userId }), {
    method: 'PATCH', // case-sensitive because reasons
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      CancelAtPeriodEnd: cancelAtPeriodEnd,
    }),
  });

  const json = await response.json();

  if (response.status >= 400) {
    throw new Error(`Updating license failed: ${errorMessageFromJSON(json)}`);
  }

  return json;
};

const updateLicensePaymentMethod = async ({ userId, paymentMethodId }) => {
  let response = await fetch(url.user.license.makePaymentMethod({ userId }), {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      PaymentMethodID: paymentMethodId,
    }),
  });

  const json = await response.json();

  if (response.status >= 400) {
    throw new Error(`Updating license's payment method failed: ${errorMessageFromJSON(json)}`);
  }

  return json;
};

const cancelLicense = async ({ userId }) => {
  let response = await fetch(url.user.license.make({ userId }), {
    method: 'delete',
  });

  const json = await response.json();

  if (response.status >= 400) {
    throw new Error(`Cancel license request failed: ${errorMessageFromJSON(json)}`);
  }

  return json;
};

const adminCancelAndDeleteLicense = async ({ licenseId }) => {
  let response = await fetch(`/api/v1/unsafe/licenses/${licenseId}`, {
    method: 'delete',
  });

  const json = await response.json();

  if (response.status >= 400) {
    throw new Error(
      `Admin cancel and delete license request failed: ${errorMessageFromJSON(json)}`
    );
  }

  return json;
};

const errorMessageFromJSON = json => {
  if (json.error && json.error[0] && json.error[0].msg) {
    return json.error[0].msg;
  }

  if (json.privateError && json.privateError[0] && json.privateError[0].msg) {
    return json.privateError[0].msg;
  }

  return 'Unknown error';
};

export default {
  fetchLicense,
  createLicense,
  updateLicense,
  updateLicensePaymentMethod,
  cancelLicense,
  adminCancelAndDeleteLicense,
};
