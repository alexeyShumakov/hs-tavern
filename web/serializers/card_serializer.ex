defmodule HsTavern.Serializers.CardSerializer do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CommentSerializer
  def to_map(card) do
    %{
      id: card.id,
      game_id: card.game_id,
      slug: card.slug,
      title: card.title,
      img: img_path(card),
      card_set: card.card_set,
      type: card.type,
      faction: card.faction,
      rarity: card.rarity,
      cost: card.cost,
      attack: card.attack,
      health: card.health,
      text: card.text,
      flavor: card.flavor,
      artist: card.artist,
      collectible: card.collectible,
      elite: card.elite,
      race: card.race,
      player_class: card.player_class,
      comments: card.comments |> CommentSerializer.to_map,
      comments_count: card.comments_count,
      likes_count: card.likes_count,
      like_me: card.like_me
    }
  end

  def short_to_map(card) do
    %{
      id: card.id,
      game_id: card.game_id,
      slug: card.slug,
      title: card.title,
      img: img_path(card),
      comments_count: card.comments_count,
      likes_count: card.likes_count,
      rarity: card.rarity,
      cost: card.cost
    }
  end

  def serialize(map) do
    %{ cards: map }
    |> Poison.encode!
    |> escape_javascript
  end

  def img_path(card) do
    {a, b} = HsTavern.CardImg.url({card.img, card}, :thumb)
    |> String.split("/") |> Enum.split(3)
    a ++ [Application.get_env(:arc, :bucket)] ++ b |> Enum.join("/")
  end
end
