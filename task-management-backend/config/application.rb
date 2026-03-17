require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"

require "action_view/railtie"

Bundler.require(*Rails.groups)

module TaskManagementBackend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1
    config.api_only = true
    config.generators do |g|
      g.test_framework :rspec
    end


    # Configuration for the application, engines, and railties goes here.
    # These settings can be overridden in specific environments (e.g. config/environments/development.rb).
  end
end