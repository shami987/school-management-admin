const authService = require('../services/authService');
const { userDTO } = require('../dtos');

// Login
const login = async (req, res, next) => {
  try {
    const { email, password, deviceId } = req.body;

    const { user, token } = await authService.loginUser(email, password, deviceId);

    res.json({
      message: 'Login successful',
      token,
      user: userDTO(user),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
