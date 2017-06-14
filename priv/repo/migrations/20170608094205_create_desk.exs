defmodule HsTavern.Repo.Migrations.CreateDesk do
  use Ecto.Migration

  def change do
    create table(:desks) do
      add :player_class, :string
      add :standard, :boolean, default: false, null: false
      add :description, :text
      add :title, :string
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

  end
end
