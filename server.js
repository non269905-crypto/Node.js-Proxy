import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const BINANCE = "https://api.binance.com";

app.get("/klines", async (req, res) => {
    try {
        const { symbol, interval, limit } = req.query;

        const url = `${BINANCE}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`;

        const r = await fetch(url);
        const data = await r.json();

        return res.json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Proxy error", details: err.toString() });
    }
});

// سلامت
app.get("/", (req, res) => res.json({ status: "proxy ok" }));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log("Binance Proxy Running on PORT", port));
