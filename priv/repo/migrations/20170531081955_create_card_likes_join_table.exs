defmodule HsTavern.Repo.Migrations.CreateCardLikesJoinTable do
  use Ecto.Migration

  def change do
    create table(:cards_likes, primary_key: false) do
      add :card_id, references(:cards, on_delete: :delete_all)
      add :like_id, references(:likes)
    end
  end
end
