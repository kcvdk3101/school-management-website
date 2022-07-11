import { PostModel } from '../../models/post.model'
import axiosUniveristy from './axiosUniversity'

const url = '/post'

const postApi = {
  getAllPost(adminId: number) {
    return axiosUniveristy.get<string, { data: PostModel[]; pagination: { total: number } }>(
      `${url}/all?limit=100&offset=0&authorId=${adminId}`
    )
  },

  addNewPost(adminId: number, post: PostModel[]) {
    return axiosUniveristy.post<string, PostModel[]>(`${url}?authorId=${adminId}`, { post })
  },

  updatePostStatus(postId: string) {
    return axiosUniveristy.patch<string, { title: string; content: string; isPublished: boolean }>(
      `${url}/status?id=${postId}`
    )
  },

  editPost(postId: string, post: PostModel) {
    return axiosUniveristy.patch<string, { title: string; content: string; isPublished: boolean }>(
      `${url}?id=${postId}`,
      { post }
    )
  },
}

export default postApi
