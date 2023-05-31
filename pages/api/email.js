const path = require("path")
const nodemailer = require("nodemailer")

module.exports = async function handler(req, res) {
  const { name, valEmail } = req.body
  const frName = name.split(" ")
  const outputDirectory = process.env.OUTPUT_DIRECTORY || "./qrcodes"
  const outputFilePath = path.join(outputDirectory, frName[0] + "-qrcode.png")

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
        filename: outputFilePath,
        path: outputFilePath,
      },
    ],
  }

  // Kirim email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      res.status(200).json({ message: "Email sent!" })
    }
  })

  // try {

  // } catch (error) {
  //   console.error(error)
  //   console.log("Terjadi kesalahan saat menyimpan data")
  //   return false
  // }
}
