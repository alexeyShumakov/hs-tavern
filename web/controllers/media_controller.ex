defmodule HsTavern.MediaController do
  use HsTavern.Web, :controller

  def giphy_search(%{"keyword" => keyword, "offset" => offset}), do: Giphy.search!(keyword, offset: offset)
  def giphy_search(%{"keyword" => keyword}),                     do: Giphy.search!(keyword)
  def giphy_search(%{}),                                         do: Giphy.search!("funny cat")

  def search(conn, params) do
    json conn, giphy_search(params)
  end
end
