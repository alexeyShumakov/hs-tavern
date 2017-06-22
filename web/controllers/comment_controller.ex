defmodule HsTavern.CommentController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller
  alias HsTavern.CommentProvider
  alias HsTavern.Serializers.CommentSerializer

  def index(conn, %{"entity_id" => entity_id, "entity_type" => entity_type }, user, _) do
    params = %{entity_id: entity_id, entity_type: entity_type}
    comments = CommentProvider.get_comments(params, user)
               |> CommentSerializer.to_map
    json(conn, comments)
  end
end
