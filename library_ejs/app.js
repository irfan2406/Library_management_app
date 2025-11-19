const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
// app.js
app.use(express.static('public'));

// Load JSON normally (no assert)
const books = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

// Home page
app.get("/", (req, res) => {
    res.render("index", { books });
});

// Book details page
app.get("/book/:id", (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) return res.send("Book not found");

    const recommended = books.filter(b => b.genre === book.genre && b.id !== book.id);

    res.render("details", { book, recommended });
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
