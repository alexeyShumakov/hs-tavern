defmodule HsTavern.Repo.Migrations.AddLikesCountToComments do
  use Ecto.Migration

  def change do
    alter table(:comments) do
      add :likes_count, :integer, default: 0
    end

  end
end
