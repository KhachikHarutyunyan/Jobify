// import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
import {dirname} from "path";
import {fileURLToPath} from "url";
import path from "path";
// secure packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();
dotenv.config();

// db and authenticateUser
import connectDB from "./db/connect.js";

// router
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

// app middleware

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Server listening port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();