const express = require("express");
const mongoose = require("mongoose");
const shortUrlModel = require("./models/shortUrl");

const app = express();
mongoose.connect(
  "mongodb+srv://AurangzebHusain:%40%40Pasword786%40%40@cluster0.k0f5j.mongodb.net/urlShortner?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
  }
);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/home", async (req, res) => {
  const shortUrls = await shortUrlModel.find();
  return res.render("index.ejs", { shortUrls });
});

app.post("/shortUrls", async (req, res) => {
  console.log(req.body.fullURL);
  console.debug(mongoose.modelNames());

  await shortUrlModel.create({
    fullUrl: req.body.fullURL,
  });

  // console.log(a);

  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  console.log(req.params.shortUrl);
  const shortUrl = await shortUrlModel.findOne({
    shortUrl: req.params.shortUrl,
  });
  console.debug(shortUrl);
  if (shortUrl == null) {
    return res
      .status(400)
      .json({ message: "URl not found", status: 400, body: null });
  }
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.fullUrl);
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at ${process.env.PORT || 3000}`);
});
