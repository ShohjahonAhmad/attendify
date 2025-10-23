import express from 'express';
import authRouter from "./routes/auth.js"
import dotenv from 'dotenv';
import authenticated from './middleware/authenticated.js';
import cors from 'cors'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!")
})
app.use("/auth", authRouter)
app.use(authenticated)

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})