defmodule HsTavern.Serializers.UserSerializer do
  use HsTavern.Web, :view
  def to_map(user) do
    %{
      id: user.id,
      name: user.name,
      avatar: HsTavern.UserAvatar.url({user.avatar, user}, :thumb)
    }
  end
end
