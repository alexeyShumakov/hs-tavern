defmodule HsTavernWeb.Comment.View do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CommentSerializer

  def render("index.json", %{comments: comments}) do
    CommentSerializer.to_map comments
  end
end
