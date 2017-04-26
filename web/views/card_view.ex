defmodule HsTavern.CardView do
  use HsTavern.Web, :view

  def card_json(card) do
    %{
      cards: %{
        card: card_to_json(card)
      }
    }
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end

  def card_to_json(card) do
    card |> Map.take([:id, :slug, :title])
  end
end
