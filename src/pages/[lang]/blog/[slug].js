import Head from 'next/head'
import { getAllPosts, getPostBySlug } from '../../../lib/posts'

export async function getStaticPaths() {
  const dePosts = getAllPosts('de')
  const enPosts = getAllPosts('en')
  
  const paths = [
    ...dePosts.map(p => ({ params: { lang: 'de', slug: p.slug } })),
    ...enPosts.map(p => ({ params: { lang: 'en', slug: p.slug } }))
  ]
  
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.lang, params.slug)
  return { props: { post: post.meta, content: post.content } }
}

export default function Post({ post, content }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description || ''}/>
      </Head>
      <article style={{padding: '2rem', maxWidth:800, margin:'0 auto'}}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </>
  )
}
