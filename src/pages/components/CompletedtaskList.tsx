
import React from 'react';
import styles from "./styles/Home.module.css"

interface CompletedTask {
    id: string;
    task: string;
    priority: string;
    deadline: string;
}

interface CompletedTaskListProps {
    completedTasks: CompletedTask[];
}

const CompletedTaskList: React.FC<CompletedTaskListProps> = ({ completedTasks }) => {
    return (
        <div className={styles.completedTaskList}>
            <h2 className={styles.completedHeading}>Completed Tasks</h2>
            <table className={styles.completedTable}>
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Priority</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {completedTasks.map((ct) => (
                        <tr key={ct.id}>
                            <td>{ct.task}</td>
                            <td>{ct.priority}</td>
                            <td>{ct.deadline}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompletedTaskList;
