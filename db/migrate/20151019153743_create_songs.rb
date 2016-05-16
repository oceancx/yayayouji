class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
    	t.timestamps null:false
    	t.string :name
    	t.string :artist
    	t.text   :lyrics
    	t.integer :like
    	t.integer :dislike
    	t.boolean :favorites
    	t.integer :song_id
    end
  end
end
