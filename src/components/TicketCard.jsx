import { STATUSES } from '../data/seed.js'

const date = (iso) =>
  new Date(iso).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })

export default function TicketCard({ ticket, onStatus, onEscalate, onDelete }) {
  const resolved = ticket.status === 'Resolved'

  return (
    <article className={`card ticket ${resolved ? 'is-resolved' : ''}`}>
      <header className="ticket-head">
        <span className="ticket-id">{ticket.id}</span>
        <span className={`badge priority-${ticket.priority.toLowerCase()}`}>{ticket.priority}</span>
      </header>

      <h3>{ticket.title}</h3>
      <p className="meta">
        {ticket.site} &middot; {ticket.category} &middot; {date(ticket.createdAt)}
      </p>
      {ticket.description && <p className="desc">{ticket.description}</p>}

      <div className="ticket-foot">
        <label className="inline">
          Status
          <select value={ticket.status} onChange={(e) => onStatus(ticket.id, e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <span className="level">Support level {ticket.level}</span>
      </div>

      <div className="actions">
        <button
          className="btn"
          onClick={() => onEscalate(ticket.id)}
          disabled={resolved || ticket.level >= 3}
          title="Move this ticket to the next support level"
        >
          Escalate
        </button>
        <button className="btn danger" onClick={() => onDelete(ticket.id)}>
          Delete
        </button>
      </div>
    </article>
  )
}
