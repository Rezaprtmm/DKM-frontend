const fs = require("fs").promises
const path = require("path")
const process = require("process")
const { google } = require("googleapis")
const { authenticate } = require("@google-cloud/local-auth")
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]
const TOKEN_PATH = path.join(process.cwd(), "./token.json")
const CREDENTIALS_PATH = path.join(process.cwd(), "./credentials.json")

module.exports = async function handler(req, res) {
  const { name, valEmail, inst, role } = req.body
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
  res.status(200).json({ message: name + valEmail + inst + role })
}
