defmodule HsTavern.UserTest do
  use HsTavern.ModelCase

  alias HsTavern.User

  @valid_attrs %{email: "some@content.com", name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
