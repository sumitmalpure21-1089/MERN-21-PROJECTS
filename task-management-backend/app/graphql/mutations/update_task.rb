module Mutations
    class UpdateTask < BaseMutation
        graphql_name 'UpdateTask'

        argument :id, ID, required: true
        argument :title, String, required: false
        argument :description, String, required: false  
        argument :status, Types::TaskStatusEnum, required: false

        field :task, Types::TaskType, null: true
        field :errors, [String], null: false

        def resolve(id:, **attributes)
            task = Task.find(id)
            attrs = attributes.compact

            if task.update(**attrs)
                { task: task, errors: [] }
            else
                { task: nil, errors: task.errors.full_messages }
            end
        end

    end
end 