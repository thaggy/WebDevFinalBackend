const express = require('express')
const app = express()
const env = require("dotenv").config();
const mongoose = require('mongoose')
const port = 8000
const url = "mongodb+srv://"+ process.env.USER + ":" + process.env.PASS +"@myclassmongo.yfcxh6h.mongodb.net/?retryWrites=true&w=majority"
const router = express.Router()
const Set = require('./models/set.js')
app.use(express.json());

const cors = require('cors')
app.use(cors())
const corsOptions = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['ContentType', 'Authorization']
}
app.use(cors(corsOptions))

async function myConnect() {
    try {
        await mongoose.connect(url)
        console.log("connected to MongoDB")
    } catch {
        console.log("error")
    }
}

app.post('/save', (req, res, next) => {
    const product = new Set({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        set: req.body.set,
    })
    product.save().then(result => {
        console.log(result)
        res.status(200).json(result)
    }).catch(err=> {
        console.log(err)
        res.status(500).json(result)
    });
})

app.post('/update', (req, res, next) => {
    Set.findOneAndUpdate({_id: req.body._id}, 
        {"name": req.body.name, "set": req.body.set})
        .then(result => res.status(200).json(result))
})

app.get('/set/:setId', (req,res,next)=> {
    const setId = req.params.setId;
    Set.findById(setId)
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    }).catch(err => {
        console.log(err);
        res.status(500).json()
    })
})

app.get('/setName/:name', (req,res,next)=> {
    console.log('Connected Requesting ' + req.body.name)
    const queryName = req.params.name;
    Set.find({name: {$regex: queryName}})
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    }).catch(err => {
        console.log(err);
        res.status(500).json()
    })
})

app.get('/test', (req, res) => {
    console.log("test")
})

myConnect()

app.listen(port, () => console.log(`Backend started on ${port}!`))