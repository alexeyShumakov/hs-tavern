defmodule HsTavern.Repo.Migrations.AddLikesCountToCard do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      add :likes_count, :integer, default: 0
    end

  end
end
