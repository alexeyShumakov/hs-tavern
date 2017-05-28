defmodule HsTavern.Comment do
  import Ecto.Query, only: [from: 2]

  use HsTavern.Web, :model
  alias HsTavern.Repo


  schema "comments" do
    field :body, :string
    field :likes_count, :integer, default: 0
    belongs_to :user, HsTavern.User
    belongs_to :card, HsTavern.Card

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:body, :user_id, :card_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:card_id)
    |> validate_required([:body, :user_id, :card_id])
  end
end
