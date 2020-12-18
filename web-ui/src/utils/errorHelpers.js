const status = {
  badRequest: 400,
  conflict: 409,
};

const makeErrorStatusChecker = status => err => err.status && err.status === status;

const errIsBadRequest = makeErrorStatusChecker(status.badRequest);
const errIsConflict = makeErrorStatusChecker(status.conflict);

export { errIsBadRequest, errIsConflict };
