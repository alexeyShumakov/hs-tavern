defmodule HsTavern.Repo.Migrations.CreateDeskLikesJoinTable do
  use Ecto.Migration

  def change do
    create table(:desks_likes, primary_key: false) do
      add :like_id, references(:likes)
      add :desk_id, references(:desks, on_delete: :delete_all)
    end

    alter table(:desks) do
      add :likes_count, :integer, default: 0
      add :comments_count, :integer, default: 0
    end
  end
end
