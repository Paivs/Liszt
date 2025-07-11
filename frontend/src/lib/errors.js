export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ProfileIncompleteError extends Error {
  constructor(message = "Perfil incompleto.") {
    super(message);
    this.name = "ProfileIncompleteError";
  }
}
