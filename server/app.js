const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const querystring = require("querystring");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/token", async(req, res) => {
    const { code, redirect_uri } = req.body;
    const authHeader = 'Basic ' + new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString("base64");
    console.log("Received token request: ");

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirect_uri,
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: authHeader,
                },
            }
        );

        if (response.status !== 200) {
            console.log("Throwing error")
            throw new Error({ message: response.error.message });
        } else {
            console.log("Sending token")
            res.json(response.data);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/", (req, res) => {
    console.log("Received a request at /");
    res.json({ message: "Request received" });
});

app.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
});