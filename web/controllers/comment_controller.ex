defmodule HsTavern.CommentController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.CommentProvider
  alias HsTavern.Serializers.CommentSerializer

  def index(conn, %{"entity_id" => entity_id }, user, _) do
    comments = CommentProvider.get_comments(%{entity_id: entity_id}, user) |> CommentSerializer.to_map
    json(conn, comments)
  end
end
