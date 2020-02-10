const express = require("express");
const connectDB = require("./service/db");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const getConfig = require("./service/GetConfig");
const cors = require("cors");
const formData = require("express-form-data");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//connect data base
getConfig()
    .then(() => {
        connectDB();
        app.use(passport.initialize());
        console.log(process.env.urlDataBase);
        require("./service/passport")(passport);
        cloudinary.config({
            cloud_name: process.env.cloudinary_cloud_name,
            api_key: process.env.cloudinary_apikey,
            api_secret: process.env.cloudinary_apiSecret
        });
    })
    .catch(err => {
        console.error(err);
    });

app.use(formData.parse());
app.use(bodyParser.json());


// Use Routes
app.use("/api/customers", require("./routes/client"));


app.use(express.static("../client/build"));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "client/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    if (!process.env.NODE_ENV) {
        console.log(`Server start on ${PORT}`);
    }
});
