defmodule HsTavern.Serializers.CardSerializer do
  use HsTavern.Web, :view
  def to_map(card) do
    %{
      id: card.id,
      slug: card.slug,
      title: card.title,
      img: HsTavern.CardImg.url({card.img, card}, :thumb)
    }
  end

  def serialize(map) do
    %{ cards: map }
    |> Poison.encode!
    |> escape_javascript
  end
end
