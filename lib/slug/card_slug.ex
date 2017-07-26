defmodule HsTavern.CardSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
  alias HsTavern.Card

  def build_slug(value) do
    slug = Slugger.slugify_downcase(value)
    case HsTavern.Repo.get_by(Card, slug: slug) do
      nil -> slug
      _ -> slug <> random_string(32)
    end
  end

  defp random_string(length) do
    length
    |> :crypto.strong_rand_bytes
    |> Base.url_encode64
    |> binary_part(0, length)
  end
end
