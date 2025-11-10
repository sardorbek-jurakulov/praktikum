const router = require("express").Router();
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/books", (req, res) => {
  fs.readFile((__dirname + "/.." + "/config" + "/books.json"), "utf-8", (err, books) => {
    if (err) {
      console.log("Xatolik: ", err.message);
      res.writeHead(500);
      return res.end("Faylni o‘qishda xatolik yuz berdi");
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(books);
  });
});

router.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  fs.readFile((__dirname + "/.." + "/config" + "/books.json"), "utf-8", (err, books) => {
    if (err) {
      console.log("Xatolik: ", err.message);
      res.writeHead(500);
      return res.end("Faylni o‘qishda xatolik yuz berdi");
    }

    const book = (JSON.parse(books)).find((book) => book.id == bookId);
    if (book) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    } else {
      res.status(404).send("Ma'lumot topilmadi");
    }
  });
});

router.post("/books", (req, res) => {
  const { title, author } = req.body;
  fs.readFile((__dirname + "/.." + "/config" + "/books.json"), "utf-8", (err, books) => {
    if (err) {
      console.log("Xatolik: ", err.message);
      res.writeHead(500);
      return res.end("Faylni o‘qishda xatolik yuz berdi");
    }

    books = JSON.parse(books);

    const book = books.find((book) => book.title === title);
    if (book) {
      return res.status(409).send("Bu kitob bazada mavjud");
    }

    const newBookId = books.length + 1;

    const newBook = {
      id: newBookId,
      title,
      author
    };

    books.push(newBook);

    fs.writeFile(path.join(__dirname, "..", "config", "books.json" ), JSON.stringify(books), (err) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end("Bazaga yangi ma'lumot qo'shishda xatolik!");
      } else {
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(books));
      }
    });
  });
});

router.put("/books/:id", (req, res) => {
  const updatingBookId = req.params.id;

  fs.readFile((__dirname + "/.." + "/config" + "/books.json"), "utf-8", (err, books) => {
    if (err) {
      console.log("Xatolik: ", err.message);
      res.writeHead(500);
      return res.end("Faylni o‘qishda xatolik yuz berdi");
    }

    books = JSON.parse(books);

    const bookIndex = books.findIndex((book) => book.id == updatingBookId);
    if (bookIndex === -1) {
      return res.status(404).send("Ma'lumot topilmadi");
    }

    const { title: updatingTitle, author: updatingAuthor  } = req.body;

    books[bookIndex].title = updatingTitle;
    books[bookIndex].author = updatingAuthor;

    fs.writeFile(path.join(__dirname, "..", "config", "books.json" ), JSON.stringify(books), (err) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end("Bazadagi ma'lumotni yangilashda xatolik!");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(books));
      }
    });
  });
});

router.delete("/books/:id", (req, res) => {
  const updatingBookId = req.params.id;

  fs.readFile((__dirname + "/.." + "/config" + "/books.json"), "utf-8", (err, books) => {
    if (err) {
      console.log("Xatolik: ", err.message);
      res.writeHead(500);
      return res.end("Books.json faylini o'qishda xatolik yuz berdi");
    }

    books = JSON.parse(books);

    const bookIndex = books.findIndex((book) => book.id == updatingBookId);
    if (bookIndex === -1) {
      return res.status(404).send("Ma'lumot topilmadi");
    }

    books.splice(bookIndex, 1);

    fs.writeFile(path.join(__dirname, "..", "config", "books.json" ), JSON.stringify(books), (err) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end("Bazadagi ma'lumotni o'chirib qayta yozishda xatolik!");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(books));
      }
    });
  });
});

router.use((req, res) => {
  return res.status(404).sendFile(path.join(__dirname, "..", "views", "404.html"));
});

module.exports = router;