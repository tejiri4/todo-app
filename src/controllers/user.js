// register a new user
export const registerUser = (req, res) => res.status(200).json({
  message: 'User created.',
});

// sign in an existing user
export const login = (req, res) => res.status(200).json({
  message: 'User logged in successfully.',
});

// sign out a user
export const logout = (req, res) => res.status(200).json({
  message: 'User log out successfully.',
});

// delete a user
export const deleteUser = (req, res) => res.status(200).json({
  message: 'User deleted successfully.',
});

// update a user
export const updateUser = (req, res) => res.status(200).json({
  message: 'User updated successfully.',
});

// get user details by token
export const getUserByToken = (req, res) => res.status(200).json({
  message: 'User fetched successfully.',
});

// invite a user
export const inviteUser = (req, res) => res.status(200).json({
  message: 'User invited successfully.',
});
