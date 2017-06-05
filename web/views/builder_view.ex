defmodule HsTavern.BuilderView do
  use HsTavern.Web, :view
  alias HsTavern.Serializers.CardSerializer

  def builder_json(cards, filters \\%{}) do
    %{ builder: %{
        filters: filters,
        cards: Enum.map(cards, &CardSerializer.short_to_map&1)
      },
    }
    |> Poison.encode!
    |> escape_javascript
    |> raw
  end
end
