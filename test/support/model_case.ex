defmodule HsTavern.ModelCase do
  @moduledoc """
  This module defines the test case to be used by
  model tests.

  You may define functions here to be used as helpers in
  your model tests. See `errors_on/2`'s definition as reference.

  Finally, if the test case interacts with the database,
  it cannot be async. For this reason, every test runs
  inside a transaction which is reset at the beginning
  of the test unless the test case is marked as async.
  """

  use ExUnit.CaseTemplate

  using do
    quote do
      alias HsTavern.Repo

      import Ecto
      import Ecto.Changeset
      import Ecto.Query
      import HsTavern.ModelCase
    end
  end

  setup tags do
    :ok = Ecto.Adapters.SQL.Sandbox.checkout(HsTavern.Repo)

    unless tags[:async] do
      Ecto.Adapters.SQL.Sandbox.mode(HsTavern.Repo, {:shared, self()})
    end

    :ok
  end

  def errors_on(changeset) do
    Ecto.Changeset.traverse_errors(changeset, fn {message, opts} ->
      Enum.reduce(opts, message, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
