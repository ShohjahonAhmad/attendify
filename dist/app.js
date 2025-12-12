import express from 'express';
import authRouter from "./routes/auth.js";
import curatorsRouter from "./routes/curators.js";
import coursesRouter from "./routes/courses.js";
import studentsRouter from "./routes/students.js";
import dotenv from 'dotenv';
import authenticated from './middleware/authenticated.js';
import cors from 'cors';
import errorHandler from './middleware/errors.js';
import notFound from './middleware/notFound.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(`hello ${req.path}`);
    next();
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth", authRouter);
app.use(authenticated);
app.use("/curators", curatorsRouter);
app.use("/courses", coursesRouter);
app.use("/students", studentsRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});
