module Mutations
    class CreateTask < BaseMutation
        graphql_name 'CreateTask'

        argument :title, String, required: true
        argument :description, String, required: false  
        argument :status, Types::TaskStatusEnum, required: false

        field :task, Types::TaskType, null: true
        field :errors, [String], null: false

        def resolve(title:, description: nil, status: nil)
          task = Task.new(title: title, description: description, status: status)

          if task.save
            { task: task, errors: [] }
          else
            { task: nil, errors: task.errors.full_messages }
          end
        end

    end
end 