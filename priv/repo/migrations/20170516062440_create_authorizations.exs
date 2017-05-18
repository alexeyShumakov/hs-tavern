defmodule HsTavern.Repo.Migrations.CreateAuthorizations do
  use Ecto.Migration

  def change do
    create table(:authorizations) do
      add :provider, :string
      add :uid, :string
      add :user_id, references(:users, on_delete: :delete_all)
      add :token, :string

      timestamps()
    end

    create unique_index(:authorizations, [:provider, :uid])
    create index(:authorizations, [:provider, :token])
  end
end
