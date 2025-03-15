import User from "../../database/user/userSchema.js";

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    return res.status(200).json({ user, msg: 'Get user Successfully' });
  } catch (error) {
    return res.status(500).json({ msg: error.message });

  }
}
export default getUser