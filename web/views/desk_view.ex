defmodule HsTavern.DeskView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.{DeskSerializer, CardSerializer}

  def desks_json(desks) do
    %{desks: %{
      index: DeskSerializer.short_to_map(desks)
    }}
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end

  def desks_with_filters_json(desks, filters) do
    %{desks: %{
      index: DeskSerializer.short_to_map(desks),
      filters: filters
    }}
    |> Poison.encode!
    |> escape_javascript
    |> raw

  end

  def desk_json(desk) do
    %{desks: %{
      show: DeskSerializer.to_map(desk)
    }}
    |> Poison.encode!
    |> escape_javascript
    |> raw

  end
  def builder_json(cards, filters, desk) do
    %{ builder: %{
        filters: filters,
        cards: Enum.map(cards, &CardSerializer.short_to_map&1),
        desk: DeskSerializer.to_map(desk)
      },
    }
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end
end
