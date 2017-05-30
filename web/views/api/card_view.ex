defmodule HsTavern.Api.CardView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CardSerializer

  def render("index.json", %{cards: cards, filters: filters}) do
    %{
      filters: filters,
      index: Enum.map(cards, &CardSerializer.short_to_map&1)
    }
  end

  def render("show.json", %{card: card, user: user}) do
    CardSerializer.to_map card, user
  end

end
