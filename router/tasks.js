const router = require('express').Router();
const tasks = require('../controller/tasks');
const logMid = require('../middleware/log');
const authMid = require('../middleware/auth')

router.post('/new', authMid.checkAuth, logMid.logger, tasks.newTask);
router.get('/all', authMid.checkAuth, tasks.getAll);
router.delete('/:id', authMid.checkAuth, logMid.logger, tasks.deleteTask);
router.post('/status', authMid.checkAuth, logMid.logger, tasks.editTaskStatus);
router.post('/title', authMid.checkAuth, logMid.logger, tasks.editTaskTitle);
router.post('/order', authMid.checkAuth, logMid.logger, tasks.editOrder);

module.exports = router;