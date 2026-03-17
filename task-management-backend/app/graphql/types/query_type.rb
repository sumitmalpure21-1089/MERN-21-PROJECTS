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
            scope = scope.by_status(status: status) if status.present?
            scope = scope.search_by_title(search) if search.present?
            scope
        end

        def task(id:)
            Task.find(id)
        end
    end
end