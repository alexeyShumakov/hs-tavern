defmodule HsTavern.Serializers.DeskCardSerializer do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CardSerializer

  def to_map(desk_cards) when is_list(desk_cards) do
    desk_cards |> Enum.map(&to_map&1)
  end

  def to_map(desk_card) do
    card = desk_card.card
    %{
      id: desk_card.id,
      count: desk_card.count,
      card:  CardSerializer.short_to_map(card)
    }
  end

end
