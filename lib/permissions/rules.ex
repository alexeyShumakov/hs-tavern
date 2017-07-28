alias HsTavern.{User, Desk}

defimpl Canada.Can, for: User do
  def can?(%User{id: user_id}, action, %Desk{user_id: desk_user_id})
    when action in [:edit, :delete, :update], do: user_id == desk_user_id
end
