puts "Seeding tasks..."

tasks = [
  { title: "Set up project repository", description: "Initialize Git repo and push initial commit", status: "COMPLETED" },
  { title: "Design database schema", description: "Create ERD and define table structures", status: "COMPLETED" },
  { title: "Implement GraphQL API", description: "Build queries and mutations for task management", status: "IN_PROGRESS" },
  { title: "Build React frontend", description: "Create components for task CRUD operations", status: "PENDING" },
  { title: "Write unit tests", description: "Add RSpec tests for models and GraphQL layer", status: "PENDING" },
  { title: "Add Docker support", description: "Create Dockerfile and docker-compose.yml", status: "IN_PROGRESS" },
  { title: "Deploy to production", description: "Set up CI/CD pipeline and deploy", status: "PENDING" }
]

tasks.each do |task_attrs|
  Task.find_or_create_by!(title: task_attrs[:title]) do |task|
    task.description = task_attrs[:description]
    task.status = task_attrs[:status]
  end
end

puts "Seeded #{Task.count} tasks."