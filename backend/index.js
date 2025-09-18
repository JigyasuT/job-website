import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});
const app = express();
const _dirname = path.resolve();
const port = process.env.PORT || 3000; // ✅ Corrected
//middleware
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // ✅ For form data (URL encoded)
// app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//apis

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
// http://localhost:8000/api/v1/user/register

app.use(express.static(path.join(_dirname,"/frontend/dist")));
 app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
 })

app.listen(port, () => {
  connectDB();
  console.log(`server is listening port.. ${port}`);
});
