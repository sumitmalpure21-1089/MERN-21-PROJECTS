require 'rails_helper'

RSpec.describe "UpdateTask Mutation", type: :request do
    let(:task) { create(:task, title: "Original title", status: "pending") }
    let(:mutation) do
        <<~GQL
        mutation UpdateTask($id: ID!, $title: String, $description: String, $status: TaskStatusEnum) {
            updateTask(input: { id: $id, title: $title, description: $description, status: $status }) {
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

    it "updates an existing task with valid params" do
        task = create(:task, title: "Old Title", description: "Old Description", status: "pending")

        post "/graphql", params: { query: mutation, variables: { id: task.id, title: "New Title", description: "New Description", status: "in_progress" }.to_json }

        json = JSON.parse(response.body)
        data = json["data"]["updateTask"]

        expect(data["errors"]).to be_empty
        expect(data["task"]["id"]).to eq(task.id)
        expect(data["task"]["title"]).to eq("New Title")
        expect(data["task"]["description"]).to eq("New Description")
        expect(data["task"]["status"]).to eq("in_progress")
    end
end
