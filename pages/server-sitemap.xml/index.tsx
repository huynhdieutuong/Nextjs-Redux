import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { CategoryType, PostType } from '../../interfaces/post'
import postService from '../../services/post'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteUrl = 'https://nextjs-redux-tuong.netlify.app'

  const [resPostList, resCategories] = await Promise.all([
    postService.getPostList({ pagesize: 10, currPage: 1 }),
    postService.getCategories(),
  ])
  const postList = resPostList.data.posts || []
  const categoryList = resCategories.data.categories || []

  const posts = postList.map((post: PostType) => ({
    loc: `${siteUrl}/posts/${post.PID}`,
    lastmod: new Date().toISOString(),
  }))

  const categories = categoryList.map((category: CategoryType) => ({
    loc: `${siteUrl}/categories/${category.id}`,
    lastmod: new Date().toISOString(),
  }))

  const fields: ISitemapField[] = [...posts, ...categories]

  return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default function Sitemap() {}
