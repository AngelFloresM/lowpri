const express = require("express")
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 8080
const { cyberpuertaScrap } = require("./scrapper")

app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
	res.send("This is working")
	const { link } = req.body
	console.log(req.body)
	// const product = await cyberpuertaScrap(link)
   // res.json(product)
})

app.post("/", async (req, res) => {
	const { link } = req.body
	const product = await cyberpuertaScrap(link)
   res.json(product)
})

app.listen(PORT, () => {
   console.log("Server running")
})
