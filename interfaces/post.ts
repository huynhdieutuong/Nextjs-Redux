export interface ParamsGetPostListType {
  pagesize: number
  currPage: number
}

export interface PostType {
  PID: string
  USERID: string
  fullname: string
  profilepicture: string
  url_image: string
  post_content: string
  time_added: string
  status: string
  count: string | null
}
