// Sample tickets shown the first time the app loads.
export const PRIORITIES = ['Low', 'Medium', 'High', 'Critical']
export const STATUSES = ['Open', 'In Progress', 'Escalated', 'Resolved']
export const CATEGORIES = ['Hardware', 'Network', 'Software', 'Display / Screen', 'Other']

const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString()

export const seedTickets = [
  {
    id: 'TCK-001',
    title: 'Store screen showing "No Signal"',
    site: 'Sandton City Store',
    description: 'Display powers on but shows No Signal. Cable checked on site by staff.',
    category: 'Display / Screen',
    priority: 'High',
    status: 'In Progress',
    level: 1,
    createdAt: daysAgo(1),
  },
  {
    id: 'TCK-002',
    title: 'Wi-Fi drops every few minutes',
    site: 'Head Office',
    description: 'Staff report the connection dropping in the east wing. Router lights are normal.',
    category: 'Network',
    priority: 'Medium',
    status: 'Escalated',
    level: 2,
    createdAt: daysAgo(2),
  },
  {
    id: 'TCK-003',
    title: 'Printer offline after update',
    site: 'Rosebank Branch',
    description: 'Printer shows offline on all PCs. Restarted printer, issue remains.',
    category: 'Hardware',
    priority: 'Low',
    status: 'Resolved',
    level: 1,
    createdAt: daysAgo(4),
  },
]
