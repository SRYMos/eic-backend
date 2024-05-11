const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const taskList = []
let increment = 0;

app.post('/task/create', (req, res) => {
	let task = req.body;
  task = {
    id: increment++,
    ...task
  }
  taskList.push(task);
  res.json({ message: 'Task created successfully!' });
})

app.get('/task/all', (req, res) => {
	res.json(taskList);
})

app.get('/task/:id', (req, res) => {
  const id = req.params.id;
  const ref = taskList.findIndex(task => task.id == id);
  res.json(taskList[ref])
})

app.put('/task/:id', (req, res) => {
  const id = req.params.id;
  const ref = taskList.findIndex(task => task.id == id);
  const task = req.body;
  taskList[ref] = {
    id: parseInt(id),
    task
  };
  res.json({ message: 'Updated task successfully!' });
});

app.delete('/task/:id', (req, res) => {
  const id = req.params.id;
  const ref = taskList.findIndex(task => task.id == id);
  taskList.splice(ref, 1);
  res.json({ message: 'Deleted task successfully!' });
});

app.listen(3000, () => {
	console.log('start port 3000')
})

module.exports = app