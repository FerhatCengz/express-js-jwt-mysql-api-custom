const express = require("express");
const jwt = require("jsonwebtoken");
const sha256 = require("sha256"); // Şifre hashleme için

const app = express();

// Kullanıcı veritabanı örneği (gerçek bir veritabanı kullanmalısınız)
const users = [
  {
    id: 1,
    username: "ferhat",
    password:
      "bb4dc7bfead55c9a41885168d354ceed1268b1d9f42372f5bc93e482323c977a", // bcrypt ile hashlenmiş "cengiz" şifresi
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

// Örnek kullanım
app.get(
  "/get-all",
  (req, res, next) => {
    console.log("ilk adım");
    next(); //diğer adıma geçmeyi sağlar
  },
  (req, res) => {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(403).json({ message: "Token bulunamadı" });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Geçersiz token" });
      }
    });
    // Bu endpoint'e ulaşıldıysa, token doğrulama başarılı demektir
    return res.status(200).json({
      id: 1,
      title: "Gizli Veri",
      userId: req.userId,
    });
  }
);

module.exports = {
  path: "/api",
  handler: app,
};
