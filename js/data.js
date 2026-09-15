/* AttendHub — mock staff + attendance (frontend-only demo) */

window.ATTEND_HUB = {
  company: "AttendHub",
  workStart: "09:00",
  workEnd: "17:30",
};

window.STAFF = [
  {
    id: "mgr",
    name: "Victoria Hale",
    title: "Office Manager",
    dept: "Management",
    access: "admin",
    emoji: "\ud83d\udc51",
    color: "#7c3aed",
    email: "victoria.hale@attendhub.demo",
  },
  { id: "e01", name: "Priya Sharma", title: "Sales Supervisor", dept: "Sales", access: "supervisor", emoji: "\ud83d\udcc8", color: "#2563eb", email: "priya.sharma@attendhub.demo" },
  { id: "e02", name: "Noah Williams", title: "Sales Executive", dept: "Sales", access: "staff", emoji: "\ud83e\udd1d", color: "#2563eb", email: "noah.williams@attendhub.demo" },
  { id: "e03", name: "Fatima Ali", title: "Sales Executive", dept: "Sales", access: "staff", emoji: "\ud83d\udcac", color: "#2563eb", email: "fatima.ali@attendhub.demo" },
  { id: "e04", name: "Daniel Kim", title: "Sales Executive", dept: "Sales", access: "staff", emoji: "\ud83d\udcde", color: "#2563eb", email: "daniel.kim@attendhub.demo" },
  { id: "e05", name: "Elena Vargas", title: "Sales Coordinator", dept: "Sales", access: "staff", emoji: "\ud83d\uddc2\ufe0f", color: "#2563eb", email: "elena.vargas@attendhub.demo" },
  { id: "e06", name: "Omar Hassan", title: "Operations Supervisor", dept: "Operations", access: "supervisor", emoji: "\ud83e\udded", color: "#0d9488", email: "omar.hassan@attendhub.demo" },
  { id: "e07", name: "Sofia Rossi", title: "Operations Coordinator", dept: "Operations", access: "staff", emoji: "\ud83d\udccb", color: "#0d9488", email: "sofia.rossi@attendhub.demo" },
  { id: "e08", name: "Ahmed Khan", title: "Operations Coordinator", dept: "Operations", access: "staff", emoji: "\ud83e\uddf1", color: "#0d9488", email: "ahmed.khan@attendhub.demo" },
  { id: "e09", name: "Maya Patel", title: "Operations Staff", dept: "Operations", access: "staff", emoji: "\ud83d\udee0\ufe0f", color: "#0d9488", email: "maya.patel@attendhub.demo" },
  { id: "e10", name: "Jack Thompson", title: "Warehouse Associate", dept: "Operations", access: "staff", emoji: "\ud83d\udce6", color: "#0d9488", email: "jack.thompson@attendhub.demo" },
  { id: "e11", name: "Mei Wong", title: "Warehouse Associate", dept: "Operations", access: "staff", emoji: "\ud83c\udff7\ufe0f", color: "#0d9488", email: "mei.wong@attendhub.demo" },
  { id: "e12", name: "Carlos Diaz", title: "Logistics Officer", dept: "Operations", access: "staff", emoji: "\ud83d\ude9a", color: "#0d9488", email: "carlos.diaz@attendhub.demo" },
  { id: "e13", name: "Samir Nasser", title: "Facilities Officer", dept: "Operations", access: "staff", emoji: "\ud83d\udd27", color: "#0d9488", email: "samir.nasser@attendhub.demo" },
  { id: "e14", name: "Emily Chen", title: "IT Supervisor", dept: "IT", access: "supervisor", emoji: "\ud83d\udcbb", color: "#db2777", email: "emily.chen@attendhub.demo" },
  { id: "e15", name: "Liam O'Brien", title: "IT Support Specialist", dept: "IT", access: "staff", emoji: "\ud83c\udfa7", color: "#db2777", email: "liam.obrien@attendhub.demo" },
  { id: "e16", name: "Yuki Tanaka", title: "Software Developer", dept: "IT", access: "staff", emoji: "⌨\ufe0f", color: "#db2777", email: "yuki.tanaka@attendhub.demo" },
  { id: "e17", name: "Chloe Dubois", title: "Software Developer", dept: "IT", access: "staff", emoji: "\ud83e\udde9", color: "#db2777", email: "chloe.dubois@attendhub.demo" },
  { id: "e18", name: "Hassan Malik", title: "Network Administrator", dept: "IT", access: "staff", emoji: "\ud83c\udf10", color: "#db2777", email: "hassan.malik@attendhub.demo" },
  { id: "e19", name: "Lucas Silva", title: "Finance Analyst", dept: "Finance", access: "staff", emoji: "\ud83d\udcca", color: "#d97706", email: "lucas.silva@attendhub.demo" },
  { id: "e20", name: "Isabella Garcia", title: "Finance Analyst", dept: "Finance", access: "staff", emoji: "\ud83d\udcb9", color: "#d97706", email: "isabella.garcia@attendhub.demo" },
  { id: "e21", name: "Ryan Brooks", title: "Accountant", dept: "Finance", access: "staff", emoji: "\ud83e\uddee", color: "#d97706", email: "ryan.brooks@attendhub.demo" },
  { id: "e22", name: "Nora Ibrahim", title: "Payroll Officer", dept: "Finance", access: "staff", emoji: "\ud83d\udcb5", color: "#d97706", email: "nora.ibrahim@attendhub.demo" },
  { id: "e23", name: "Aisha Rahman", title: "HR Officer", dept: "HR", access: "staff", emoji: "\ud83c\udf38", color: "#e11d48", email: "aisha.rahman@attendhub.demo" },
  { id: "e24", name: "Tom Hughes", title: "Support Team Lead", dept: "Support", access: "supervisor", emoji: "\ud83e\ude7d", color: "#0284c7", email: "tom.hughes@attendhub.demo" },
  { id: "e25", name: "Layla Haddad", title: "Support Agent", dept: "Support", access: "staff", emoji: "\ud83d\udce8", color: "#0284c7", email: "layla.haddad@attendhub.demo" },
  { id: "e26", name: "Ben Foster", title: "Support Agent", dept: "Support", access: "staff", emoji: "\ud83d\udd14", color: "#0284c7", email: "ben.foster@attendhub.demo" },
  { id: "e27", name: "Amira Said", title: "Support Agent", dept: "Support", access: "staff", emoji: "\ud83d\udca1", color: "#0284c7", email: "amira.said@attendhub.demo" },
  { id: "e28", name: "Hannah Berg", title: "Receptionist", dept: "Admin", access: "staff", emoji: "\ud83c\udf80", color: "#4f46e5", email: "hannah.berg@attendhub.demo" },
  { id: "e29", name: "Olivia Grant", title: "Marketing Specialist", dept: "Marketing", access: "staff", emoji: "\ud83d\udce3", color: "#c026d3", email: "olivia.grant@attendhub.demo" },
  { id: "e30", name: "Kenji Sato", title: "Marketing Specialist", dept: "Marketing", access: "staff", emoji: "\ud83c\udfa8", color: "#c026d3", email: "kenji.sato@attendhub.demo" },
];

window.DEPT_COLORS = {
  Management: "#7c3aed",
  Sales: "#2563eb",
  Operations: "#0d9488",
  IT: "#db2777",
  Finance: "#d97706",
  HR: "#e11d48",
  Support: "#0284c7",
  Admin: "#4f46e5",
  Marketing: "#c026d3",
};

function seeded(id, day) {
  let h = 0;
  const s = id + "-" + day;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return pad(h) + ":" + pad(m);
}

/** Build last 14 calendar days of mock punches (weekends off). */
function buildSeedRecords() {
  const records = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  for (let d = 13; d >= 0; d--) {
    const date = new Date(today);
    date.setDate(today.getDate() - d);
    const iso = date.toISOString().slice(0, 10);
    const dow = date.getDay();
    const weekend = dow === 0 || dow === 6;

    STAFF.forEach((person) => {
      if (weekend) {
        records.push({
          id: person.id + "-" + iso,
          staffId: person.id,
          date: iso,
          in: null,
          out: null,
          status: "weekend",
        });
        return;
      }

      const n = seeded(person.id, iso);
      const roll = n % 100;
      let status, inn, out;

      if (roll < 6) {
        status = "absent";
        inn = null;
        out = null;
      } else if (roll < 22) {
        status = "late";
        inn = minutesToTime(9 * 60 + 8 + (n % 42));
        out = minutesToTime(17 * 60 + 20 + (n % 55));
      } else if (roll < 30) {
        status = "early-leave";
        inn = minutesToTime(8 * 60 + 40 + (n % 25));
        out = minutesToTime(16 * 60 + (n % 40));
      } else {
        status = "on-time";
        inn = minutesToTime(8 * 60 + 35 + (n % 24));
        out = minutesToTime(17 * 60 + 28 + (n % 40));
      }

      records.push({
        id: person.id + "-" + iso,
        staffId: person.id,
        date: iso,
        in: inn,
        out: out,
        status,
      });
    });
  }
  return records;
}

window.SEED_RECORDS = buildSeedRecords();
