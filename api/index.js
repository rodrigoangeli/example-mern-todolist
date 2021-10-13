const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  port = 3080;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

const TodoItem = mongoose.model(
  "TodoItem",
  new mongoose.Schema({
    text: String,
  })
);

app.get("/api/item", (req, res) => {
  TodoItem.find({}, (err, list) => {
    res.send(list);
  });
});

app.post("/api/item", (req, res) => {
  let text = req.body.text;
  if (text === "") return res.status(400).json({ message: "Empty field" });
  const newItem = new TodoItem({ text });
  newItem.save((err) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      message: "Success",
      newItem,
    });
  });
});

app.delete("/api/item/:id", (req, res) => {
  TodoItem.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) res.status(400).send(err);
    res.status(200).send();
  });
});

var uri = `mongodb://localhost:27017/example?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`App is running on port ${port}!`);
    });
  })
  .catch((err) => console.log(err));
