const express = require("express");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256"); // Şifre hashleme için
const mysql = require("mysql");
const app = express();

// Veritabanına bağlanmak

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "users",
});

app.get("/mysql", verifyToken, (req, res) => {
  connection.connect();

  connection.query("SELECT * FROM allusers", (err, rows, fields) => {
    if (err) console.log(err);
    return res.status(200).json(rows);
  });

  connection.end();
});

app.post("/mysql-post", (req, res) => {
  const { nameSurname, role } = req.body;

  connection.connect();

  const insertQuery = `INSERT INTO allusers (nameSurname, role) VALUES ('${nameSurname}', '${role}')`;

  connection.query(insertQuery, (err, results) => {
    if (err) {
      console.error("Error inserting into database: " + err.stack);
      return res.status(500).json({ error: "Error inserting into database" });
    }

    console.log("Inserted row id:" + results.insertId);
    res.status(200).json({ success: true, message: "User added successfully" });
  });

  connection.end();
});

// Kullanıcı veritabanı örneği (gerçek bir veritabanı kullanmalısınız)
const users = [
  {
    id: 1,
    username: "ferhat",
    password:
      "bb4dc7bfead55c9a41885168d354ceed1268b1d9f42372f5bc93e482323c977a",
    role: "Member",
  },
];

const secretKey =
  "b23813da7f066be253e3bdfa41f87e010b585ff970ff54e428fdcc34b0ad1e50"; // Güvenlik anahtarınızı buraya ekleyin

app.post("/auth", (req, res) => {
  const { username, password } = req.body;

  var findUserName = users.find(
    (u) => u.username === username && u.password === sha256(password)
  );

  if (!findUserName) {
    return res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
  }

  //eğer ki kad pass doğru ise jwt ile token üret.
  const token = jwt.sign(findUserName, secretKey, { expiresIn: "1h" });

  return res.status(200).json({ token });
});

// Token kontrol middleware'i
function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ message: "Token bulunamadı" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Geçersiz token" });
    }

    if (decoded.role == "Member") {
      return next();
    }
    return res.status(405).json({ message: "Geçersiz yetki !" });
  });
}
// Örnek kullanım
app.get("/get-all", verifyToken, (req, res) => {
  // Bu endpoint'e ulaşıldıysa, token doğrulama başarılı demektir
  return res.status(200).json({
    id: 1,
    title: "Gizli Veri",
    userId: req.userId,
  });
});

module.exports = {
  path: "/api",
  handler: app,
};
