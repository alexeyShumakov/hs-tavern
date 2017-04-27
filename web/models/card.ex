defmodule HsTavern.Card do
  use HsTavern.Web, :model
  use Arc.Ecto.Schema

  schema "cards" do
    field :title, :string
    field :game_id, :string
    field :slug, HsTavern.CardSlug.Type
    field :img, HsTavern.CardImg.Type

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :game_id])
    |> validate_required([:title])
    |> HsTavern.CardSlug.maybe_generate_slug
    |> HsTavern.CardSlug.unique_constraint
    |> cast_attachments(params, [:img])
  end
end
