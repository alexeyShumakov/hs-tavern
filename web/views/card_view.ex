defmodule HsTavern.CardView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CardSerializer

  def cards_json(cards) do
    %{index: Enum.map(cards, &CardSerializer.to_map&1)}
    |> CardSerializer.serialize |> raw
  end

  def card_json(card) do
    %{show: CardSerializer.to_map(card)}
    |> CardSerializer.serialize |> raw
  end
end
