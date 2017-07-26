defmodule HsTavern.Repo.Migrations.AddMediaToComment do
  use Ecto.Migration

  def change do
    alter table(:comments) do
      add :media_type, :string
      add :media_data, :string
    end
  end
end
