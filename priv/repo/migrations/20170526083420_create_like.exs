defmodule HsTavern.Repo.Migrations.CreateLike do
  use Ecto.Migration

  def change do
    create table(:likes) do
      add :user_id, references(:users)
      add :entity_id, :integer
      add :entity_type, :string

      timestamps()
    end
    create unique_index(:likes, [:user_id, :entity_id, :entity_type], name: :like_signature_index)
  end
end
