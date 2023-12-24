const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { timeStamp } = require("console");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const emptyTask = {
  id: -1,
  task: null,
  isDone: false,
};

let taskList = [emptyTask];

app.get("/tasks/", (req, res) => {
  res.send(taskList);
});

app.post("/task/", (req, res) => {
  console.log(req.body);

  let newTask = {
    id: genereateNewId(taskList[taskList.length - 1].id || 0),
    task: req.body.task,
    isDone: req.body.isDone,
  };

  taskList.push(newTask);

  res.json({
    msg: "task added!",
    list: taskList,
  });
});

app.delete("/task/", (req, res) => {
  let itemToRemove = req.body.id;
  console.log("itemToRemove: ", itemToRemove);

  let updatedList = taskList.filter((item) => item.id != itemToRemove);
  taskList = updatedList;

  res.json({
    msg: "task deleted!",
    list: taskList,
  });
});

app.put("/task/", (req, res) => {
  let itemToUpdate = req.body.id;

  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == itemToUpdate) {
      taskList[i].isDone = req.body.isDone;
    }
  }

  res.json({
    msg: "task updated!",
    list: taskList,
  });
});

function genereateNewId(prevId) {
  return prevId + 1;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
