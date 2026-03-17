import type { Task, TaskStatus } from "../types/task";
import { UPDATE_TASK } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";

interface EditTaskModalProps {
    task: Task;
    onClose: () => void;
    onUpdated: () => void;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
    { value: "PENDING", label: "Pending" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
];

function EditTaskModal({ task, onClose, onUpdated }: EditTaskModalProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");
    const [status, setStatus] = useState<TaskStatus>(task.status);
    const [updateTask, { loading }] = useMutation(UPDATE_TASK);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title cannot be empty");
            return;
        }
        try {
            const { data } = await updateTask({
            variables: {
                id: task.id,
                title: title.trim(),
                description: description.trim() || null,
                status,
            },
        });

        if(data?.updateTask.errors?.length> 0 ) {   
            alert("Failed to update task: " + data.updateTask.errors.join(", "));
            return;
        }
        onUpdated();
    } catch (error) {
        console.error("Error updating task:", error);
    }
};

    return (
        <div className="modal-overlay" onAbort={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Task</h2>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                <form  onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title *</label>
                        <input
                            type="text"
                            id="edit-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="edit-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="edit-status">Status</label>
                        <select
                            id="edit-status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as TaskStatus)}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={loading || !title.trim()}>
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskModal;