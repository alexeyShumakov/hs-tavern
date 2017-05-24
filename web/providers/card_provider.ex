defmodule HsTavern.CardProvider do
  import Ecto.Query
  alias HsTavern.Card

  def one_card!(id) do
    case Integer.parse(id) do
      :error ->
        query = from p in Card,
          preload: [:comments],
          where: p.slug == ^id

      {value, "" } ->
        query = from p in Card,
          preload: [:comments],
          where: p.slug == ^id,
          or_where: p.id == ^id
    end

    HsTavern.Repo.one!(query)
  end
end
