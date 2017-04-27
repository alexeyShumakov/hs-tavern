defmodule HsTavern.Repo.Migrations.CreateCard do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :title, :string
      add :game_id, :string
      add :img, :string
      add :slug, :string
      add :card_set, :string
      add :type, :string
      add :faction, :string
      add :rarity, :string
      add :cost, :integer
      add :attack, :integer
      add :health, :integer
      add :text, :string
      add :flavor, :string
      add :artist, :string
      add :collectible, :boolean
      add :elite, :boolean
      add :race, :string
      add :player_class, :string
      timestamps()
    end
    create unique_index(:cards, [:slug])
  end
end
