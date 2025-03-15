import User from "../../database/user/userSchema.js"
import bcryptjs from 'bcryptjs'
const signup = async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body
      console.log("🚀 ~ signup ~ username:", username)

    if (username !== 'soso' && username !== 'soso2' && username !== 'soso3' ) return res.status(400).json({ msg: 'you can not sign up with us' })


    const isUserExisted = await User.findOne({ username })

    if (isUserExisted) return res.status(400).json({ msg: 'there is user with such data' })

    const hashedPassword = await bcryptjs.hash(password, 10)

    await User.create({
      username,
      password: hashedPassword,

    })

    return res.status(201).json({ msg: 'you have signed up successfully' })

  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default signup