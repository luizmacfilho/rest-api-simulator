const exceptions = {
  unauthorized: { error: { code: 401, status: 401, message: "Unauthorized" } },
  notFound: { error: { code: 404, status: 404, message: 'Not found' } },
  notAllowed: { error: { code: 405, status: 405, message: "Method not allowed" } },
};

module.exports = {
  throwUnauthorized() { throw exceptions.unauthorized; },
  throwNotFound() { throw exceptions.notFound; },
  throwMethodNotAllowed() { throw exceptions.notAllowed; },
};
