defmodule HsTavern.Authorization do
  use HsTavern.Web, :model

  schema "authorizations" do
    field :provider, :string
    field :uid, :string
    field :token, :string

    belongs_to :user, HsTavern.User

    timestamps
  end

  @required_fields ~w(provider uid user_id)a


  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:provider_uid)
  end
end
