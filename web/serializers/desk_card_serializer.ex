defmodule HsTavern.Serializers.DeskCardSerializer do
  use HsTavern.Web, :view

  def to_map(desk_cards) when is_list(desk_cards) do
    desk_cards |> Enum.map(&to_map&1)
  end

  def to_map(desk_card) do
    %{
      id: desk_card.id,
      card_id: desk_card.card.id,
      cost: desk_card.card.cost,
      count: desk_card.count,
      title: desk_card.card.title,
      rarity: desk_card.card.rarity,
      img: HsTavern.CardImg.url({desk_card.card.img, desk_card.card}, :thumb),
    }
  end

end
