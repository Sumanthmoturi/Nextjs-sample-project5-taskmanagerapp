
import React from 'react';
import styles from "./styles/Home.module.css"


interface Task {
    id: string;
    task: string;
    priority: string;
    deadline: string;
    done: boolean;
}


interface TaskListProps {
    tasks: Task[];
    markDone: (id: string) => void;
    handleEditTask: (id: string) => void;
    handleDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    markDone,
    handleEditTask,
    handleDeleteTask
}) => {
    return (
        <div className={styles.taskList}>
            <table className={styles.taskTable}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Priority</th>
                        <th>Deadline</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((t) => (
                        <tr key={t.id}>
                            <td>{t.task}</td>
                            <td>{t.priority}</td>
                            <td>{t.deadline}</td>
                            <td>
                                {!t.done && (
                                    <div>
                                        <button
                                            className={styles.markDoneButton}
                                            onClick={() => markDone(t.id)}
                                        >
                                            Done
                                        </button>
                                        <button
                                            className={styles.editTaskButton}
                                            onClick={() => handleEditTask(t.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={styles.deleteTaskButton}
                                            onClick={() => handleDeleteTask(t.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
