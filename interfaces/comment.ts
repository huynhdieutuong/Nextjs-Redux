export interface CommentType {
  CID: string
  PID: string
  USERID: string
  fullname: string
  profilepicture: string
  comment: string
  time_added: string
}

export interface AddCommentType {
  comment: string
  postid: string
}
