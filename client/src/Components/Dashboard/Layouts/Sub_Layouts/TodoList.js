import { useState } from "react";
import { BsTrash } from 'react-icons/bs'

const TodoList = () => {
    const AddTaskForm = ({ addTask }) => {
        const [title, setTitle] = useState();
        const [desOfSpics, setDesOfSpics] = useState();
        const handleSubmit = e => {
            e.preventDefault();
            title && addTask(title)
            setTitle("");
        };
        return (
            <div className='flex gap-5 items-center'>
                <input className="inputfield w-full" onChange={e => setTitle(e.target.value)}
                    type="text" value={title} name='title' placeholder="Enter a title for a specification …" />
                <input className="inputfield w-full" onChange={e => setDesOfSpics(e.target.value)}
                    type="text" value={desOfSpics} name='desOfSpics' placeholder="Enter specification …" />
                <button onClick={handleSubmit} className="border rounded-xl px-5 py-0 h-14 hover:bg-gray-200 focus:bg-gray-300" type="submit">+</button>
            </div>
        );
    };
    const [tasks, setTasks] = useState([]);
    const addTask = (specsTitle, spect2) => setTasks([...tasks, { specsTitle }, { spect2 }]);
    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };
    console.log(tasks)
    return (
        <div className="mt-5">
            {tasks.map((task, index) => (
                <div className="grid grid-cols-2 items-center gap-8 ">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium truncate">
                            {task.specsTitle}
                        </span>
                        <span className="text-lg font-medium truncate">
                            {task.spect2}
                        </span>
                        <button onClick={() => removeTask(index)}><BsTrash /></button>
                    </div>
                </div>
            ))}
            <AddTaskForm addTask={addTask} />
        </div>
    );
}
export default TodoList


