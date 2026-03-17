Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  get "/graphql", to: "graphiql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get "up", to: "rails/health#show", as: :rails_health_check
end