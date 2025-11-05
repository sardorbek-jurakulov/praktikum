const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const urlParts = req.url.split("/");

  // if (req.url === "/favicon.ico") {
  //   res.writeHead(204); // 204 No Content
  //   return res.end();
  // }

  // GET - /books => books.json faylini o’qib oling va barcha ma’lumotlarni chiqaring
  if (req.url === "/books" && req.method === "GET") {
    fs.readFile("./books.json", "utf8", (err, books) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end("Faylni o‘qishda xatolik yuz berdi");
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(books);
    });

  // GET - /books/:id => books.json faylidan :id bo’yicha qidiring, agar topilsa ma’lumotni qaytaring, aks xolda ma’lumot topilmadi degan xabarni qaytaring
  } else if (urlParts[1] === "books" && urlParts[2] && req.method === "GET") {
    fs.readFile("./books.json", "utf8", (err, books) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end("Faylni o‘qishda xatolik yuz berdi");
      }
      books = JSON.parse(books);
      const book = books.find(book => book.id == urlParts[2]);
      if (book) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(`${JSON.stringify(book)}`);
      } else {
        res.end("Ma'lumot topilmadi");
      }
    });

  // POST - /books => books.json fayliga yangi ma’lumotni qo’shing
  } else if (req.url === "/books" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      body = JSON.parse(body);
    });

    fs.readFile("./books.json", "utf8", (err, books) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end(`books.json faylini o‘qishda xatolik yuz berdi. Sababi: ${err.message}`);
      }
      books = JSON.parse(books);
      const book = books.find(book => book.title == body.title);
      // Agar kitoblar ro’yxatida kiritilayotgan title bo’yicha boshqa kitob mavjud bo’lsa, bu kitob bazada mavjud degan degan xabar qaytarilsin
      if (book) {
        res.end("Bu kitob bazada mavjud");
      } else {
        books.push({
          // id => auto generate qilinsin
          id: (books[books.length-1].id)+1,
          // ma’lumotlarni qo’shishda title va author kiritilsin.
          title: body.title,
          author: body.author
        });
        fs.writeFile("./books.json", JSON.stringify(books), () => {
          if (err) {
            console.log("Xatolik: ", err.message);
            res.writeHead(500);
            return res.end(`Faylga yangi qiymatni yozishda xatolik sodir bo'ldi. Sababi: ${err.message}`);
          } else {
            return res.end("Ok");
          }
        });
      }
    });

  // PUT - /books/:id => books.json faylidan :id bo’yicha qidiring, agar topilsa ma’lumotni kiritilgan ma’lumotlar bo’yicha tahrirlang, topilmasa ma’lumot topilmadi xabarini qaytaring
  } else if (urlParts[1] === "books" && urlParts[2] && req.method === "PUT") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      body = JSON.parse(body);
    });

    fs.readFile("./books.json", "utf-8", (err, books) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end(`books.json faylini o‘qishda xatolik yuz berdi. Sababi: ${err.message}`);
      }
      books = JSON.parse(books);
      const updatingBookIndex = books.findIndex(book => book.id == urlParts[2]);
      // Agar topilsa ma’lumotni kiritilgan ma’lumotlar bo’yicha tahrirlang
      if (updatingBookIndex !== -1) {
        books[updatingBookIndex].title = body.title;
        books[updatingBookIndex].author = body.author;
        fs.writeFile("./books.json", JSON.stringify(books), (err) => {
          if (err) {
            console.log("Xatolik: ", err.message);
            res.writeHead(500);
            return res.end(`Fayl qiymatini yangilashda xatolik sodi bo'ldi. Sababi: ${err.message}`);
          } else {
            return res.end("Ok");
          }
        });
      } else {
        // Agar topilmasa ma’lumot topilmadi xabarini qaytaring
        res.end("Ma’lumot topilmadi");
      }
    });
  } else if (urlParts[1] === "books" && urlParts[2] && req.method === "DELETE") {
    fs.readFile("./books.json", "utf-8", (err, books) => {
      if (err) {
        console.log("Xatolik: ", err.message);
        res.writeHead(500);
        return res.end(`books.json faylini o‘qishda xatolik yuz berdi. Sababi: ${err.message}`);
      }
      books = JSON.parse(books);
      const deletingBookIndex = books.findIndex(book => book.id == urlParts[2]);
      // Agar topilsa ma’lumotni kiritilgan ma’lumotlar bo’yicha tahrirlang
      if (deletingBookIndex !== -1) {
        books.splice(deletingBookIndex, 1);
        fs.writeFile("./books.json", JSON.stringify(books), (err) => {
          if (err) {
            console.log("Xatolik: ", err.message);
            res.writeHead(500);
            return res.end(`Fayl qiymatini yangilashda xatolik sodi bo'ldi. Sababi: ${err.message}`);
          } else {
            return res.end("Ok");
          }
        });
      } else {
        // Agar topilmasa ma’lumot topilmadi xabarini qaytaring
        res.end("Ma’lumot topilmadi");
      }
    });
  } else {
    res.end(`${req.url} bunday route mavjud emas.`);
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} da ishlayapti`);
});