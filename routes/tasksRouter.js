import { Router } from "express";
import { getTasks, deleteTask, updateTask, addNewOneTask } from "../controllers/tasksController.js";
import { authenticateToken } from '../middleware/authToken.js'
export let router = Router()

router.route('/')
    .all(authenticateToken)
    .get(getTasks)
    .post(addNewOneTask)
router.route('/:id')
    .all(authenticateToken)
    .put(updateTask)
    .delete(deleteTask)