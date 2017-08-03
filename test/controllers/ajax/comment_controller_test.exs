defmodule HsTavernWeb.AjaxCommentControllerTest do
  use HsTavernWeb.ConnCase
  import HsTavern.Factory

  setup _context do
    entity_params = %{entity_type: "foo", entity_id: 42}
    comment = insert(:comment, entity_params)
    conn = build_conn()
    {:ok, comment: comment, conn: conn, entity_params: entity_params}
  end

  test "GET /ajax/comments", %{comment: comment, conn: conn, entity_params: entity_params} do
    insert(:comment)
    conn = get(conn, ajax_comment_path(conn, :index, entity_params))
    [%{"id" => comment_id, "entity_type" => "foo", "entity_id" => 42}] = json_response(conn, 200)
    assert comment_id == comment.id
    assert length(json_response(conn, 200)) == 1
  end
end
