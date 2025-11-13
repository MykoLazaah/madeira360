import { useState } from 'react'
import axios from 'axios'

export default function LeadForm({ lang='de' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [ok, setOk] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(process.env.NEXT_PUBLIC_LEAD_WEBHOOK || '/api/lead', {
        name, email, lang, utm: 'organic'
      })
      setOk(true)
      setEmail(''); setName('')
    } catch (err) {
      setOk(false)
    }
  }

  return (
    <form onSubmit={submit} style={{margin:'1rem 0'}}>
      <input placeholder={lang==='de' ? 'Name' : 'Name'} value={name} onChange={e=>setName(e.target.value)} required />
      <input placeholder="email@example.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <button type="submit"> {lang==='de' ? 'Kostenloser Guide' : 'Free Guide'}</button>
      {ok===true && <div>Danke — check dein Postfach.</div>}
      {ok===false && <div>Fehler — versuche später.</div>}
    </form>
  )
}
