const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const port = process.env.PORT || 5000



const app = express()
app.use(bodyParser.json())
app.use(cors())










app.listen(port , (error=> console.log("app running succes full")))
