import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

export const generateRandomPassword = () => 
  Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
