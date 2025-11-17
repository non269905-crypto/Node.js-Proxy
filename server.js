const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/binance/*", async (req, res) => {
    try {
        const path = req.params[0];
        const url = `https://api.binance.com/${path}`;
        
        const r = await axios.get(url, {
            params: req.query,
            timeout: 8000
        });

        res.json(r.data);
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.get("/", (req, res) => {
    res.send("Binance Proxy Running ✔");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Proxy Running on", PORT));
