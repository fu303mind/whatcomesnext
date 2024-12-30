// Admin credentials - In a real application, these should be stored securely
export const ADMIN_CREDENTIALS = {
  email: 'admin',
  password: 'admin123'
};

export const isAdminUser = (email, password) => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};
