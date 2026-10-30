const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-ZA', { day: '2-digit', month: 'short', year: 'numeric' })

// Builds a plain-text daily / handover report from the tickets.
export function buildReport(tickets) {
  const today = new Date().toLocaleDateString('en-ZA', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const count = (status) => tickets.filter((t) => t.status === status).length
  const active = tickets.filter((t) => t.status !== 'Resolved')

  const lines = [
    `DAILY SUPPORT REPORT - ${today}`,
    '',
    'SUMMARY',
    `Total tickets: ${tickets.length}`,
    `Open: ${count('Open')} | In Progress: ${count('In Progress')} | Escalated: ${count('Escalated')} | Resolved: ${count('Resolved')}`,
    '',
    'ACTIVE TICKETS (HANDOVER)',
  ]

  if (active.length === 0) {
    lines.push('No active tickets. All clear.')
  } else {
    active.forEach((t) => {
      lines.push(
        `- ${t.id} [${t.priority}] ${t.title} | ${t.site} | ${t.status} (Level ${t.level}) | Logged ${fmt(t.createdAt)}`,
      )
    })
  }

  return lines.join('\n')
}
