defmodule HsTavern.UserAvatar do
  use Arc.Definition
  use Arc.Ecto.Definition

  @versions [:original, :thumb]
  @extension_whitelist ~w(.jpg .jpeg .gif .png)

  def acl(:thumb, _), do: :public_read
  def __storage, do: Arc.Storage.S3

  def validate({file, _}) do
    file_extension = file.file_name |> Path.extname |> String.downcase
    Enum.member?(@extension_whitelist, file_extension)
  end

  def transform(:thumb, _) do
    {:convert, "-thumbnail 48x48^ -gravity center -extent 48x48 -format png", :png}
  end

  def filename(version, _) do
    version
  end

  def storage_dir(_, {_file, user}) do
    "user/#{user.id}"
  end

  def default_url(:thumb) do
    "https://placehold.it/48x48"
  end
end
