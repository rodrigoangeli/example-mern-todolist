const express = require("express"),
  router = express.Router(),
  TodoItem = require("../models/Todo");

router.post("/", (req, res) => {
  let text = req.body.text;
  if (text === "" || text.length > 255)
    return res.status(400).json({ message: "Failed" });
  const newTodo = new TodoItem({
    text,
    completed: false,
  });
  newTodo.save((err) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({
      message: "Success",
      newTodo: {
        text: newTodo.text,
        completed: false,
        _id: newTodo._id,
      },
    });
  });
});

router.put("/:id", async (req, res) => {
  let doc = await TodoItem.findOneAndUpdate(
    { _id: req.params.id },
    { completed: true },
    {
      returnOriginal: false,
    }
  );
  res.status(200).send();
});

router.get("/", (req, res) => {
  TodoItem.find({}, (err, list) => {
    if (err) res.status(400).send(err);
    res.status(200).send(list);
  });
});

router.delete("/:id", (req, res) => {
  TodoItem.findOneAndRemove({ _id: req.params.id }, (err) => {
    if (err) res.status(400).send(err);
    res.status(200).send();
  });
});

module.exports = router;
