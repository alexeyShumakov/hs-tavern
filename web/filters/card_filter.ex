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
    |> page_filter
  end

  defp keyword_filter({card, filters, params}) do
    case params["keyword"] do
      nil -> { card, filters, params }
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

  defp cost_filter({card, filters, params}) do
    case params["cost"] do
      nil  -> {card, filters, params}
      cost ->
        split_cost = Regex.scan(~r(\d+), cost) |> List.flatten |> Enum.sort |> Enum.map(&String.to_integer&1)
        {
          get_cost(split_cost, card),
          Map.put(filters, :cost, get_cost_filters(split_cost)),
          params
        }
    end
  end

  defp order_filter({card, filters, params}) do
    { card |> order_by([:cost, :title]), filters, params }
  end

  defp get_cost(cost, card) do
    case cost do
      [min] -> card |> where([c], c.cost >= ^min)
      [min, "7"] -> card |> where([c], c.cost >= ^min)
      [min, max] -> card |> where([c], c.cost >= ^min) |> where([c], c.cost <= ^max)
      _ -> card
    end
  end
  defp get_cost_filters(cost) do
    case cost do
      [min] -> %{min: min, max: 7}
      [min, max] -> %{min: min, max: max}
      _ -> %{min: 0, max: 7}
    end
  end

  defp class_filter({card, filters, params}) do
    case params["class"] do
      nil -> {card, filters, params}
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
end
