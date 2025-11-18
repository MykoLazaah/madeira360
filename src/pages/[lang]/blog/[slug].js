import Head from 'next/head'
import { getAllPosts, getPostBySlug } from '../../lib/posts'

export async function getStaticPaths({ locales }) {
  const paths = []
  
  // Для каждого языка собираем все посты
  locales.forEach(locale => {
    const posts = getAllPosts(locale)
    posts.forEach(post => {
      paths.push({
        params: { slug: post.slug },
        locale // Next.js автоматически добавит /de или /en
      })
    })
  })
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params, locale }) {
  // locale = 'de' или 'en' автоматически от Next.js
  const post = await getPostBySlug(locale, params.slug)
  return { 
    props: { 
      post: post.meta, 
      content: post.content 
    } 
  }
}

export default function Post({ post, content }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || ''} />
      </Head>
      <article style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  )
}
