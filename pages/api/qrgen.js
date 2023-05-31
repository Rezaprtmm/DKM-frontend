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

  // Membuat instance QRCode dengan data yang diinginkan
  const qrCode = qr.image(data, { type: "png" })
  const outputDirectory = process.env.OUTPUT_DIRECTORY || "./qrcodes"
  const outputFilePath = path.join(outputDirectory, frName + "-qrcode.png")
  const fileStream = fs.createWriteStream(outputFilePath)

  fileStream.on("error", (error) => {
    console.error("Terjadi kesalahan saat menyimpan QR Code:", error)
    res.status(500).send("Terjadi kesalahan saat menyimpan QR Code")
  })

  fileStream.on("finish", () => {
    console.log(`QR Code berhasil disimpan sebagai ${outputFilePath}`)
    res.status(200).send("QR Code berhasil disimpan")
  })

  qrCode.pipe(fileStream)
  // try {

  // } catch (error) {
  //   console.error(error)
  //   console.log("Terjadi kesalahan saat menyimpan data")x
  //   return false
  // }
}
