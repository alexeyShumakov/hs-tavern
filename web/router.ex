defmodule HsTavern.Router do
  use HsTavern.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", HsTavern do
    pipe_through :browser

    get "/", PageController, :index
    resources "/cards", CardController
  end

   scope "/api", HsTavern do
    pipe_through :api
    resources "/cards", Api.CardController, only: [:show, :index]
   end
end
