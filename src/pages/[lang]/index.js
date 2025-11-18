import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../../lib/posts'
import LeadForm from '../../components/LeadForm'

export async function getStaticProps({ params }) {
  const lang = params.lang || 'de'
  const posts = getAllPosts(lang).slice(0, 3)
  return { props: { posts, lang } }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { lang: 'de' } }, 
      { params: { lang: 'en' } }
    ],
    fallback: false,
  }
}

export default function Home({ posts, lang }) {
  return (
    <>
      <Head>
        <title>{lang === 'de' ? 'Madeira Guide' : 'Madeira Guide (EN)'}</title>
        <meta name="description" content="Insider Guide Madeira — Wanderungen, Strände, Apartments." />
        <link rel="alternate" hrefLang="de" href={"https://madeira360.online/de/"} />
        <link rel="alternate" hrefLang="en" href={"https://madeira360.online/en/"} />
      </Head>
      
      <main style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
        <h1>{lang === 'de' ? 'Entdecke Madeira' : 'Discover Madeira'}</h1>
        <p>{lang === 'de' ? 'Tipps, Touren & Ferienwohnungen' : 'Tips, tours & rentals'}</p>
        
        <LeadForm lang={lang} />
        
        <section>
          <h2>{lang === 'de' ? 'Neu im Blog' : 'Latest posts'}</h2>
          <ul>
            {posts.map(p => (
              <li key={p.slug}>
                <Link href={`/${lang}/blog/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
