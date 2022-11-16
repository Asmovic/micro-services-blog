const express = require("express");
const cors = require("cors")
const { randomBytes } = require("crypto")
const axios = require("axios")

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req,res)=>{
    res.send(posts);
})

app.post("/posts/create", async (req,res)=>{
    const id = randomBytes(4).toString("hex")
    const { title } = req.body;
    posts[id] = {
        id, title
    }
    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            id, title
        }
    });
    res.status(201).send(posts[id]);
})

app.post("/events", (req,res)=>{
    const {type, data} = req.body;
    console.log(type);
    res.send({})
})

app.listen(4000, ()=>{
    console.log("Version eskimo")
    console.log("App running on PORT 4000")
});