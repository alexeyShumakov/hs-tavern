defmodule HsTavern.Serializers.UserSerializer do
  use HsTavern.Web, :view
  def to_map(user) do
    %{
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: avatar_path(user)
    }
  end

  def avatar_path(user) do
    {a, b} = HsTavern.UserAvatar.url({user.avatar, user}, :thumb)
    |> String.split("/") |> Enum.split(3)
    a ++ [Application.get_env(:arc, :bucket)] ++ b |> Enum.join("/")
  end

end
