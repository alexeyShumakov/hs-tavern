defmodule HsTavern.Repo.Migrations.CreateDeskCard do
  use Ecto.Migration

  def change do
    create table(:desk_cards) do
      add :count, :integer, default: 0, null: false
      add :card_id, references(:cards)
      add :desk_id, references(:desks)

      timestamps()
    end

  end
end
