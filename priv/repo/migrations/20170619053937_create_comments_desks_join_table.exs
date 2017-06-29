defmodule HsTavern.Repo.Migrations.CreateCommentsDesksJoinTable do
  use Ecto.Migration

  def change do
    create table(:comments_desks, primary_key: false) do
      add :comment_id, references(:comments, on_delete: :delete_all)
      add :desk_id, references(:desks)
    end

  end
end
