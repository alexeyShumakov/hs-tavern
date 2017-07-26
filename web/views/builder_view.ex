defmodule HsTavern.BuilderView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CardSerializer

  def builder_json(cards, filters \\ %{}) do
    %{
      builder: %{
        filters: filters,
        cards: CardSerializer.short_to_map(cards)
      }
    }
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end
end
