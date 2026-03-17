import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDeleted: () => void;
}

function TaskList({ tasks, onEdit, onDeleted }: TaskListProps) {
    if (tasks.length === 0) {
        return <p className="empty-state">No tasks found. Try adjusting your filters or add a new task.</p>;
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={onEdit} onDeleted={onDeleted} />
            ))}
        </div>
    );
}

export default TaskList;