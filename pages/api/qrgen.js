const QRCode = require("qrcode")
const path = require("path")
const nodemailer = require("nodemailer")

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
      console.log("QR code saved to file!")

      // Konfigurasi transporter email
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "dkm.tekno@gmail.com",
          pass: "bxktqhnaumcfichf",
        },
      })

      // Konfigurasi email yang akan dikirim
      let mailOptions = {
        from: "dkm.tekno@gmail.com",
        to: valEmail,
        subject: "Konfirmasi Registrasi Acara ${eventName} ",
        text: `Kepada Yth. Saudara/i ${name},
  
            Kami mengucapkan terima kasih atas partisipasi Saudara/i dalam acara $eventName yang akan dilaksanakan pada $eventDate di Universitas Paramadina Kampus Gatot Subroto. Kami sangat senang dapat menyambut kehadiran Saudara/i pada acara tersebut.
            
            Melalui email ini, kami ingin mengonfirmasi bahwa pendaftaran Saudara/i pada acara $eventName telah berhasil kami terima. Berikut terlampir QR Code yang harus Saudara/i tunjukkan ke meja registrasi.
            
            Apabila Saudara/i memiliki pertanyaan atau butuh bantuan sehubungan dengan acara $eventName, jangan ragu untuk menghubungi kami melalui:
            e-mail  : muhamad.fatih@students.paramadina.ac.id, atau
            WhatsApp: 0821-2248-4581 (Muhamad Adillah Fatih).
            
            Terima kasih,
            
            Tim IT Support DKM Paramadina`,
        attachments: [
          {
            filename: `${frName[0]}-qr.png`,
            path: path.join(__dirname, `${frName[0]}-qr.png`),
          },
        ],
      }

      // Kirim email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log("Email sent: " + info.response)
        }
      })
    }
  )
  // try {

  // } catch (error) {
  //   console.error(error)
  //   console.log("Terjadi kesalahan saat menyimpan data")
  //   return false
  // }
}
