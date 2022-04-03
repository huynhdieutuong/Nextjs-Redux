export interface ParamsGetPostListType {
  pagesize: number
  currPage: number
}

export interface ParamsGetPostListByCatIdType {
  pagesize: number
  currPage: number
  catId: number
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

export interface CategoryType {
  text: string
  id: number
}

export interface CreatePostType {
  obj_image: {
    file: File
    url: string
  }
  url_image: string
  post_content: string
  category: string
}
