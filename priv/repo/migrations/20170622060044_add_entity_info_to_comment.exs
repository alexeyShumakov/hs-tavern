defmodule HsTavern.Repo.Migrations.AddEntityInfoToComment do
  use Ecto.Migration

  def change do
    alter table(:comments) do
      add :entity_type, :string
      add :entity_id, :integer
    end
  end
end
