defmodule HsTavern.Repo.Migrations.AddCommentsCountToCard do
  use Ecto.Migration

  def change do
    alter table(:cards) do
      add :comments_count, :integer, default: 0
    end

  end
end
