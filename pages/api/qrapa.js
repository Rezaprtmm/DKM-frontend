const qr = require("qrcode")
module.exports = async function handler(req, res) {
  try {
    const { name, valEmail, inst, role } = req.body
    let data = name + valEmail + inst + role
    const qrCode = await qr.toDataURL(data)

    console.log("QR code berhasil disimpan.")
    res.status(200).json({ message: qrCode })
  } catch (error) {
    console.error("Terjadi kesalahan saat menghasilkan QR code:", error)
    res.status(500).json({ message: error })
  }
}
