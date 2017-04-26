defmodule HsTavern.Repo.Migrations.CreateCard do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :title, :string
      add :game_id, :string
      add :img, :string
      add :slug, :string

      timestamps()
    end
    create unique_index(:cards, [:slug])
  end
end
