const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      fatherName,
      familyName,
      nickName,
      phone,
      age,
      gender,
      email,
      spacialUser = false
    } = req.body
    const image = req.file.filename
    const { id } = req.user

    const isUserExisted = await User.findById({ _id: id })

    if (!isUserExisted) return res.status(400).json({ msg: 'this user is not existed' })

    await User.findByIdAndUpdate({ _id: id }, {
      firstName,
      fatherName,
      familyName,
      nickName,
      phone,
      age,
      gender,
      email,
      image,
      spacialUser
    })

    return res.status(200).json({ msg: 'you have updated your data successfully' })




  } catch (error) {
    return res.status(500).json({ msg: error.message })

  }
}

export default updateUser