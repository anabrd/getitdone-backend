const tasks = require('../model/tasks');
const logs = require('../model/logs');

// Add new Task
exports.newTask = async (req, res) => {
    const newTask = new tasks({...req.body, userId: req.userId});
    await newTask.save((err, docs) => {
        if (err) {
            console.log(err);
            res.send({
                status: "failed", 
                message: `There was an error in processing. Please try again.`, 
                data: err
            });
        } else {
            // Update log
            logs.findByIdAndUpdate(req.logId, {postData: JSON.stringify(docs)}, (err, doc) => {})
            res.send({
                status: "success", 
                message: 'New task added.', 
                data: docs});
            }
        })
};

// Get all tasks
exports.getAll = (req, res) => {
    tasks.find({userId: req.userId}, (err, docs) => {
        if (err) {
            console.log("get error")
            res.send({status: "failed", message: "There was an error. Please try again later."});
        } else {
            console.log(docs);
            res.send({status: "success", message: "Welcome!", data: docs});
        }
    })
}

// Edit task
// Status
exports.editTaskStatus = (req, res) => {
    const id = req.body._id;
    const task = req.body;
    console.log(task)

    tasks.findByIdAndUpdate(id, task, (err, doc) => {
        console.log("are we in?")
        if (err) {
            res.send({staus: "failed", message:"Could not edit task. Please try again."});
            console.log(err);
        } else {
            // Update log
            logs.findByIdAndUpdate(req.logId, {preData: JSON.stringify(doc), postData: JSON.stringify(task)}, (err, doc) => {})
            res.send({
                status: "success", 
                message:`Woo, crossed one off the list!`,
                data: doc});
                console.log(doc);
        }
    })
}

// Title
exports.editTaskTitle = (req, res) => {
    console.log("ok");
    const id = req.body._id;
    const task = req.body;
    console.log(task)

    tasks.findByIdAndUpdate(id, task, (err, doc) => {
        console.log("are we in?")
        if (err) {
            res.send({staus: "failed", message:"Could not edit task. Please try again."});
            console.log(err);
        } else {
            // Update log
            logs.findByIdAndUpdate(req.logId, {preData: JSON.stringify(doc), postData: JSON.stringify(task)}, (err, doc) => {});
            res.send({
                status: "success", 
                message:`Changes noted!`,
                data: task});
            console.log(doc);
        }
    })
}

// Delete task
exports.deleteTask = (req, res) => {
    //get params
    // find by id and delete

    const id = req.params.id;
    console.log(id);

    tasks.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            console.log(err);
            res.send({status: "failed", message: err})
        } else if (doc == null) {
            res.send({status: "failed", message: "Task not found."})
        } else {
            res.send({status: "success", 
            message: "Well done! You can now fuggedaboutit.",
            data: doc._id});
            console.log(doc)
        }
    })
}