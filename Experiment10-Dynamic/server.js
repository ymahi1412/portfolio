
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to read JSON data
app.use(express.json());

// Sample book collection
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" }
];

// GET: Display all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST: Add a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      message: "Title and author are required"
    });
  }

  const newBook = {
    id: Date.now(),
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT: Update an existing book
app.put("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

// DELETE: Remove a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const initialLength = books.length;

  books = books.filter(b => b.id !== id);

  if (books.length === initialLength) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  res.json({ message: "Book deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
