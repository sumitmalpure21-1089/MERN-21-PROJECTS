module Types
    class TaskStatusEnum < Types::BaseEnum
        graphql_name "TaskStatus"
        value "PENDING", "Task has not been started", value: "PENDING"
        value "IN_PROGRESS", "Task is currently being worked on", value: "IN_PROGRESS"
        value "COMPLETED", "Task has been completed", value: "COMPLETED"
    end
end