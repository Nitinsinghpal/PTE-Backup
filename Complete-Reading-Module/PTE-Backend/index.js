const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./Routes/userRoutes')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json())
dotenv.config()

const PORT = process.env.PORT ||5000;
const MONGOURL = process.env.MONGO_URL;


// For online

// mongoose.connect(MONGOURL).then(() =>{
//     console.log("Database connected successfully")
//     app.listen(PORT,() => {
//         console.log(`Server is running on Port : ${PORT}`)
//     })
// }).catch((e) => console.log(e))


app.listen(PORT,() => {  // for offline
    console.log(`Server is running on Port : ${PORT}`)
})

app.use('/api/user',route)