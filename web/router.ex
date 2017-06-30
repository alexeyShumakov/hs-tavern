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
    plug Guardian.Plug.VerifyHeader
    plug Guardian.Plug.LoadResource
  end

  pipeline :browser_auth do
    plug Guardian.Plug.VerifySession
    plug Guardian.Plug.LoadResource
  end

  scope "/", HsTavern do
    pipe_through [:browser, :browser_auth]

    get "/", DeskController, :index
    get "/my_desks", DeskController, :my_desks
    resources "/comments", CommentController, only: [:index]
    resources "/cards", CardController, only: [:index, :show]
    resources "/builder", BuilderController, only: [:index, :show]
    resources "/desks", DeskController, only: [:delete, :index, :create, :show, :edit, :update]
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
    resources "/desks", Api.DeskController, only: [:show, :index, :update]
   end
end
