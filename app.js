const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/apiDB");


const contentSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", contentSchema);
app.use(bodyParser.urlencoded({ extended: true }));

app.route("/article")
    .get((req, res) => {
        Article.find({}).then((foundArticle) => {
            res.send(foundArticle);

        }).catch((err) => {
            res.send(err);
        });
    })
    .delete((req, res) => {
        Article.deleteMany({}).then((foundArticle) => {
            res.send("Deleted all data");
        }).catch((err) => {
            res.send(err);
        });
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save().catch((err) => {
            res.send(err);
        });
    });

app.route("/article/:articleTitle")
    .get((req, res) => {
        Article.find({ title: req.params.articleTitle }).then((foundArticle) => {
            res.send(foundArticle);
        }).catch((err) => {
            res.send(err);
        })
    })
    .put((req, res) => {
        Article.updateOne({ title: req.params.articleTitle }, { title: req.body.title, content: req.body.content }).then((foundArticle) => {
            res.send(foundArticle);
        }).catch((err) => {
            res.send(err);
        });
    })
    .patch((req, res) => {
        Article.updateOne({ title: req.params.articleTitle }, req.body).then((foundArticle) => {
            res.send(foundArticle);
        }).catch((err) => {
            res.send(err);
        });
    })
    .delete((req,res)=>{
        Article.deleteOne({title:req.params.articleTitle}).then((foundArticle)=>{
            res.send(foundArticle);
        }).catch((err) => {
            res.send(err);
        });
    });



app.listen(3000, (req, res) => {
    console.log("Connected to port 3000");
});