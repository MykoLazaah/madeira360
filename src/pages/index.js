// Главная страница с автоматическим языком
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getAllPosts } from '../lib/posts'
import LeadForm from '../components/LeadForm'

export async function getStaticProps({ locale }) {
  const posts = getAllPosts(locale).slice(0, 3)
  return { props: { posts } }
}

export default function Home({ posts }) {
  const router = useRouter()
  const lang = router.locale // 'de' или 'en' автоматически

  return (
    <>
      <Head>
        <title>{lang === 'de' ? 'Madeira Guide' : 'Madeira Guide (EN)'}</title>
        <meta name="description" content="Insider Guide Madeira" />
        <link rel="alternate" hrefLang="de" href="https://madeira360.online/de" />
        <link rel="alternate" hrefLang="en" href="https://madeira360.online/en" />
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
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
