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

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  pipeline :browser_auth do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  scope "/ajax", HsTavern.Ajax do
    pipe_through [:browser, :browser_auth]

    resources "/desks", DeskController, only: [:index, :show, :delete, :update, :create]
  end

  scope "/", HsTavern do
    pipe_through [:browser, :browser_auth]

    get "/", DeskController, :index
    get "/my_desks", DeskController, :my_desks
    resources "/comments", CommentController, only: [:index]
    resources "/cards", CardController, only: [:index, :show]
    resources "/builder", BuilderController, only: [:index, :show]
    resources "/desks", DeskController, only: [:index, :show, :edit]

  end

  scope "/media", HsTavern do
    pipe_through :api
    get "/search", MediaController, :search
  end

  scope "/auth", HsTavern do
    pipe_through :browser

    delete "/sign_out", AuthController, :sign_out
    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

   scope "/api", HsTavern do
    pipe_through [:api, :api_auth]
    resources "/cards", Api.CardController, only: [:show, :index]
    get "/users/search", Api.UserController, :search
   end
end
