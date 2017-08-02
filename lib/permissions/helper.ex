defmodule HsTavern.Permissions do
  def forbidden, do: {:error, :unauthorized}
end
