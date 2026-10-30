import { STATUSES } from '../data/seed.js'

export default function Stats({ tickets }) {
  return (
    <section className="stats" aria-label="Ticket summary">
      <div className="stat">
        <span className="stat-number">{tickets.length}</span>
        <span className="stat-label">Total</span>
      </div>
      {STATUSES.map((status) => (
        <div className="stat" key={status}>
          <span className="stat-number">{tickets.filter((t) => t.status === status).length}</span>
          <span className="stat-label">{status}</span>
        </div>
      ))}
    </section>
  )
}
