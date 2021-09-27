class UnreachableTypeError extends Error {
  constructor(_: never, message: string) {
    super(`Unreachable type error: ${message}`);
  }
}

export default UnreachableTypeError;
