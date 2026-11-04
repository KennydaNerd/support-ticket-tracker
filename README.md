# Support Ticket Tracker

React app for logging, escalating and reporting IT support tickets, with search, filters, saved data and a one-click daily handover report.

**Live demo:** https://support-ticket-tracker-vert.vercel.app/

![Screenshot of the Support Ticket Tracker](docs/screenshot.png)

## Features

- Log incidents with title, site / client, category, priority and description
- Automatic ticket numbers (TCK-001, TCK-002, ...)
- Update status: Open, In Progress, Escalated, Resolved
- Escalate a ticket through support levels 1, 2 and 3
- Search and filter by status and priority
- Live summary counts for each status
- One-click daily report for shift handovers, with copy to clipboard
- Data saved in the browser (localStorage), so tickets survive a refresh
- Fully responsive for desktop and mobile

## Tech stack

- React 18
- Vite
- JavaScript (ES6+)
- CSS3 (Grid and Flexbox)

## Run it locally

```bash
git clone https://github.com/YOUR-USERNAME/support-ticket-tracker.git
cd support-ticket-tracker
npm install
npm run dev
```

Then open the local address shown in the terminal (usually http://localhost:5173).

Build for production:

```bash
npm run build
```

## Project structure

```
src/
  components/   Stats, TicketForm, TicketCard
  data/         Sample tickets, priorities, statuses
  utils/        Daily report builder
  App.jsx       State, filtering and layout
```

## What I practised

- Component-based UI and passing data with props
- State management with `useState`, `useEffect` and `useMemo`
- Controlled forms with validation
- Persisting data with localStorage
- Responsive layout with CSS Grid
- Thinking like a support team: incident logging, escalation and handovers

## Ideas for the future

- Assign tickets to technicians
- SLA timers for response times
- Export the report as PDF or CSV
- Backend and login with a database

## Author

**Kgothatso Kenny Manyaka**
[LinkedIn](#) | [GitHub](#) | [Portfolio](#)
