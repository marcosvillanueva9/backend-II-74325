import express from "express";
import { generateToken, authToken } from "./utils.js";

const app = express();

app.post("/login/:username", (req, res) => {
  const username = req.params.username;
  const user = { username };

  const token = generateToken(user);

  res.json({ token });
});

app.get("/protected", authToken, (req, res) => {
  res.json({
    message: "ESTÁS LOGUEADO!",
    user: req.user, 
  });
});

app.post("/logout", (req, res) => {
  res.json({ message: "Sesión cerrada. Borra el token en el cliente." });
});

app.listen(8080, () => {
  console.log("🚀 Servidor corriendo en http://localhost:8080");
});
