module.exports = async function handler(req, res) {
  const { name, valEmail, inst, role } = req.body
  console.log(name + valEmail + inst + role)
  res.status(200).json({ message: "Lah ini bisa pler wkwkwkk" })
}
