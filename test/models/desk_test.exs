defmodule HsTavern.DeskTest do
  use HsTavern.ModelCase

  alias HsTavern.Desk

  @valid_attrs %{user_id: 1, description: "some content", player_class: "some content", standard: true, title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Desk.changeset(%Desk{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Desk.changeset(%Desk{}, @invalid_attrs)
    refute changeset.valid?
  end
end
