import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Stats from './components/Stats.jsx'
import TicketForm from './components/TicketForm.jsx'
import TicketCard from './components/TicketCard.jsx'
import { PRIORITIES, STATUSES, seedTickets } from './data/seed.js'
import { buildReport } from './utils/report.js'

const STORAGE_KEY = 'support-ticket-tracker:v1'

function loadTickets() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : seedTickets
  } catch {
    return seedTickets
  }
}

export default function App() {
  const [tickets, setTickets] = useState(loadTickets)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [report, setReport] = useState('')
  const [copied, setCopied] = useState(false)

  // Save to the browser every time tickets change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets))
    } catch {
      /* storage unavailable - app still works for this session */
    }
  }, [tickets])

  const addTicket = (data) => {
    const next = tickets.reduce((max, t) => Math.max(max, parseInt(t.id.split('-')[1], 10)), 0) + 1
    const ticket = {
      ...data,
      id: `TCK-${String(next).padStart(3, '0')}`,
      status: 'Open',
      level: 1,
      createdAt: new Date().toISOString(),
    }
    setTickets([ticket, ...tickets])
  }

  const changeStatus = (id, status) =>
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status } : t)))

  const escalate = (id) =>
    setTickets(
      tickets.map((t) =>
        t.id === id && t.level < 3 ? { ...t, level: t.level + 1, status: 'Escalated' } : t,
      ),
    )

  const remove = (id) => setTickets(tickets.filter((t) => t.id !== id))

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tickets.filter((t) => {
      const matchesText =
        !q || [t.id, t.title, t.site, t.description].some((v) => v.toLowerCase().includes(q))
      const matchesStatus = statusFilter === 'All' || t.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter
      return matchesText && matchesStatus && matchesPriority
    })
  }, [tickets, search, statusFilter, priorityFilter])

  const generateReport = () => {
    setReport(buildReport(tickets))
    setCopied(false)
  }

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(report)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <h1>Support Ticket Tracker</h1>
          <p className="subtitle">Log incidents, escalate them and generate a handover report.</p>
        </div>
        <button className="btn primary" onClick={generateReport}>
          Generate daily report
        </button>
      </header>

      <Stats tickets={tickets} />

      {report && (
        <section className="card report" aria-label="Daily report">
          <div className="report-head">
            <h2>Daily report</h2>
            <div>
              <button className="btn" onClick={copyReport}>{copied ? 'Copied!' : 'Copy'}</button>
              <button className="btn" onClick={() => setReport('')}>Close</button>
            </div>
          </div>
          <pre>{report}</pre>
        </section>
      )}

      <main className="layout">
        <aside>
          <TicketForm onAdd={addTicket} />
        </aside>

        <section>
          <div className="filters">
            <input
              type="search"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search tickets"
            />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status">
              <option>All</option>
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} aria-label="Filter by priority">
              <option>All</option>
              {PRIORITIES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="ticket-grid">
            {visible.length === 0 ? (
              <p className="empty">No tickets match your filters.</p>
            ) : (
              visible.map((t) => (
                <TicketCard
                  key={t.id}
                  ticket={t}
                  onStatus={changeStatus}
                  onEscalate={escalate}
                  onDelete={remove}
                />
              ))
            )}
          </div>
        </section>
      </main>

      <footer className="footer">Built with React + Vite. Data is saved in your browser.</footer>
    </div>
  )
}
