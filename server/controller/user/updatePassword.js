import bcryptjs from 'bcryptjs'
import User from '../../database/user/userSchema.js'

const updatePassword = async (req, res) => {
  try {
    const { password } = req.body
    const { id } = req.user

    const user = await User.findById({ _id: id })

    if (!user) return res.status(400).json({ msg: 'this user is not existed' })

    const comparePassword = await bcryptjs.compare(password, user.password)

    if (!comparePassword) return res.status(400).json({ msg: 'you have typed wrong credential' })

    const hashedPassword = await bcryptjs.hash(password, 10)

    await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword })

    return res.status(200).json({ msg: 'you have updated your password successfully' })


  } catch (error) {
    return res.status(500).json({ msg: error.message })


  }
}

export default updatePassword