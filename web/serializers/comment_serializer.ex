defmodule HsTavern.Serializers.CommentSerializer do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.UserSerializer
  def to_map(comment, user \\ nil) do
    %{
      id: comment.id,
      body: comment.body,
      user: UserSerializer.to_map(comment.user),
      inserted_at: comment.inserted_at,
      likes_count: comment.likes_count,
      like_me: comment.like_me
    }
  end
end
