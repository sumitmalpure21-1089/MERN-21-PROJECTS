import type { TaskStatus } from "../types/task";

interface TaskFilterProps {
    statusFilter: TaskStatus | "";
    searchQuery: string;
    onStatusChange: (status: TaskStatus | "") => void;
    onSearchChange: (query: string) => void;
}

const STATUS_OPTIONS: { value: TaskStatus | ""; label: string }[] = [
    { value: "", label: "All Tasks" },
    { value: "PENDING", label: "Pending" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
];

function TaskFilter({ statusFilter, searchQuery, onStatusChange, onSearchChange }: TaskFilterProps) {
    return (
        <div className="filters">
            <div className="filter-group">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            <div className="filter-tabs">
                {STATUS_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        className={`filter-tab ${statusFilter === option.value ? "active" : ""}`}
                        onClick={() => onStatusChange(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TaskFilter;