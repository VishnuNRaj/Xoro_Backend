class BadRequestError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'BadRequestError';
    }
  }
  
  class UnauthorizedError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'UnauthorizedError';
    }
  }
  
  class ForbiddenError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ForbiddenError';
    }
  }
  
  class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
    }
  }
  
  class ConflictError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ConflictError';
    }
  }
  
  class InvalidCredentialsError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InvalidCredentialsError';
    }
  }
  
  class InternalServerError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'InternalServerError';
    }
  }
  
  export {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InvalidCredentialsError,
    InternalServerError
  };
  