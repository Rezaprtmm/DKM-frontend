const qr = require("qrcode")
module.exports = async function handler(req, res) {
  try {
    const { name, valEmail, inst, role } = req.body
    let data = name + valEmail + inst + role
    const qrCodeData = await qr.toFile(`./qrcodes/${name}-qr.png`, data)

    console.log("QR code berhasil disimpan.")
    res.status(200).json({ message: "Qr berhasil" })
  } catch (error) {
    console.error("Terjadi kesalahan saat menghasilkan QR code:", error)
    res.status(500).json({ message: error })
  }
}
