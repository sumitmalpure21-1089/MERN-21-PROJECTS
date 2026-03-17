class TaskManagementBackendSchema < GraphQL::Schema
  query(Types::QueryType)
  mutation(Types::MutationType)
  max_depth 10
  max_complexity 200
end