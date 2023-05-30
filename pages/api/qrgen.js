const QRCode = require("qrcode")
const path = require("path")

module.exports = async function handler(req, res) {
  const { name, valEmail, inst, role } = req.body
  const head = "DKM-REG"
  const min = 100000
  const max = 999999
  const noreg = Math.floor(Math.random() * (max - min) + min)
  const frName = name.split(" ")
  const now = new Date()
  const tgl = now.toLocaleString("id-ID", {
    day: "2-digit",
  })
  const tail = tgl.toString() + noreg.toString() + now.getFullYear().toString()

  const data =
    head + "," + name + "," + valEmail + "," + inst + "," + role + "," + tail
  QRCode.toFile(
    path.join(__dirname, `${frName[0]}-qr.png`),
    data,
    {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 1,
      margin: 1,
      scale: 10,
    },
    function (err) {
      if (err) throw err
      res.status(200).json({ message: "QR Code saved!" })
    }
  )
  // try {

  // } catch (error) {
  //   console.error(error)
  //   console.log("Terjadi kesalahan saat menyimpan data")
  //   return false
  // }
}
