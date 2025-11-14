const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { remark } = require('remark')
const html = require('remark-html')

const contentDir = path.join(process.cwd(), 'content')

async function getPostBySlug(lang, slug) {
  const fullPath = path.join(contentDir, lang, 'blog', slug + '.md')
  const file = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(file)
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()
  return { meta: data, content: contentHtml }
}

function getAllPosts(lang) {
  const dir = path.join(contentDir, lang, 'blog')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(filename => {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data } = matter(raw)
      const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')
      return { ...data, slug }
    })
    .sort((a,b) => new Date(b.date) - new Date(a.date))
}

module.exports = { getPostBySlug, getAllPosts }
