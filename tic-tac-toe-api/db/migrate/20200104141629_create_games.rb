class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :players
      t.integer :size
      t.timestamps
    end
  end
end
