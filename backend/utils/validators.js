// Email validation
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Name validation
export const isValidName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// Password validation (min 6 chars, at least 1 letter and 1 number)
export const isValidPassword = (password) => {
  return password && password.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
};

// Title validation
export const isValidTitle = (title) => {
  return title && title.trim().length >= 3 && title.trim().length <= 100;
};

// Description validation
export const isValidDescription = (description) => {
  return description && description.trim().length >= 10 && description.trim().length <= 2000;
};

// Budget 
export const isValidBudget = (budget) => {
  const num = parseFloat(budget);
  return !isNaN(num) && num > 0 && num <= 1000000;
};

// Price validation
export const isValidPrice = (price) => {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0 && num <= 1000000;
};

// Message validation
export const isValidMessage = (message) => {
  return message && message.trim().length >= 5 && message.trim().length <= 1000;
};
