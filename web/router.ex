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

  pipeline :browser_auth do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  scope "/", HsTavern do
    pipe_through [:browser, :browser_auth]

    get "/", PageController, :index
    resources "/cards", CardController
  end

  scope "/auth", HsTavern do
    pipe_through :browser

    delete "/sign_out", AuthController, :sign_out
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

   scope "/api", HsTavern do
    pipe_through :api
    resources "/cards", Api.CardController, only: [:show, :index]
   end
end
