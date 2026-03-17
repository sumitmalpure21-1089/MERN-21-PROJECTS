class Task < ApplicationRecord
    STATUSES = %w[PENDING IN_PROGRESS COMPLETED].freeze

    validates :status, presence: true, inclusion: { in: STATUSES }
    validates :title, presence: true, length: { maximum: 255 }  

    scope :by_status, ->(status) { where(status: status) if status.present? }
    scope :search_by_title, ->(query) { where("title ILIKE ?", "%#{sanitize_sql_like(query)}%") if query.present? }

    before_validation :set_default_status, on: :create
    private

    def set_default_status
        self.status ||= STATUSES.first
    end
end