# AttendHub

Simple English RBAC attendance website.

**Repo:** [f99-tech/RBAC](https://github.com/f99-tech/RBAC)

Open `index.html` in a browser. No server and no password. Roles are switched in the top-right dropdown.

## Who is included

- 1 manager: **Victoria Hale** (Office Manager)
- 30 employees across Sales, Operations, IT, Finance, HR, Support, Admin, Marketing

## Access rules

| Role | What they can see |
| --- | --- |
| Manager | All people and every check-in / check-out |
| Supervisor | Only their department |
| Staff | Only their own attendance |

Supervisors in the demo: Priya Sharma (Sales), Omar Hassan (Operations), Emily Chen (IT), Tom Hughes (Support).

## Pages

- `index.html` — home, live clock, check in / check out
- `records.html` — attendance table (filtered by role)
- `people.html` — staff cards allowed by the current role

## Try it

1. Stay as Victoria Hale and open Records — full company log.
2. Switch to Priya Sharma — Sales only.
3. Switch to Noah Williams — only Noah's times.
4. Use **Check in now** / **Check out now**. Those punches stay in this browser.
5. Use the theme button for light / dark.
