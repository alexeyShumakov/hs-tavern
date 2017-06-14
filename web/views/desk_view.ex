defmodule HsTavern.DeskView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.DeskSerializer

  def desk_json(desks) do
    %{desks: %{
      index: DeskSerializer.to_map(desks)
    }}
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end
end
