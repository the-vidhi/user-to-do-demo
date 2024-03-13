import express from 'express';
import { Request, Response } from 'express';
import Joi from 'joi';
import { register, login } from '../controllers/auth';
import { userRegister } from '../validators/user';

const router = express.Router();

const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: Function) => {
        const { error } = schema.validate({ ...req.params, ...req.body, ...req.query });
        if (error) return res.status(400).json({ error: error.details[0].message });
        next();
    };
};

router.post('/register', validate(userRegister), register);
router.post('/login', login);

export default router;
