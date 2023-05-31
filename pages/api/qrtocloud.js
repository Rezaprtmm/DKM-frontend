const qrcode = require("qrcode")
const { Storage } = require("@google-cloud/storage")

// Konfigurasi Google Cloud Storage
const storage = new Storage({
  projectId: "dkm-registration-web",
  keyFilename: "./service-acc-key.json",
})

// Fungsi untuk menghasilkan QR code dan menyimpannya ke Google Cloud Storage
module.exports = async function handler(req, res) {
  try {
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
    const tail =
      tgl.toString() + noreg.toString() + now.getFullYear().toString()

    const data =
      head + "," + name + "," + valEmail + "," + inst + "," + role + "," + tail
    // Generate QR code sebagai buffer
    const qrCodeBuffer = await qrcode.toBuffer(data)

    // Simpan QR code ke Google Cloud Storage
    const bucketName = "bucket-qr-dkmform"
    const folderName = "qrcodes"
    const fileName = `${frName[0]}-qr.png`
    const file = storage.bucket(bucketName).file(`${folderName}/${fileName}`)
    await file.save(qrCodeBuffer, {
      metadata: { contentType: "image/png" },
      resumable: false,
    })

    res.status(200).json({
      message: `QR code telah disimpan di gs://${bucketName}/${folderName}/${fileName}`,
    })
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan" })
  }
}
