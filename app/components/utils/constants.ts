export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const INVALID_EMAIL = "Please enter a valid email address";

export const INVALID_PASSWORD =
  "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character";

export const INVALID_NAME = "Name must contain at least 2 characters";
