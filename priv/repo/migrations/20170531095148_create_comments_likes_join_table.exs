defmodule HsTavern.Repo.Migrations.CreateCommentsLikesJoinTable do
  use Ecto.Migration

  def change do
    create table(:comments_likes, primary_key: false) do
      add :comment_id, references(:comments)
      add :like_id, references(:likes)
    end
  end
end
