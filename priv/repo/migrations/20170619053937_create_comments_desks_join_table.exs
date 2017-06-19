defmodule HsTavern.Repo.Migrations.CreateCommentsDesksJoinTable do
  use Ecto.Migration

  def change do
    create table(:comments_desks, primary_key: false) do
      add :comment_id, references(:comments)
      add :desk_id, references(:desks)
    end

  end
end
