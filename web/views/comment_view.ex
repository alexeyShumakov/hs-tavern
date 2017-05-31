defmodule HsTavern.Comment.View do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CommentSerializer

  def render("index.json", %{comments: comments, user: user}) do
    comments |> Enum.map( fn c -> CommentSerializer.to_map(c, user)  end )
  end
end
