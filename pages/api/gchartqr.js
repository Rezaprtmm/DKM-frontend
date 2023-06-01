const fs = require("fs")
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
  return url
}
