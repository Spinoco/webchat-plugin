import express from "express";
import path from "path";

const app = express();
const port = 3000;

// app.get("/", (req, res) => {
//     res.send("Express + TypeScript Server");
// });

app.use(express.static("dist"));

// app.get("/", function (req, res) {
//     res.sendFile(path.join("/index.html"));
// });

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
