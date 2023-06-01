const path = require("path")
const qr = require("qrcode")
const nodemailer = require("nodemailer")
const https = require("https")
const querystring = require("querystring")

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
  const apiEndpoint = "https://chart.googleapis.com/chart"
  const params = {
    cht: "qr",
    chs: "300x300",
    chl: data,
  }
  const url = apiEndpoint + "?" + querystring.stringify(params)
  res.status(200).json({ message: "QR berhasil di-generate!" })
  console.log(url)
  // const text = req.query.text || "Hello, World!"
  // const qrCode = await qr.toDataURL(text)
  // const qrCodeData = await qr.toDataURL(data)
  // const base64Data = qrCodeData.replace(/^data:image\/png;base64,/, "")
  // const binaryData = Buffer.from(base64Data, "base64")
  const htmlContent = `
  <h1>Selamat Datang!</h1>
  <p>Terima kasih telah bergabung. Silakan klik <img src="${url}"></img> untuk mengakses situs kami.</p>
`

  // // Gunakan binaryData sesuai kebutuhan Anda, misalnya untuk menampilkan di halaman web:
  // const qrCodeImageTag = `<img src="${qrCodeData}" alt="QR Code" />`
  // const qrA = `<a href="${qrCodeData}" download="${name}.png">Tekan ini untuk mendapatkan QR</a>`
  // console.log(qrA)

  // const dataUrl = qrCode.replace(/^data:image\/png;base64,/, "")

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
    // text: `Kepada Yth. Saudara/i ${name},

    //         Kami mengucapkan terima kasih atas partisipasi Saudara/i dalam acara $eventName yang akan dilaksanakan pada $eventDate di Universitas Paramadina Kampus Gatot Subroto. Kami sangat senang dapat menyambut kehadiran Saudara/i pada acara tersebut.

    //         Melalui email ini, kami ingin mengonfirmasi bahwa pendaftaran Saudara/i pada acara $eventName telah berhasil kami terima. Berikut terlampir QR Code yang harus Saudara/i tunjukkan ke meja registrasi.

    //         Apabila Saudara/i memiliki pertanyaan atau butuh bantuan sehubungan dengan acara $eventName, jangan ragu untuk menghubungi kami melalui:
    //         e-mail  : muhamad.fatih@students.paramadina.ac.id, atau
    //         WhatsApp: 0821-2248-4581 (Muhamad Adillah Fatih).

    //         Terima kasih,

    //         Tim IT Support DKM Paramadina`,
    html: htmlContent,
  }

  // Kirim email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.status(500).json({ message: "Email not sent! " + error })
    } else {
      console.log(qrCode)
      console.log(dataUrl)
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
