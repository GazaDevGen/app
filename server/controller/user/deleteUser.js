import User from "../../database/user/userSchema.js"

const deleteUser = async (req, res) => {
  try {

    const { id } = req.user
    const user = await User.findById({ _id: id })
    if (!user) return res.status(400).json({ msg: 'this user is not existed' })

    await User.findByIdAndDelete({ _id: id })

    return res.status(200).json({ msg: 'you have deleted your account successfully' })

  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default deleteUser