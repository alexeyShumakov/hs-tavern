defmodule HsTavern.Api.CardView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CardSerializer

  def render("index.json", %{cards: cards}) do
    Enum.map(cards, &CardSerializer.to_map&1)
  end

  def render("show.json", %{card: card}) do
    CardSerializer.to_map card
  end

end
