defmodule HsTavern.Repo do
  use Ecto.Repo, otp_app: :hs_tavern
  use Scrivener, page_size: 10
end
