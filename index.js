const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors")

const AuthRoute = require('./routes/Auth');
const AdminRoute = require("./routes/Admins");
const TranscriptRoute = require("./routes/Transcript")



dotenv.config();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_PROD_URL, {useNewUrlParser: true,
 
 }).then(console.log("connected to mongo db")).catch((err) => console.log(err)); 






app.use(bodyParser.json());

 app.use("/api/auth", AuthRoute);
app.use('/api/admin', AdminRoute)
app.use('/api/transcript', TranscriptRoute) 

app.listen(process.env.PORT  || 5000, ()=> {
    console.log("tobi is king");
})

