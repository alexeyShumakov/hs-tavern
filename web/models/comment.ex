defmodule HsTavern.Comment do
  import Ecto.Query, only: [from: 2]

  use HsTavern.Web, :model
  alias HsTavern.Repo


  schema "comments" do
    field :body, :string
    field :likes_count, :integer, default: 0
    field :like_me, :boolean, virtual: true, default: false
    belongs_to :user, HsTavern.User
    belongs_to :card, HsTavern.Card
    many_to_many :likes, HsTavern.Like, join_through: "comments_likes", on_delete: :delete_all
    has_many :likes_users, through: [:likes, :user]

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
