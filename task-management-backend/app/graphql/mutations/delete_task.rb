module Mutations
    class DeleteTask < BaseMutation
        graphql_name 'DeleteTask'

        argument :id, ID, required: true

        field :id, ID, null: false
        field :errors, [String], null: false

        def resolve(id:)
            task = Task.find(id)
            task.destroy!
            
            { id: id, errors: [] }
        end
    end
end