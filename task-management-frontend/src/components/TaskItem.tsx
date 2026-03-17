import { useMutation } from "@apollo/client/react";
import { DELETE_TASK, UPDATE_TASK } from "../graphql/mutations";
import type { Task, TaskStatus } from "../types/task";

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDeleted: () => void;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: "Pending",   
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  PENDING: "IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
  COMPLETED: "PENDING",
};

function TaskItem({ task, onEdit, onDeleted }: TaskItemProps) {
    const [deleteTask, { loading: deleting }] = useMutation(DELETE_TASK);
    const [updateTask] = useMutation(UPDATE_TASK);
    const handleDelete = async () => {
        if(!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await deleteTask({ variables: { id: task.id } });
            onDeleted();
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const handleCycleStatus = async () => {
        const newStatus = NEXT_STATUS[task.status];
        try {
            await updateTask({ variables: { id: task.id, status: newStatus } });
            onEdit({ ...task, status: newStatus });
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    };
    const formattedDate = new Date(task.createdAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
    return (
        <div className={`task-item task-status-${task.status.toLowerCase()}`}>
            <div className="task-content">
                <div className="task-header">
                    <h3 className={task.status === "COMPLETED" ? "completed-title" : ""}>{task.title}</h3>
                    <button className={`status-badge status-${task.status.toLowerCase()}`} onClick={handleCycleStatus}
                    title="Click to change status">{STATUS_LABELS[task.status]}</button>
                    </div>
                {task.description && <p className="task-description">{task.description}</p>}
                <span className="task-date">{formattedDate}</span>
                </div>
            <div className="task-actions">
                <button className="btn btn-sm btn-secondary" onClick={() => onEdit(task)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={handleDelete} disabled={deleting}>
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}

export default TaskItem;