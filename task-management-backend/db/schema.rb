ActiveRecord::Schema[7.1].define(version: 2026_03_17_000001) do
    enable_extension "plpgsql"
    
    create_table "tasks", force: :cascade do |t|
        t.string "title", null: false
        t.text "description"
        t.string "status", default: "pending", null: false
        t.datetime "due_date"
        t.datetime "created_at", null: false
        t.datetime "updated_at", null: false
        t.index ["status"], name: "index_tasks_on_status"
    end
end