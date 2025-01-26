import { supabase } from "@/supabase";

// // 게시물 댓글 조회
// export const getComments = async (table, postId) => {
//   const { data, error } = await supabase
//     .from(table)
//     .select("*")
//     .eq("post_id", postId);

//   if (error) {
//     console.error("Error fetching free post comments:", error);
//     return null;
//   }
//   return data;
// };

// 게시물 댓글 조회 (유저 정보, 이미지 추가)
export const getComments = async (table, postId) => {
  const { data, error } = await supabase
    .from("free_post_comment")
    .select(
      `
    id,
    post_id,
    content,
    created_at,
    member_id,
    user_info (
      name,
      image
    )
  `
    )
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching free post comments:", error);
    return null;
  }
  return data;
};

// 게시물에 댓글 추가
export const createComment = async (table, memberId, postId, content) => {
  const { data, error } = await supabase
    .from(table)
    .insert([{ member_id: memberId, post_id: postId, content }]).select(`
      id,
      post_id,
      content,
      created_at,
      member_id,
      user_info (
        name,
        image
      )
    `); // 삽입된 데이터와 관련된 user_info를 반환

  if (error) {
    console.error("Error creating free post comment:", error);
    return null;
  }
  return data;
};

// 자유 게시물 댓글 삭제
export const deleteComment = async (table, commentId) => {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Error deleting free post comment:", error);
    return null;
  }
  return data;
};
