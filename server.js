const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("*", (req, res) => {
    res.send("HELLO THERE")
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
});