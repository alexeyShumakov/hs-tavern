defmodule HsTavern.Serializers.UserSerializer do
  use HsTavern.Web, :view
  def to_map(users) when is_list(users) do
    Enum.map users, &to_map(&1)
  end
  def to_map(user) do
    %{
      id: user.id,
      name: user.name,
      avatar: HsTavern.UserAvatar.url({user.avatar, user}, :thumb)
    }
  end
end
