const fs = require("fs").promises
const fss = require("fs")
const path = require("path")
const QRCode = require("qrcode")
const process = require("process")
const nodemailer = require("nodemailer")
const { google } = require("googleapis")
const { authenticate } = require("@google-cloud/local-auth")
// const sgMail = require("@sendgrid/mail")
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
const TOKEN_PATH = path.join(process.cwd(), "./token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "./credentials.json")

module.exports = async function handler(req, res) {
  try {
    const { name, valEmail, inst, role } = req.body
    res.status(200).json({ message: "Lah ini bisa pler wkwkwkk" })
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
    const regDate = now.toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    fs.readFile("credentials.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err)
      authorize(JSON.parse(content), writeData)
    })

    async function loadSavedCredentialsIfExist() {
      try {
        const content = await fs.readFile(TOKEN_PATH)
        const credentials = JSON.parse(content)
        return google.auth.fromJSON(credentials)
      } catch (err) {
        return null
      }
    }

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

    /**
     * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
     *
     * @param {OAuth2Client} client
     * @return {Promise<void>}
     */
    async function saveCredentials(client) {
      const content = await fs.readFile(CREDENTIALS_PATH)
      const keys = JSON.parse(content)
      const key = keys.installed || keys.web
      const payload = JSON.stringify({
        type: "authorized_user",
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
      })
      await fs.writeFile(TOKEN_PATH, payload)
    }
    /**
     * Prints the names and majors of students in a sample spreadsheet:
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
     */

    async function authorize() {
      let client = await loadSavedCredentialsIfExist()
      if (client) {
        return client
      }
      client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
      })
      if (client.credentials) {
        await saveCredentials(client)
      }
      return client
    }

    function writeData(auth) {
      const sheets = google.sheets({ version: "v4", auth })
      let values = [
        [name, valEmail, inst, role, regDate],
        // Potential next row
      ]
      const resource = {
        values,
      }
      sheets.spreadsheets.values.append(
        {
          spreadsheetId: "14S7erNn9Bqxog6x5_KhCAtybbDf5wshS16pJrE4ua2s",
          range: "Sheet1!A1",
          valueInputOption: "RAW",
          resource: resource,
        },
        (err, result) => {
          if (err) {
            // Handle error
            console.log(err)
          } else {
            console.log(
              "%d cells updated on range: %s",
              result.data.updates.updatedCells,
              result.data.updates.updatedRange
            )
          }
        }
      )
    }
    authorize().then(writeData).catch(console.error)
  } catch (error) {
    console.error(error)
    console.log("Terjadi kesalahan saat menyimpan data")
    return false
  }
}
