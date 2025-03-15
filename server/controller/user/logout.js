
const logout = async (req, res) => {
  try {
    res.clearCookie('token').json({ message: 'cookie removed successfully' }).status(200);
  } catch (error) {
    return res.status(500).json({ msg: error.message })
  }
};

export default logout;
