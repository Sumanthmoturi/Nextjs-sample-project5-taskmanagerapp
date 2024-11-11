
import React, { useState, useEffect } from "react";
import Head from "next/head";
import styles from "./styles/Home.module.css"

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import CompletedTaskList from '../components/CompletedtaskList';

interface Task {
    id: string;
    task: string;
    priority: string;
    deadline: string;
    done: boolean;
}

const TaskScheduler: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
    const [taskName, setTaskName] = useState<string>("");
    const [taskPriority, setTaskPriority] = useState<string>("Top");
    const [taskVal, setTaskDeadline] = useState<string>("");
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [filterPriority, setFilterPriority] = useState<string>("");

    const TASKS_STORAGE_KEY = "tasks";
    const COMPLETED_TASKS_STORAGE_KEY = "completedTasks";

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY) || '[]');
        if (storedTasks) {
            setTasks(storedTasks);
        }

        const storedCompletedTasks = JSON.parse(localStorage.getItem(COMPLETED_TASKS_STORAGE_KEY) || '[]');
        if (storedCompletedTasks) {
            setCompletedTasks(storedCompletedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem(COMPLETED_TASKS_STORAGE_KEY, JSON.stringify(completedTasks));
    }, [completedTasks]);

    const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    };

    const handleTaskPriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTaskPriority(e.target.value);
    };

    const handleTaskDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDeadline(e.target.value);
    };

    const addTask = () => {
        if (taskName.trim() === "" || taskVal === "") {
            alert("Enter a task, Must not be empty!");
            return;
        }

        const selDate = new Date(taskVal);
        const currDate = new Date();

        if (selDate <= currDate) {
            alert("Can't go back in time.");
            return;
        }

        const newTask: Task = {
            id: (tasks.length + 1).toString(),
            task: taskName,
            priority: taskPriority,
            deadline: taskVal,
            done: false,
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));

        setTaskName("");
        setTaskPriority("Top");
        setTaskDeadline("");
    };

    const handleEditTask = (id: string) => {
        const taskToEdit = tasks.find((t) => t.id === id);
        if (taskToEdit) {
            setTaskName(taskToEdit.task);
            setTaskPriority(taskToEdit.priority);
            setTaskDeadline(taskToEdit.deadline);
            const updatedTasks = tasks.filter((t) => t.id !== id);
            setTasks(updatedTasks);
        }
    };

    const handleDeleteTask = (id: string) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
    };

    const markDone = (id: string) => {
        const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, done: true } : t
        );
        setTasks(updatedTasks);

        const completedTask = tasks.find((t) => t.id === id);
        if (completedTask) {
            setCompletedTasks([...completedTasks, completedTask]);
        }
    };

    const filteredTasks = tasks
        .filter((t) => !t.done)
        .filter((t) =>
            t.task.toLowerCase().includes(searchKeyword.toLowerCase())
        )
        .filter((t) => (filterPriority ? t.priority === filterPriority : true));

    return (
        <div className={styles.App}>
            <Head>
                <title>Task Manager - Geeksforgeeks.org</title>
            </Head>
            <header className={styles.taskHeader}>
                <h1>Task Manager</h1>
            </header>
            <main>
                <TaskForm
                    taskName={taskName}
                    taskPriority={taskPriority}
                    taskDeadline={taskVal}
                    handleTaskNameChange={handleTaskNameChange}
                    handleTaskPriorityChange={handleTaskPriorityChange}
                    handleTaskDeadlineChange={handleTaskDeadlineChange}
                    addTask={addTask}
                />
                {/* Search and Filter Component */}
                <div className={styles.searchFilter}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search tasks"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <select
                        className={styles.filterPrioritySelect}
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="Top">High Priority</option>
                        <option value="Middle">Medium Priority</option>
                        <option value="Low">Not Important</option>
                    </select>
                </div>
                <h2 className={styles.heading}>Tasks</h2>
                <TaskList
                    tasks={filteredTasks}
                    markDone={markDone}
                    handleEditTask={handleEditTask}
                    handleDeleteTask={handleDeleteTask}
                />
                <CompletedTaskList completedTasks={completedTasks} />
            </main>
        </div>
    );
};

export default TaskScheduler;
