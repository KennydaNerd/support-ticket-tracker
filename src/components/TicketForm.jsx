import { useState } from 'react'
import { CATEGORIES, PRIORITIES } from '../data/seed.js'

const empty = {
  title: '',
  site: '',
  description: '',
  category: CATEGORIES[0],
  priority: 'Medium',
}

export default function TicketForm({ onAdd }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.site.trim()) {
      setError('Please add a title and a site / client name.')
      return
    }
    onAdd({ ...form, title: form.title.trim(), site: form.site.trim(), description: form.description.trim() })
    setForm(empty)
    setError('')
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h2>Log a new incident</h2>

      <label>
        Issue title
        <input name="title" value={form.title} onChange={update} placeholder="e.g. Screen not powering on" />
      </label>

      <label>
        Site / client
        <input name="site" value={form.site} onChange={update} placeholder="e.g. Rosebank Branch" />
      </label>

      <div className="row">
        <label>
          Category
          <select name="category" value={form.category} onChange={update}>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select name="priority" value={form.priority} onChange={update}>
            {PRIORITIES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Description
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={update}
          placeholder="What happened? What has already been tried?"
        />
      </label>

      {error && <p className="error" role="alert">{error}</p>}
      <button type="submit" className="btn primary">Log ticket</button>
    </form>
  )
}
