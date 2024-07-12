const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todolist = [];

app.get('/todolist', (req, res) => {
    res.json(todolist);
});

app.get('/todolist/:id', (req, res) => {
    const todo = todolist.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    res.json(todo);
});

app.post('/todolist', (req, res) => {
    const todo = {
        id: todolist.length + 1,
        title: req.body.title,
        completed: false
    };
    todolist.push(todo);
    res.status(201).json(todo);
});

app.put('/todolist/:id', (req, res) => {
    const todo = todolist.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found');
    todo.title = req.body.title || todo.title;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
});

app.delete('/todolist/:id', (req, res) => {
    const index = todolist.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Todo not found');
    todolist.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});