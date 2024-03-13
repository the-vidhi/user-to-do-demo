import moment from 'moment';
import { Response } from 'express';
import Todo, { ITodo } from '../models/todo';
import CustomRequest from '../middlewares/custom';

//get to-do history
const getTodoHistory = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { params: { date }, user } = req;

        const user_id = user?._id;
        const startDate = moment(date).toISOString();
        const endDate = moment(date).add(1, 'day').toISOString();

        const todoHistory = await Todo.find({
            user_id,
            due_date: { $gte: startDate, $lte: endDate },
        });

        res.status(200).json(todoHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//create/update to-do
const saveTodo = async (req: CustomRequest, res: Response) => {
    try {
        const { params: { todo_id }, body: { title, description, due_date }, user } = req;

        let result = null;

        if (todo_id) {
            // update to-to
            result = await Todo.findByIdAndUpdate(
                todo_id,
                { title, description, due_date },
                { new: true }
            );
            if (!result) return res.status(404).json({ error: 'Todo not found' });
        } else {
            //create to-do
            const user_id = user?._id;

            const newTodo: ITodo = new Todo({
                title,
                description,
                due_date: moment(due_date).toISOString(),
                user_id,
            });

            result = await newTodo.save();
        }
        res.json({ data: result, message: 'Todo created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//delete to-do
const deleteTodo = async (req: CustomRequest, res: Response) => {
    try {
        const { params: { todo_id }, user } = req;

        const deletedTodo = await Todo.findByIdAndUpdate(
            todo_id,
            { is_deleted: true, deleted_at: Date.now(), deleted_by: user?._id },
            { new: true }
        );

        if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// mark as compeleted or unmark as completed
const changeStatus = async (req: CustomRequest, res: Response) => {
    try {
        const { params: { todo_id }, query: { is_completed } } = req;

        const updatedTodo = await Todo.findByIdAndUpdate(
            todo_id,
            { is_completed },
            { new: true }
        );

        if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });

        res.json(updatedTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { saveTodo, getTodoHistory, deleteTodo, changeStatus };
