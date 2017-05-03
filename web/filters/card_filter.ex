defmodule HsTavern.CardFilter do
  import Ecto.Query
  alias HsTavern.Repo
  alias HsTavern.Card

  def filter(params) do
    {Card, %{}, params}
    |> order_filter
    |> collectible_filter
    |> keyword_filter
    |> class_filter
    |> cost_filter
    |> attack_filter
    |> health_filter
    |> page_filter
  end

  defp keyword_filter({card, filters, params}) do
    case params["keyword"] do
      nil -> { card, Map.put(filters, :keyword, ""), params }
      keyword -> {
        card |> where([c], like(fragment("lower(?)", c.title), ^"%#{String.downcase(keyword)}%")),
        Map.put(filters, :keyword, keyword),
        params
      }
    end

  end
  defp collectible_filter({card, filters, params}) do
    case params["collectible"] do
      "false" -> { card, Map.put(filters, :collectible, false), params }
      _ -> {
        card |> where([c], c.collectible == true),
        filters,
        params
      }
    end
  end

  defp order_filter({card, filters, params}) do
    { card |> order_by([:cost, :title]), filters, params }
  end


  defp class_filter({card, filters, params}) do
    case params["class"] do
      nil -> {card, filters, params}
      "All" -> {card, filters, params}
      class ->
        {
          where(card, player_class: ^class),
          Map.put(filters, :player_class, class),
          params
        }
    end
  end

  defp page_filter({card, filters, params}) do
    page = card |> Repo.paginate(params)
    pag_params = %{ page: page.page_number, total_pages: page.total_pages }
    { page.entries, Map.put(filters, :pagination, pag_params) }
  end


  defp cost_filter({card, filters, params}) do
    range_filter({card, filters, params}, :cost)
  end

  defp attack_filter({card, filters, params}) do
    range_filter({card, filters, params}, :attack)
  end

  defp health_filter({card, filters, params}) do
    range_filter({card, filters, params}, :health)
  end

  defp range_filter({card, filters, params}, card_field) do
    case params[Atom.to_string(card_field)] do
      nil  -> {card, filters, params}
      str ->
        range = normalize_str(str)
        {
          get_range(range, card, card_field),
          Map.put(filters, card_field, get_range_filters(range)),
          params
        }
    end
  end

  defp normalize_str(str) do
    Regex.scan(~r(\d+), str) |> List.flatten |> Enum.sort |> Enum.map(&String.to_integer&1)
  end

  defp get_range(range, card, card_field) do
    case range do
      [min]      -> card |> where([c], field(c, ^card_field) >= ^min)
      [0, 7] -> card
      [min, 7] -> card |> where([c], field(c, ^card_field) >= ^min)
      [min, max] -> card |> where([c], field(c, ^card_field) >= ^min) |>where([c], field(c, ^card_field) <= ^max)
      _ -> card
    end
  end
  defp get_range_filters(range) do
    case range do
      [min] -> %{min: min, max: 7}
      [min, max] -> %{min: min, max: max}
      _ -> %{min: 0, max: 7}
    end
  end
end
