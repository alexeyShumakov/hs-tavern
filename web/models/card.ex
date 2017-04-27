defmodule HsTavern.Card do
  use HsTavern.Web, :model
  use Arc.Ecto.Schema

  schema "cards" do
    field :title, :string
    field :game_id, :string
    field :slug, HsTavern.CardSlug.Type
    field :img, HsTavern.CardImg.Type
    field :card_set, :string
    field :type, :string
    field :faction, :string
    field :rarity, :string
    field :cost, :integer
    field :attack, :integer
    field :health, :integer
    field :text, :string
    field :flavor, :string
    field :artist, :string
    field :collectible, :boolean
    field :elite, :boolean
    field :race, :string
    field :player_class, :string

    timestamps()
  end

  def card_params do
    [
     :title, :game_id, :card_set, :type,
     :faction, :rarity, :cost, :attack,
     :health, :text, :flavor, :artist,
     :collectible, :elite, :race, :player_class
    ]
  end
  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, card_params)
    |> HsTavern.CardSlug.maybe_generate_slug
    |> HsTavern.CardSlug.unique_constraint
    |> cast_attachments(params, [:img])
    |> validate_required([:title, :img])
  end
end
