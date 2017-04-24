defmodule HsTavern.PageController do
  use HsTavern.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
