class AddIsReadToLetters < ActiveRecord::Migration
  def change
    add_column :letters, :is_read, :boolean
  end
end
