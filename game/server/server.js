const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 4000;
const RIOT_API_KEY = "RGAPI-cebaa5a1-fef8-4344-b88a-2025109bbb38";

app.use(cors());

app.get("/api/account/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;

  try {
    const response = await axios.get(
      `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "계정 정보를 불러오지 못했습니다." });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
