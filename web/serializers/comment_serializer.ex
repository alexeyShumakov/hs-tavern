defmodule HsTavern.Serializers.CommentSerializer do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.UserSerializer
  def to_map(comment) do
    %{
      id: comment.id,
      body: comment.body,
      user: UserSerializer.to_map(comment.user)
    }
  end
end
