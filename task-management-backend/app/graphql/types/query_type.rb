module Types
    class QueryType < Types::BaseObject
        field :tasks, [Types::TaskType], null: false, 
        description: "Returns all tasks, optionally filtered by status or search query" do
            argument :status, Types::TaskStatusEnum, required: false
            argument :search, String, required: false
        end
        field :task, Types::TaskType, null: false, 
            description: "Returns a single task by ID" do
            argument :id, ID, required: true
        end

        def tasks(status: nil, search: nil)
            scope = Task.all.order(created_at: :desc)
            if status.present? && Task::STATUSES.include?(status)
                scope = scope.where(status: status.to_s)
            end
            if search.present?
                scope = scope.where("title ILIKE ?", "%#{Task.sanitize_sql_like(search.to_s)}%")
            end
            scope
        end

        def task(id:)
            Task.find(id)
        end
    end
end