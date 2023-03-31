const express = require("express");
const download = require("./routes/download");
const app = express();

const PORT = 1338;

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api", download);

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})