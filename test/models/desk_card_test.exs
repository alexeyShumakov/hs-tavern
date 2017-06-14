defmodule HsTavern.DeskCardTest do
  use HsTavern.ModelCase

  alias HsTavern.DeskCard

  @valid_attrs %{count: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = DeskCard.changeset(%DeskCard{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = DeskCard.changeset(%DeskCard{}, @invalid_attrs)
    refute changeset.valid?
  end
end
