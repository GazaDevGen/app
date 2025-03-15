import User from "../../database/user/userSchema.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config/index.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ msg: 'Email or password wrong!' })

    const passwordsMatch = await bcryptjs.compare(password, user.password);

    if (!passwordsMatch) return res.status(400).json({ msg: 'Email or password wrong!' })

    const userData = await User.findOne({ username }, { password: 0 });
    console.log("🚀 ~ login ~ userData:", userData)

    const token = jwt.sign(
      {
        id: userData._id,
        username: userData.username,
        role: userData.role,
      },
      SECRET_KEY,
    );

    return res.cookie('token', token).status(200).json({ userData, message: 'logged in successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default login