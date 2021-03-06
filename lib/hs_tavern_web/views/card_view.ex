defmodule HsTavernWeb.CardView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CardSerializer

  def cards_json(cards, filters \\ %{}) do
    %{
      filters: filters,
      index: Enum.map(cards, &CardSerializer.short_to_map&1)
    }
    |> CardSerializer.serialize |> raw
  end

  def card_json(card) do
    %{show: CardSerializer.to_map(card)}
    |> CardSerializer.serialize |> raw
  end
end
