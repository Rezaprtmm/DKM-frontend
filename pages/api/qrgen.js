const qr = require("qr-image")
const path = require("path")
const fs = require("fs")

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
  const qrCode = qr.image(data, { type: "png" })

  // Menghasilkan file gambar QR Code
  const outputFilePath = path.join(__dirname, `${frName[0]}-qr.png`)
  qrCode
    .pipe(fs.createWriteStream(outputFilePath))
    .on("finish", () => {
      res.status(200).json({ message: "QR Code berhasil disimpan" })
    })
    .on("error", (error) => {
      res.status(500).json({ message: error })
    })
  // try {

  // } catch (error) {
  //   console.error(error)
  //   console.log("Terjadi kesalahan saat menyimpan data")
  //   return false
  // }
}
