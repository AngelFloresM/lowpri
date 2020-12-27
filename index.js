const express = require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 8080
const { cyberPuertaScrap } = require("./scrapper")
const { product } = require("puppeteer")

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("<h1>This is working</h1>")
})

app.post("/", (req, res) => {
  const { link } = req.body.data
  cyberPuertaScrap(link).then(product => {
		res.json(product)
	}).catch(err => console.log(err))
})

app.listen(PORT)
