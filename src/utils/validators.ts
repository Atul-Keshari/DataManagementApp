// src/utils/validators.ts

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {isValid: false, errorMessage: 'Invalid email address'};
  }
  return {isValid: true};
};

export const validateName = (name: string): ValidationResult => {
  if (name.trim().length === 0) {
    return {isValid: false, errorMessage: 'Name cannot be empty'};
  }
  return {isValid: true};
};

export const validatePassword = (password: string): ValidationResult => {
  if (password.trim().length < 6) {
    return {
      isValid: false,
      errorMessage: 'Password must be at least 6 characters long',
    };
  }
  return {isValid: true};
};
