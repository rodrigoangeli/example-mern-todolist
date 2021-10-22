const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  Todo = require("./routes/Todo");
port = 4000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors());

const router = express.Router();

router.use("/todo", Todo);

app.use("/api/", router);

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
