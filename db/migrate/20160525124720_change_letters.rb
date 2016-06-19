class ChangeLetters < ActiveRecord::Migration
  def change
  	change_table :letters do |t|
  		t.change :content, :mediumtext
  	end
  end
end
