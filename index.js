const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectId
const cors = require("cors")
const port = process.env.PORT || 5000
require("dotenv").config()



const app = express()
app.use(bodyParser.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.adky9.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
    const db= client.db(process.env.DB_DATABASE)
    const ServiceCollection = db.collection("services");
    const ordersCollection = db.collection("orders")

    app.get("/services", (req, res) => {
        const id = objectId(req.query.id)
        if(req.query.id){
            ServiceCollection.find({_id:id}).toArray((error, document) => {
                if (error) {
                    res.send(error);
                } else if (document) {
                    res.send(document);
                }
            });
        }

        else{
            ServiceCollection.find({}).toArray((error, document) => {
                if (error) {
                    res.send(error);
                } else if (document) {
                    res.send(document);
                }
            });
        }
    });

    app.post("/addservice", (req, res) => {
        ServiceCollection.insertOne(req.body).then((result) => {
            res.send(result.insertedCount > 0);
        });
    });


    app.post ("/reviews", (req, res)=> {



        
    })

    app.get("/orders", (req, res)=> {
        ordersCollection.find({}).toArray((err, documents)=>{
            if(err){
                res.send(err)
            }
            else{
                res.send(documents);
            }
        })
    })

    app.post ("/add-order", (req, res)=> {
        ordersCollection.insertOne(req.body).then((result)=> {
            res.send(result.insertedCount> 0)
        })

    })

    app.delete("/delete-order/:orderId", (req, res)=> {
        ordersCollection.deleteOne({
            _id:objectId(req.params.orderId)
        }).then(result => {
            res.send(result.deletedCount> 0)
        })
    })

    app.delete("/delete-service/:serviceId", (req, res)=> {
        ServiceCollection.deleteOne({
            _id:objectId(req.params.serviceId)
        }).then(result => result.deletedCount> 0)
    })



});









app.listen(port , (error=> console.log("app running succes full")))
