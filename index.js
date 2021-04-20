const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors")
const port = process.env.PORT || 5000
require("dotenv").config()



const app = express()
app.use(bodyParser.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.adky9.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
    const ServiceCollection = client.db(process.env.DB_DATABASE).collection("services");

    app.get("/services", (req, res) => {
        ServiceCollection.find({}).toArray((error, document) => {
            if (error) {
                res.send(error);
            } else if (document) {
                res.send(document);
            }
        });
    });

    app.post("/addservice", (req, res) => {
        ServiceCollection.insertOne(req.body).then((result) => {
            res.send(result.insertedCount > 0);
        });
    });


    app.post ("/reviews", (req, res)=> {



        
    })

    


});









app.listen(port , (error=> console.log("app running succes full")))
