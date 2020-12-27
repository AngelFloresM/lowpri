const express = require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 8080
const { cyberPuertaScrap } = require("./scrapper")

app.use(express.json())
app.use(cors()

app.get("/", (req, res) => {
	res.send("This is working")
})

app.post("/", async (req, res) => {
	const { link } = req.body
	const product = await cyberPuertaScrap(link)
   res.json(product)
})

app.listen(PORT)
