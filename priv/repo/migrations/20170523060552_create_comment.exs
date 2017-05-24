defmodule HsTavern.Repo.Migrations.CreateComment do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :text
      add :user_id, references(:users, on_delete: :delete_all)
      add :card_id, references(:cards, on_delete: :delete_all)

      timestamps()
    end

  end
end
