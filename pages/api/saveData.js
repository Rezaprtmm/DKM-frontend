const fs = require("fs").promises
const fss = require("fs")
const path = require("path")
const QRCode = require("qrcode")
const process = require("process")
const { google } = require("googleapis")
const { authenticate } = require("@google-cloud/local-auth")
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(
  "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"
)
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
const TOKEN_PATH = path.join(process.cwd(), "./token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "./credentials.json")

module.exports = async function handler(req, res) {
  try {
    const { name, valEmail, inst, role } = req.body
    const frName = name.split(" ")
    const now = new Date()
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

    const data = name + "," + valEmail
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

        // Send email with attachment
        const msg = {
          to: valEmail,
          from: "reza.maulana@students.paramadina.ac.id",
          subject: "Registrasi Anda Berhasil.",
          text:
            "Halo, " +
            name +
            "! Terima kasih telah mendaftar di acara ini, berikut terlampir QR Code yang harus kamu tunjukkan ke meja registrasi nanti yaa! Kami tunggu kehadiranmu :)",
          attachments: [
            {
              content: fss
                .readFileSync(path.join(__dirname, `${frName[0]}-qr.png`))
                .toString("base64"),
              filename: `${frName[0]}-qr.png`,
              type: "image/png",
              disposition: "attachment",
            },
          ],
        }
        sgMail
          .send(msg)
          .then(() => console.log("Email sent successfully!"))
          .catch((error) => console.error(error.toString()))
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
