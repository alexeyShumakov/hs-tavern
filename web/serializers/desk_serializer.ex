defmodule HsTavern.Serializers.DeskSerializer do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.{UserSerializer, DeskCardSerializer}

  def to_map(desks) when is_list(desks) do
    desks |> Enum.map(&to_map&1)
  end

  def to_map(desk) do
    %{
      id: desk.id,
      title: desk.title,
      user: UserSerializer.to_map(desk.user),
      inserted_at: desk.inserted_at,
      player_class: desk.player_class,
      comments_count: desk.comments_count,
      likes_count: desk.likes_count,
      like_me: desk.like_me,
      cards: DeskCardSerializer.to_map(desk.cards)
    }
  end

end
