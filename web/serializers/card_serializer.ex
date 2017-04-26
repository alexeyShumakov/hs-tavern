defmodule HsTavern.Serializers.CardSerializer do
  use HsTavern.Web, :view
  def to_map(card) do
    card |> Map.take([:id, :slug, :title])
  end

  def serialize(map) do
    %{ cards: map }
    |> Poison.encode!
    |> escape_javascript
  end
end
