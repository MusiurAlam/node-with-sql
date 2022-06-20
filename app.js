const express = require("express");
const mysql = require("mysql");

// create connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"
});

db.connect((err) => {
    if(err){
        throw err;
    }else{
        console.log("MySQL connected...")
    }
})

const app = express();

// creating database
app.get("/createdb", (req, res) => {
    let sql = "create database nodemysql";

    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result)
            res.send("Database created!")
        }
    })
})

// create table
app.get("/create-post-table", (req, res) => {
    let sql = `create table posts( id int auto_increment primary key, title varchar(255), body varchar(255) )`

    db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send("Posts table created...")
        }
    })
})

// insert post
app.get("/add-post", (req, res) => {
    const post = {
        title: "Post two",
        body: "This is post number two"
    }
    let sql = `insert into posts set ?`
    let query = db.query(sql, post, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send("Post added to table posts...")
        }
    })
})

// get post
app.get("/get-post", (req, res) => {
    let sql = `select * from posts`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(typeof result);
            res.send("Post fetched...")
        }
    })
})

// get single post
app.get("/get-post/:id", (req, res) => {
    let sql = `select * from posts where id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send("Post fetched...")
        }
    })
})

// update single post
app.get("/update-post/:id", (req, res) => {
    const newTitle = "Updated title";
    let sql = `update posts set title = "${newTitle}" where id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send("Post fetched...")
        }
    })
})

// delete single post
app.get("/delete-post/:id", (req, res) => {
    const newTitle = "Updated title";
    let sql = `delete from posts where id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send("Post deleted...")
        }
    })
})

app.get("/", (req, res) => {
    res.send("Hello world!");
})

app.listen("3000", () => {
    console.log("Server started at port 3000")
})