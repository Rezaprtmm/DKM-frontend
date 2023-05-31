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

  const outputDirectory = "./qrcodes" // Direktori output untuk menyimpan QR code
  const outputFilePath = `${outputDirectory}/${frName[0]}-qr.png` // Jalur file QR code

  // Membuat instance QR code dengan data yang diinginkan
  const qrCode = qr.image(data, { type: "png" })

  // Menghasilkan file gambar QR code
  const fileStream = fs.createWriteStream(outputFilePath)

  fileStream.on("error", (error) => {
    console.error("Terjadi kesalahan saat menyimpan QR code:", error)
    res.status(500).json({ message: "QR Code Failed to saved" })
  })

  fileStream.on("finish", () => {
    console.log(`QR code berhasil disimpan sebagai ${outputFilePath}`)
    res.status(200).json({ message: "QR Code saved!" })
  })

  qrCode.pipe(fileStream)
  // try {

  // } catch (error) {
  //   console.error(error)
  //   console.log("Terjadi kesalahan saat menyimpan data")x
  //   return false
  // }
}
