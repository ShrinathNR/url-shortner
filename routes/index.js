const express = require("express");
const shortid = require("shortid");
const router = express.Router();
const validUrl = require("valid-url");
const config = require("config");

const Url = require("../modals/url");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("invalid base url");
  }
  //create url code
  const urlCode = shortid.generate();

  //ceck long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.err(err);
      res.status(500).json("server error");
    }
  } else {
    res.status(401).json("invalid long url");
  }
});

module.exports = router;
