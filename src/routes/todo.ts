import express from 'express';
import { Request, Response } from 'express';
import Joi from 'joi';
import { saveTodo, getTodoHistory, deleteTodo, changeStatus } from '../controllers/todo';
import { saveTodoValidation, getTodoHistoryValidation, deleteTodoValidation, changeStatusValidation } from '../validators/todo';
import isAuth from '../middlewares/auth'

const router = express.Router();

const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: Function) => {
        const { error } = schema.validate({ ...req.params, ...req.body, ...req.query });
        if (error) return res.status(400).json({ error: error.details[0].message });
        next();
    };
};

router.get('/history/:date', isAuth, validate(getTodoHistoryValidation), getTodoHistory);
router.post('/:todo_id?', isAuth, validate(saveTodoValidation), saveTodo);
router.delete('/:todo_id', isAuth, validate(deleteTodoValidation), deleteTodo);
router.put('/complete/:todo_id', isAuth, validate(changeStatusValidation), changeStatus);

export default router;
