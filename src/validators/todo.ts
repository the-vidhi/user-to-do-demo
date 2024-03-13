import Joi from 'joi';

export const getTodoHistoryValidation = Joi.object({
    params: Joi.object({
        date: Joi.date().iso().required(),
    })
});

export const saveTodoValidation = Joi.object({
    params: Joi.object({
        todo_id: Joi.string().uuid().optional().allow(null),
    }),
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().iso().required(),
    })
});

export const deleteTodoValidation = Joi.object({
    params: Joi.object({
        todo_id: Joi.string().uuid().required(),
    })
});

export const changeStatusValidation = Joi.object({
    params: Joi.object({
        todo_id: Joi.string().uuid().required(),
    }),
    query: Joi.object({
        is_completed: Joi.boolean().required(),
    })
});
