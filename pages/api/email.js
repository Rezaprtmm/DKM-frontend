const nodemailer = require("nodemailer")
const https = require("https")
const querystring = require("querystring")

module.exports = async function handler(req, res) {
  const { name, valEmail, inst, role, noreg } = req.body
  const head = "DKM-REG"
  const frName = name.split(" ")

  const data =
    head + "," + name + "," + valEmail + "," + inst + "," + role + "," + noreg
  const apiEndpoint = "https://chart.googleapis.com/chart"
  const params = {
    cht: "qr",
    chs: "500x500",
    chl: data,
  }
  const url = apiEndpoint + "?" + querystring.stringify(params)
  const eventName = "Bedah Buku"
  const eventDate = "9 Juni 2023"
  const htmlContent = `<p>Kepada Yth. Saudara/i ${name},</p>

  <p>Kami mengucapkan terima kasih atas partisipasi Saudara/i dalam acara ${eventName} yang akan dilaksanakan pada ${eventDate} di Universitas Paramadina Kampus Gatot Subroto. Kami sangat senang dapat menyambut kehadiran Saudara/i pada acara tersebut.</p>
  
  <p>Melalui email ini, kami ingin mengonfirmasi bahwa pendaftaran Saudara/i pada acara ${eventName} telah berhasil kami terima. Berikut terlampir QR Code yang harus Saudara/i tunjukkan ke meja registrasi. Anda dapat memperbesar QR Code nya dengan mengetuk gambar terlampir.</p>
  
  <p>Apabila Saudara/i memiliki pertanyaan atau butuh bantuan sehubungan dengan acara ${eventName}, jangan ragu untuk menghubungi kami melalui:</p>
  
  <p>e-mail  : muhamad.fatih@students.paramadina.ac.id, atau<br>
  WhatsApp: 0821-2248-4581 (Muhamad Adillah Fatih).</p>
  
  <p>Terima kasih,</p>
  
  <p>Tim IT Support DKM Paramadina</p>
  <a href="${url} download="${frName[0]}-qr.png"><img src="${url}"></img></a>
  <p>Nomor registrasi : ${noreg}</p>`
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
    subject: `Konfirmasi Registrasi Acara ${eventName}`,
    html: htmlContent,
  }

  // Kirim email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Email not sent! Err: " + error)
      res.status(500).json({ message: "Error while sendirn email" + error })
    } else {
      console.log("Email Sent!")
      res.status(200).json({ message: "Email sent!" })
    }
  })
}
