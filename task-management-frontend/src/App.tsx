import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import type { TaskStatus, Task } from './types/task';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';
import TaskForm from './components/TaskForm';
import { GET_TASKS } from './graphql/queries';
function App() {
  const[statusFilter, setStatusFilter] = useState<TaskStatus | "">("");
  const[searchQuery, setSearchQuery] = useState("");
  const [editingTask,setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);

  const {data,loading,error,refetch} = useQuery(GET_TASKS, {
    variables: {
      status: statusFilter || undefined,
      search: searchQuery || undefined,
    },
    fetchPolicy: "cache-and-network",
  });

  const handleTaskCreated = () => {
    setShowForm(false);
    refetch();
  }

  const handleTaskUpdated = () => {
    setEditingTask(null);
    refetch();
  }
  const handleTaskDeleted = () => {
    refetch();
  }
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ New Task</button>
        </div>
      </header>
      <main className="app-main">
        <TaskFilter
          statusFilter={statusFilter}
          searchQuery={searchQuery}
          onStatusChange={setStatusFilter}
          onSearchChange={setSearchQuery}
        />
        {loading && !data && <div className="loading">Loading tasks...</div>}
        {error && <div className='error-message'>Error loading tasks: {error.message}</div>}
        {data && (
          <TaskList tasks={data.tasks}
          onEdit={setEditingTask}
          onDeleted={handleTaskDeleted} 
          />
        )}
      </main>
      {showForm && (
        <TaskForm
          onClose={() => setShowForm(false)}
          onCreated={handleTaskCreated}
         />
      )}
      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdated={handleTaskUpdated}
        />
      )}
      
    </div>
  );
}

export default App;
