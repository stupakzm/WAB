const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://qwerty:qwerty111@cluster0.gvgjxa7.mongodb.net/DronesUrban?retryWrites=true&w=majority');
const Schema = mongoose.Schema;


const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000/'
};

app.use(cors(corsOptions));



const loginSchema = new Schema({
    name: String,
    email: String,
});

const taskSchema = new Schema({
    name: String,
    email: String,
    from: String,
    to: String,
    distance: String,
    duration: String,
    pice: String,
});

const Task = mongoose.model('users', loginSchema);
const TaskServices = mongoose.model('services', taskSchema);




async function saveTask() {
    const task = new Task({
        name: 'Zakhar',
        email: 'email@com',
    });
  
    await task.save();
    console.log('Task saved successfully');
}
  


async function saveTaskAuth() {
    const task = new Task({
      name: nameSave,
      email: emailSave,
    });

    await task.save();
    }



    async function saveTaskServ() {
        const task = new TaskServices({
          name: localStorage.getItem('user'),
          email: localStorage.getItem('email'),
          from: document.getElementById('from').value,
          to: toSave,
          distance: distanceSave,
          duration: durationSave,
          pice: priceSave,
      });
      await task.save();
  }
  //saveTask();


// додати завдання
app.post('/users', (req, res) => {
    const user = new Task({
        name: req.body.name,
        email: req.body.email
    });
    user.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});


// додати завдання
app.post('/services', (req, res) => {
    const user = new TaskServices({
        name: req.body.name,
        email: req.body.email,
        from: req.body.from,
        to: req.body.to,
        distance: req.body.distance,
        duration: req.body.duration,
        pice: req.body.price,
    });
    user.save((err, user) => {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});





// додати завдання
app.post('/tasks', (req, res) => {
    const task = new Task({
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed
    });
    task.save((err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// отримати всі завдання
app.get('/tasks', (req, res) => {
    Task.find((err, tasks) => {
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

// отримати конкретне завдання за ID
app.get('/tasks/:taskId', (req, res) => {
    Task.findById(req.params.taskId, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// оновити завдання
app.put('/tasks/:taskId', (req, res) => {
    Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true }, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// видалити завдання
app.delete('/tasks/:taskId', (req, res) => {
    Task.findByIdAndRemove(req.params.taskId, (err, task) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Task deleted successfully' });
    });
});


app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
