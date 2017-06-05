defmodule HsTavern.BuilderController do
  use HsTavern.Web, :controller
  use Guardian.Phoenix.Controller

  def index(conn, params, user, _) do
    render(conn, "index.html")
  end

  def show(conn, %{"id" => playerClass}, user, _) do
    classes = ["paladin", "druid", "rogue", "priest", "warlock", "warrior", "hunter", "shaman", "mage"]
    if Enum.member?(classes, playerClass) do
      params = %{"class" => String.capitalize(playerClass), "page_size" => 6}
      {cards, filters} = HsTavern.CardFilter.filter(params)
      render(conn, "show.html", cards: cards, filters: filters)
    else
      redirect conn, to: "/builder"
    end
  end
end
