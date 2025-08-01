const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API route to fetch dog image by breed
app.get("/api/dog/:breed", async (req, res) => {
  const breed = req.params.breed.toLowerCase();

  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();

    if (data.status === "error") {
      return res.status(404).json({ error: "Breed not found" });
    }

    res.json({ imageUrl: data.message });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
