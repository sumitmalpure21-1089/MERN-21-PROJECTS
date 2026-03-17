require 'rails_helper'

RSpec.describe Mutations::CreateTask, type: :request do
    let(:mutation) do
        <<~GQL
        mutation CreateTask($title: String!, $description: String, $status: TaskStatusEnum) {
            createTask(input: { title: $title, description: $description, status: $status }) {
                task {
                    id
                    title
                    description
                    status
                }
                errors
            }
        }
        GQL
    end

    it "creates a new task with valid params" do
        post "/graphql", params: { query: mutation, variables: { title: "New Task", description: "A test task"}.to_json }
    end

     
        json = JSON.parse(response.body)
        data = json["data"]["createTask"]

        expect(data["errors"]).to be_empty
        expect(data["task"]["title"]).to eq("New Task")
        expect(data["task"]["description"]).to eq("This is a new task")
        expect(data["task"]["status"]).to eq("pending")
    end