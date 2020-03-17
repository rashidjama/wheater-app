const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware, as well as cors
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));

const port = 3000;

app.listen(port, () => {
    console.log(`I am listening on port ${port}`);
});

let projectData = {};

app.post("/postData", (req, res) => {
    console.log(req.body);
    projectData.date = req.body.date;
    projectData.feel = req.body.feeling;
    projectData.temp = req.body.temperature;
    projectData.name = "Rashid";
    res.send({
        msg: "Hi, I received your message!"
    })
})

app.get("/getData", (req, res) => {
    res.send(projectData);
})