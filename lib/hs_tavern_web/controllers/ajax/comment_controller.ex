defmodule HsTavernWeb.Ajax.CommentController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.CommentProvider
  alias HsTavern.Serializers.CommentSerializer

  def index(conn, %{"entity_id" => entity_id, "entity_type" => entity_type}, user, _) do
    comments = %{entity_id: entity_id, entity_type: entity_type}
    |> CommentProvider.get_comments(user)
    |> CommentSerializer.to_map
    json(conn, comments)
  end

  # def delete(conn, %{"id" => id}, user, _) do

  # end
end
