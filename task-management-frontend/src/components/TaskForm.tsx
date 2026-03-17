import { useState } from "react";
import { CREATE_TASK } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react/compiled";

interface TaskFormProps {
  onClose: () => void;
  onCreated: () => void;
}

function TaskForm({ onClose, onCreated }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTask, { loading }] = useMutation(CREATE_TASK);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Title cannot be empty");
      return;
    }
    try {
      // Call your GraphQL mutation to create a new task here
      // Example:
      const { data } = await createTask({ variables: { title: title.trim(), description: description.trim() || null } });
      if (data?.createTask.errors?.length > 0) {
        alert("Failed to create task: " + data.createTask.errors.join(", "));
        return;
       }    
      onCreated();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Task</h2>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              autoFocus
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          
            <button type="submit" className="btn btn-primary" disabled ={loading || !title.trim()}>
                {loading ? "Creating..." : "Create Task"}
                </button>
                </div>
         
        </form>
      </div>
    </div>
  );
}

export default TaskForm;