import dotenv from "dotenv";
import cors from "cors";
dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS.split(","),
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Rate limiter: limita a quantidade de requisições que cada usuário/IP
// pode efetuar dentro de um determinado intervalo de tempo

/*
Vulnerabilidade: API4:2023 – Consumo irrestrito de recursos
Vulnerabilidade evitada por colocar rate limiting:express-rate-limit, limitando o número de requisições por IP para prevenir ataques.
*/
import { rateLimit } from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 60 * 1000, // Intervalo: 1 minuto
  limit: 20, // Máximo de 20 requisições
});
app.use(limiter);

/*********** ROTAS DA API **************/

/*
Vulnerabilidade: API5:2023 – Falha de autenticação a nível de função
vulnerabilidade evitada ao usar middleware de verificaçao e autorização nas rotas protegidas, para que apenas usuários autenticados e autorizados possam acessar dados sensíveis.
*/
// Middleware de verificação do token de autorização
import auth from "./middleware/auth.js";
app.use(auth);

import carsRouter from "./routes/cars.js";
app.use("/cars", carsRouter);

import customersRouter from "./routes/customers.js";
app.use("/customers", customersRouter);

import usersRouter from "./routes/users.js";
app.use("/users", usersRouter);

export default app;