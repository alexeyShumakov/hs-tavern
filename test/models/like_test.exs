defmodule HsTavern.LikeTest do
  use HsTavern.ModelCase

  alias HsTavern.Like

  @valid_attrs %{user_id: 1, entity_id: 1, entity_type: "comment"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Like.changeset(%Like{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Like.changeset(%Like{}, @invalid_attrs)
    refute changeset.valid?
  end
end
