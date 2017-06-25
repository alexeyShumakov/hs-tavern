defmodule HsTavern.DeskView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.DeskSerializer

  def desks_json(desks) do
    %{desks: %{
      index: DeskSerializer.short_to_map(desks)
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
end
