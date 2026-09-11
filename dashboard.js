"use strict";
(() => {
  const root = document.querySelector(".dashboard");
  if (!root) return;
  const admin = root.dataset.role === "admin",
    content = document.querySelector("#dashboard-content");
  const items = admin
    ? [
        "Overview",
        "Projects",
        "Clients",
        "Energy Assets",
        "Performance",
        "Analytics",
        "Sustainability",
        "Reports",
        "Maintenance",
        "Messages",
      ]
    : [
        "Overview",
        "Energy Usage",
        "Generation",
        "Projects",
        "Carbon Savings",
        "Analytics",
        "Reports",
        "Support",
      ];
  const symbols = ["◫", "⌁", "☼", "▤", "◷", "⌘", "↗", "▧", "✉", "◇", "⚙"];
  let active = "Overview",
    charts = [],
    period = "September 2026";
  let userEmail = "you@example.com";
  try {
    userEmail = sessionStorage.getItem("stackly-demo-email") || userEmail;
  } catch {}
  let maintenance = [
    {
      id: "MT-104",
      asset: "AP Solar · Inverter 02",
      task: "Review temperature trend",
      priority: "Scheduled",
      date: "12 Sep 2026",
      done: false,
    },
    {
      id: "MT-105",
      asset: "TN Wind · Turbine 04",
      task: "Preventive inspection",
      priority: "High",
      date: "10 Sep 2026",
      done: false,
    },
    {
      id: "MT-106",
      asset: "KA Storage · Rack 03",
      task: "Check cooling filters",
      priority: "Routine",
      date: "15 Sep 2026",
      done: false,
    },
  ];
  let messages = [
    {
      id: 1,
      name: "Andhra Manufacturing",
      subject: "Monthly energy report",
      body: "Please include the generation and self-consumption breakdown in the next illustrative report. The operations team would also like the inverter availability summary.",
      read: false,
    },
    {
      id: 2,
      name: "Southern Wind Operations",
      subject: "Inspection schedule",
      body: "The demonstration turbine inspection is planned for 10 September. Please review access arrangements and the maintenance queue before confirming the schedule.",
      read: false,
    },
    {
      id: 3,
      name: "Deccan Storage Campus",
      subject: "Commissioning checklist",
      body: "The storage concept is at commissioning stage. The next review covers protection settings, operating limits and handover documentation.",
      read: true,
    },
  ];
  let tickets = [
    {
      id: "SP-201",
      subject: "Understand monthly export",
      status: "Open",
      date: "08 Sep 2026",
    },
    {
      id: "SP-198",
      subject: "Generation report request",
      status: "Resolved",
      date: "03 Sep 2026",
    },
  ];
  let settings = {
    name: admin ? "Energy administrator" : "Energy client",
    unit: "kWh",
    digest: true,
  };
  try {
    settings = {
      ...settings,
      ...JSON.parse(
        localStorage.getItem("stackly-" + root.dataset.role + "-settings") ||
          "{}",
      ),
    };
  } catch {}
  const safe = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const welcomeText = () => `Welcome back, ${safe(userEmail)}`;
  const topLabel = document.querySelector(".dash-top span:first-child");
  if (topLabel)
    topLabel.innerHTML = `${safe(topLabel.textContent)}<br><strong class="dashboard-welcome">${welcomeText()}</strong>`;
  const money = (n) => "₹" + n.toLocaleString("en-IN");
  const q = (s) => content.querySelector(s),
    qa = (s) => [...content.querySelectorAll(s)];
  const kpis = (arr) =>
    '<div class="kpis">' +
    arr
      .map(
        ([label, val, trend]) =>
          `<div class="kpi"><label>${label}</label><strong>${val}</strong><small>${trend}</small></div>`,
      )
      .join("") +
    "</div>";
  const chart = (id, title, sub = "Illustrative data") =>
    `<section class="chart-card"><h3>${title}</h3><p class="small">${sub}</p><div class="chart-box"><canvas id="${id}" role="img" aria-label="${title}"></canvas></div><div class="chart-summary small" id="summary-${id}" style="margin-top:16px"></div></section>`;
  const table = (heads, rows, label = "Data table") =>
    `<div class="table-wrap" role="region" aria-label="${label}" tabindex="0"><table><thead><tr>${heads.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  const badge = (t) => `<span class="tag">${t}</span>`;
  const heading = (title, desc, actions = "") =>
    `<div class="dash-heading"><div><h1>${title}</h1><p>${desc}</p></div>${actions}</div>`;
  const periodControl = () =>
    '<label style="margin:0;font-size:12px">Reporting period<select id="period" style="font-size:13px;min-width:175px"><option>September 2026</option><option>August 2026</option><option>July 2026</option></select></label>';
  const overviewClient = () =>
    kpis([
      [
        "Energy generated",
        "18,420 kWh",
        "Month to date · +8.2% vs prior period",
      ],
      [
        "Energy consumed",
        "15,680 kWh",
        "Month to date · −3.1% vs prior period",
      ],
      ["Grid export", "4,120 kWh", "Month to date · 22.4% of generation"],
      ["Current solar output", "142 kW", "Illustrative instantaneous reading"],
      ["Battery level", "78%", "State of charge · Demo"],
      ["Carbon avoided", "13.08 tCO₂e", "Illustrative factor: 0.71 kg/kWh"],
      [
        "Monthly electricity value",
        money(114400),
        "14,300 kWh self-consumed × ₹8",
      ],
      ["Grid import", "1,380 kWh", "Consumption less self-consumed solar"],
    ]) +
    `<div class="dash-grid">${chart("daily", "Today’s energy generation", "Hourly solar generation · kWh")}${chart("mix", "Your generation mix", "Share of locally generated energy")}</div><div class="grid two"><section class="chart-card"><h3>Your connected project</h3><div class="list-row"><div><strong>Commercial rooftop solar</strong><p>Andhra Pradesh · 200 kW demonstration</p></div>${badge("Operational")}</div><div class="list-row"><span>Current solar output</span><strong>142 kW</strong></div><div class="list-row"><span>Battery state of charge</span><strong>78%</strong></div><button class="btn secondary small" data-view="Projects" style="margin-top:20px">View project</button></section><section class="chart-card"><h3>A useful next step</h3><p class="small">Your illustrative peak demand occurs between 12:00 and 15:00. Review which flexible loads can be scheduled during solar generation hours.</p><button class="btn secondary small" data-view="Energy Usage">Explore energy usage</button><p class="small" style="margin-top:18px">Data shown is simulated, not connected to live equipment.</p></section></div>`;
  const overviewAdmin = () =>
    kpis([
      ["Renewable capacity", "250 MW", "Illustrative portfolio"],
      ["Active projects", "180", "12 additional concepts this year"],
      ["Energy generated", "42,800 MWh", "Illustrative monthly generation"],
      ["Active clients", "120", "Across demonstration regions"],
      ["Carbon avoided", "30,388 tCO₂e", "42,800 MWh × 0.71 tCO₂e/MWh"],
      ["Solar sites", "112", "Illustrative asset count"],
      ["Wind sites", "48", "Illustrative asset count"],
      ["Storage capacity", "96 MWh", "20 demonstration sites"],
    ]) +
    `<div class="dash-grid">${chart("portfolio", "Portfolio generation", "Solar and wind · MWh / month")}${chart("regional", "Capacity by region", "Illustrative installed MW")}</div><section class="chart-card"><h3>Operations requiring attention</h3>${maintenance
      .filter((m) => !m.done)
      .map(
        (m) =>
          `<div class="list-row"><div><strong>${m.task}</strong><p>${m.asset} · ${m.date}</p></div><button class="btn secondary small" data-view="Maintenance">Review task</button></div>`,
      )
      .join("")}</section>`;
  function projectView() {
    const rows = PROJECTS.map((p, i) => [
      p.name,
      p.location,
      p.technology,
      `${p.capacity} ${p.unit}`,
      badge(p.status),
      `<button class="btn secondary small" data-project="${i}">Details</button>`,
    ]);
    return `<div class="filter-toolbar"><input id="dash-project-search" class="search" placeholder="Find a project or location…" aria-label="Search dashboard projects"><span class="small" id="dash-project-count">${rows.length} illustrative concepts</span></div><div id="dash-project-table">${table(["Project", "Location", "Technology", "Capacity", "Status", "Action"], rows, "Project portfolio")}</div><div class="notice" style="margin-top:24px">These project concepts are separate from the illustrative portfolio totals shown in Overview. They demonstrate different project types.</div>`;
  }
  function energyUsage() {
    return (
      kpis([
        ["Total consumption", "15,680 kWh", "Month to date"],
        ["Solar self-consumption", "14,300 kWh", "91.2% of consumption"],
        ["Grid imports", "1,380 kWh", "8.8% of consumption"],
        ["Peak demand", "168 kW", "Illustrative 13:00 peak"],
      ]) +
      `<div class="dash-grid">${chart("usage", "Energy use through the day", "Hourly consumption · kWh")}${chart("usageMix", "Where energy is used", "Share of monthly consumption")}</div>${table(
        ["Operating period", "Average load", "Opportunity"],
        [
          ["06:00–09:00", "52 kW", "Review start-up sequencing"],
          ["09:00–15:00", "146 kW", "Align flexible loads with solar"],
          ["15:00–20:00", "84 kW", "Review transition to evening supply"],
          ["20:00–06:00", "18 kW", "Investigate avoidable baseload"],
        ],
        "Load profile opportunities",
      )}`
    );
  }
  function generation() {
    return (
      kpis([
        ["Month-to-date solar", "18,420 kWh", "Local renewable generation"],
        ["Current output", "142 kW", "From 200 kW rated solar"],
        ["Availability", "99.1%", "Illustrative monthly availability"],
        ["Grid export", "4,120 kWh", "Surplus sent to the grid"],
      ]) +
      `<div class="dash-grid">${chart("genMonth", "Monthly generation", "Six-month solar generation · kWh")}${chart("genDaily", "Daily production profile", "Hourly solar generation · kWh")}</div><section class="chart-card"><h3>Generation, explained</h3><p class="small">Solar output changes with sunlight and operating conditions. Compare generation with available resource and expected seasonal performance before identifying equipment problems.</p><div class="list-row"><span>Self-consumed solar</span><strong>14,300 kWh</strong></div><div class="list-row"><span>Exported solar</span><strong>4,120 kWh</strong></div><div class="list-row"><span>Total solar generation</span><strong>18,420 kWh</strong></div></section>`
    );
  }
  function carbon() {
    return (
      kpis([
        ["Illustrative avoided emissions", "13.08 tCO₂e", "18.42 MWh × 0.71"],
        [
          "Generation used in estimate",
          "18.42 MWh",
          "Monthly demonstration value",
        ],
        [
          "Emissions factor",
          "0.71 t/MWh",
          "Illustrative, not an official current factor",
        ],
        [
          "Reporting boundary",
          "Electricity",
          "Not a full organization inventory",
        ],
      ]) +
      chart(
        "carbon",
        "Monthly avoided emissions",
        "Illustrative tCO₂e; constant sample factor",
      ) +
      '<div class="notice" style="margin-top:24px"><strong>Methodology matters.</strong> This estimate applies one illustrative factor to generation. Real accounting needs eligible displaced electricity, the correct boundary, factor year and ownership of environmental attributes. It is not an audited emissions result.</div>'
    );
  }
  function analytics() {
    return `${periodControl()}<div class="grid two" style="margin-top:24px">${admin ? [chart("aGen", "Energy generation", "Monthly MWh"), chart("aGrowth", "Project growth", "Illustrative project counts"), chart("aMix", "Solar vs wind generation", "Share of renewable output"), chart("aRevenue", "Energy service revenue", "Illustrative ₹ lakh / month"), chart("aPerformance", "System performance", "Monthly availability %"), chart("aDemand", "Energy demand", "Illustrative monthly MWh")].join("") : [chart("aDaily", "Daily generation", "Hourly kWh"), chart("aMonth", "Monthly generation", "Monthly kWh"), chart("aSource", "Energy source mix", "Share of consumption"), chart("aConsumption", "Monthly consumption", "Monthly kWh"), chart("aCarbon", "Carbon savings", "Illustrative tCO₂e"), chart("aSavings", "Electricity value", "Illustrative ₹ / month")].join("")}</div>`;
  }
  function reports() {
    return (
      '<div class="notice">Download CSV reports from the displayed demonstration dataset. No report contains live meter readings or confidential client information.</div>' +
      table(
        ["Report", "Period", "Contents", "Download"],
        [
          [
            "Energy summary",
            "September 2026",
            "Generation, consumption and export",
            '<button class="btn secondary small" data-report="energy">Download CSV ↓</button>',
          ],
          [
            "Carbon estimate",
            "September 2026",
            "Generation, factor and calculated avoided emissions",
            '<button class="btn secondary small" data-report="carbon">Download CSV ↓</button>',
          ],
          [
            "Project portfolio",
            "September 2026",
            "Technology, capacity, location and status",
            '<button class="btn secondary small" data-report="projects">Download CSV ↓</button>',
          ],
        ],
        "Available reports",
      ) +
      '<div id="report-status" class="form-status" role="status"></div>'
    );
  }
  function support() {
    return `<div class="grid two"><form id="support-form" class="form-panel"><h3>Open a demo support ticket</h3><label for="ticket-subject">Subject</label><input id="ticket-subject" required minlength="5" maxlength="100" placeholder="Monthly generation report"><label for="ticket-category" style="margin-top:18px">Category</label><select id="ticket-category"><option>Energy reporting</option><option>System performance</option><option>Maintenance question</option><option>General support</option></select><label for="ticket-message" style="margin-top:18px">Details</label><textarea id="ticket-message" required minlength="10" placeholder="Share what you need help with, including the site, date, and expected outcome."></textarea><button class="btn" type="submit">Create demo ticket</button><p class="form-note">Tickets remain in this page session only and are not sent.</p><div class="form-status" role="status"></div></form><section class="chart-card"><h3>Your support tickets</h3><div id="ticket-list">${ticketList()}</div></section></div>`;
  }
  function ticketList() {
    return tickets
      .map(
        (t) =>
          `<div class="list-row"><div><strong>${safe(t.subject)}</strong><p>${t.id} · ${t.date}</p></div>${badge(t.status)}</div>`,
      )
      .join("");
  }
  function clients() {
    return '<div class="filter-toolbar"><input class="search" id="client-search" placeholder="Search demo clients…" aria-label="Search clients"><span class="small">Illustrative organizations</span></div><div id="client-table"></div>';
  }
  const clientData = [
    ["Andhra Manufacturing", "Industrial", "Solar", "5 MW", "Operational"],
    ["Southern Wind Operations", "Utility", "Wind", "20 MW", "Operational"],
    [
      "Deccan Storage Campus",
      "Commercial",
      "Storage",
      "10 MWh",
      "Commissioning",
    ],
    [
      "Telangana Farm Collective",
      "Agriculture",
      "Solar",
      "0.5 MW",
      "Operational",
    ],
  ];
  function assets() {
    return (
      kpis([
        ["Illustrative assets", "180", "112 solar · 48 wind · 20 storage"],
        ["Portfolio availability", "98.5%", "Monthly sample"],
        ["Scheduled inspections", "3", "Open maintenance tasks"],
        [
          "Storage energy capacity",
          "96 MWh",
          "Separate from generation capacity",
        ],
      ]) +
      table(
        ["Asset", "Technology", "Location", "State", "Action"],
        [
          [
            "AP Solar / INV-02",
            "Inverter",
            "Andhra Pradesh",
            badge("Monitoring"),
            '<button class="btn secondary small" data-view="Maintenance">Maintenance</button>',
          ],
          [
            "TN Wind / WT-04",
            "Wind turbine",
            "Tamil Nadu",
            badge("Inspection due"),
            '<button class="btn secondary small" data-view="Maintenance">Maintenance</button>',
          ],
          [
            "KA Storage / BESS-03",
            "Battery rack",
            "Karnataka",
            badge("Commissioning"),
            '<button class="btn secondary small" data-project="2">Project details</button>',
          ],
        ],
        "Energy asset status",
      )
    );
  }
  function performance() {
    return (
      kpis([
        ["System availability", "98.5%", "Portfolio monthly sample"],
        [
          "Solar performance ratio",
          "81.2%",
          "Illustrative resource-adjusted ratio",
        ],
        ["Wind availability", "97.8%", "Illustrative monthly measure"],
        ["Open priority issues", "1", "Review maintenance queue"],
      ]) +
      `<div class="grid two">${chart("availability", "Availability trend", "Monthly percentage")}${chart("losses", "Identified energy losses", "Illustrative MWh by cause")}</div><div class="notice" style="margin-top:24px">Availability, conversion efficiency and performance ratio are different measures. Compare each against its own definition and baseline.</div>`
    );
  }
  function sustainability() {
    return (
      kpis([
        ["Avoided emissions", "30,388 tCO₂e", "42,800 MWh × 0.71 t/MWh"],
        ["Clean electricity", "42,800 MWh", "Illustrative monthly output"],
        ["Roadmap completion", "72%", "Demonstration action plan"],
        ["Reporting status", "Draft", "Not an audited ESG inventory"],
      ]) +
      `<div class="grid two">${chart("sCarbon", "Carbon reduction estimate", "Monthly tCO₂e")}${chart("sShare", "Technology contribution", "Share of renewable generation")}</div>`
    );
  }
  function maintenanceView() {
    return (
      '<div class="notice">Marking a task complete updates this demonstration session only. No work order is sent to a field team.</div><div id="maintenance-table">' +
      maintenanceTable() +
      "</div>"
    );
  }
  function maintenanceTable() {
    return table(
      ["Task", "Asset", "Priority", "Due", "State", "Action"],
      maintenance.map((m) => [
        m.task,
        m.asset,
        badge(m.priority),
        m.date,
        m.done ? "Complete" : "Open",
        `<button class="btn secondary small" data-task="${m.id}">${m.done ? "Reopen" : "Mark complete"}</button>`,
      ]),
      "Maintenance queue",
    );
  }
  function messagesView() {
    return (
      '<div class="notice">Illustrative incoming messages. Opening a message marks it read in this page session.</div><div class="chart-card" id="message-list">' +
      messageList() +
      "</div>"
    );
  }
  function messageList() {
    return messages
      .map(
        (m) =>
          `<div class="list-row"><div><strong>${m.subject}</strong><p>${m.name} · ${m.read ? "Read" : "Unread"}</p></div><button class="btn secondary small" data-message="${m.id}">Open message</button></div>`,
      )
      .join("");
  }
  const descriptions = {
    Overview: admin
      ? `${welcomeText()}. A clear view of your renewable energy operations.`
      : `${welcomeText()}. Here’s your energy at a glance.`,
    "Energy Usage": "Understand when and where your site uses electricity.",
    Generation: "Follow solar output, availability and export.",
    Projects:
      "Explore the systems and projects in your demonstration workspace.",
    "Carbon Savings":
      "A transparent view of an illustrative carbon calculation.",
    Analytics:
      "Compare generation, demand and performance across reporting periods.",
    Reports: "Take your demonstration data with you.",
    Support: "Explore a simple client support workflow.",
    Clients: "Review illustrative client organizations and energy projects.",
    "Energy Assets": "Understand equipment state and maintenance needs.",
    Performance: "Look beyond total generation to useful operational measures.",
    Sustainability:
      "Connect renewable output with transparent environmental reporting.",
    Maintenance: "Review upcoming work and manage demonstration task states.",
    Messages: "Keep project communication in context.",
  };
  const views = {
    Overview: () => (admin ? overviewAdmin() : overviewClient()),
    "Energy Usage": energyUsage,
    Generation: generation,
    Projects: projectView,
    "Carbon Savings": carbon,
    Analytics: analytics,
    Reports: reports,
    Support: support,
    Clients: clients,
    "Energy Assets": assets,
    Performance: performance,
    Sustainability: sustainability,
    Maintenance: maintenanceView,
    Messages: messagesView,
  };
  const nav = document.querySelector("#side-nav");
  const sidebar = document.querySelector(".sidebar");
  const dashMenu = document.querySelector(".dashboard-menu-toggle");
  const isDashboardMobile = () => window.matchMedia("(max-width: 850px)").matches;
  function closeDashboardMenu() {
    sidebar?.classList.remove("dashboard-menu-open");
    dashMenu?.setAttribute("aria-expanded", "false");
    dashMenu?.setAttribute("aria-label", "Open dashboard navigation");
  }
  dashMenu?.addEventListener("click", () => {
    if (!isDashboardMobile()) {
      closeDashboardMenu();
      return;
    }
    const open = sidebar.classList.toggle("dashboard-menu-open");
    dashMenu.setAttribute("aria-expanded", String(open));
    dashMenu.setAttribute(
      "aria-label",
      open ? "Close dashboard navigation" : "Open dashboard navigation",
    );
  });
  nav.innerHTML = items
    .map(
      (name, i) =>
        `<button data-view="${name}" class="${i === 0 ? "active" : ""}" aria-current="${i === 0 ? "page" : "false"}"><span class="side-symbol" aria-hidden="true">${symbols[i]}</span>${name}</button>`,
    )
    .join("");
  closeDashboardMenu();
  function render(name) {
    if (!views[name] || !items.includes(name)) name = "Overview";
    active = name;
    charts.forEach((c) => c.destroy());
    charts = [];
    content.innerHTML =
      heading(
        name,
        descriptions[name],
        name === "Overview"
          ? '<button class="btn secondary small" data-view="Reports">Export report ↓</button>'
          : "",
      ) + views[name]();
    if (name === "Overview" && settings.digest)
      content.insertAdjacentHTML(
        "afterbegin",
        `<div class="notice small">Monthly summary · September 2026 · ${admin ? "42,800 MWh generated across the demo portfolio." : `${settings.unit === "MWh" ? "18.42 MWh" : "18,420 kWh"} generated; 77.6% used on site.`}</div>`,
      );
    [...nav.querySelectorAll("button")].forEach((b) => {
      b.classList.toggle("active", b.dataset.view === name);
      b.setAttribute(
        "aria-current",
        b.dataset.view === name ? "page" : "false",
      );
    });
    location.hash = name.toLowerCase().replaceAll(" ", "-");
    wire();
    drawAll();
  }
  function draw(id, type, labels, series, unit = "", extra = {}) {
    const canvas = document.getElementById(id);
    if (!canvas) return;
    const colors = ["#2E8B57", "#F4B942", "#12372A", "#94bca2", "#4A5750"];
    const datasets = series.map((s, i) => ({
      label: s.name,
      data: s.values,
      borderColor: colors[i],
      backgroundColor:
        type === "doughnut"
          ? colors
          : type === "line"
            ? colors[i] + "18"
            : colors[i],
      borderWidth: type === "doughnut" ? 0 : 2,
      fill: type === "line",
      tension: 0.35,
      pointRadius: type === "line" ? 2 : 0,
      borderRadius: 5,
      ...extra,
    }));
    const summary = document.getElementById("summary-" + id);
    summary.textContent = series
      .map(
        (s) =>
          s.name +
          ": " +
          s.values
            .map(
              (v, i) =>
                labels[i] +
                " " +
                v.toLocaleString("en-IN") +
                (unit ? " " + unit : ""),
            )
            .join(" · "),
      )
      .join(" | ");
    if (window.Chart) {
      charts.push(
        new Chart(canvas, {
          type,
          data: { labels, datasets },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? false
              : { duration: 600 },
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  boxWidth: 10,
                  boxHeight: 10,
                  font: { size: 11 },
                  color: "#4A5750",
                },
              },
              tooltip: {
                callbacks: {
                  label: (c) =>
                    `${c.dataset.label}: ${c.raw.toLocaleString("en-IN")} ${unit}`,
                },
              },
            },
            scales:
              type === "doughnut"
                ? {}
                : {
                    x: {
                      grid: { display: false },
                      ticks: { color: "#4A5750", font: { size: 10 } },
                    },
                    y: {
                      beginAtZero: true,
                      grid: { color: "#e3f2e7" },
                      ticks: { color: "#4A5750", font: { size: 10 } },
                    },
                  },
            cutout: "72%",
          },
        }),
      );
    } else {
      const values = series[0].values,
        max = Math.max(...values);
      canvas.parentNode.innerHTML =
        '<div class="fallback-chart" aria-label="' +
        safe(series[0].name) +
        '">' +
        values
          .map(
            (v, i) =>
              `<div class="bar" style="height:${Math.max(3, (v / max) * 100)}%" title="${labels[i]}: ${v} ${unit}"><span>${labels[i]}</span></div>`,
          )
          .join("") +
        "</div>";
    }
  }
  function drawAll() {
    const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      hours = ["06", "08", "10", "12", "14", "16", "18"];
    const generation = [9800, 12100, 15100, 15900, 17020, 18420],
      portfolio = [29000, 31600, 35400, 38100, 40600, 42800];
    const factor =
      period === "August 2026" ? 0.92 : period === "July 2026" ? 0.85 : 1;
    const scaled = (a) => a.map((v) => Math.round(v * factor));
    const s = (name, values) => [{ name, values: scaled(values) }];
    draw(
      "daily",
      "line",
      hours,
      s("Solar generation", [0, 35, 104, 151, 132, 67, 8]),
      "kWh",
    );
    draw("mix", "doughnut", ["Solar"], s("Local generation", [100]), "%");
    draw(
      "portfolio",
      "bar",
      months,
      [
        { name: "Solar", values: [18000, 19600, 22400, 23900, 25800, 27600] },
        { name: "Wind", values: [11000, 12000, 13000, 14200, 14800, 15200] },
      ],
      "MWh",
    );
    draw(
      "regional",
      "doughnut",
      ["AP", "TN", "KA", "Other"],
      s("Capacity", [85, 75, 40, 50]),
      "MW",
    );
    draw(
      "usage",
      "line",
      hours,
      s("Consumption", [22, 76, 136, 165, 143, 98, 48]),
      "kWh",
    );
    draw(
      "usageMix",
      "doughnut",
      ["Production", "Cooling", "Lighting", "Other"],
      s("Consumption share", [55, 25, 12, 8]),
      "%",
    );
    draw("genMonth", "bar", months, s("Solar generation", generation), "kWh");
    draw(
      "genDaily",
      "line",
      hours,
      s("Solar generation", [0, 35, 104, 151, 132, 67, 8]),
      "kWh",
    );
    draw(
      "carbon",
      "bar",
      months,
      [
        {
          name: "Avoided emissions",
          values: generation.map((v) => +(v * 0.00071).toFixed(2)),
        },
      ],
      "tCO₂e",
    );
    draw("aGen", "bar", months, s("Generation", portfolio), "MWh");
    draw(
      "aGrowth",
      "line",
      months,
      s("Active projects", [150, 155, 161, 166, 174, 180]),
      "projects",
    );
    draw(
      "aMix",
      "doughnut",
      ["Solar", "Wind"],
      s("Generation share", [64.5, 35.5]),
      "%",
    );
    draw(
      "aRevenue",
      "bar",
      months,
      s("Service revenue", [32, 34, 38, 41, 44, 47]),
      "₹ lakh",
    );
    draw(
      "aPerformance",
      "line",
      months,
      [{ name: "Availability", values: [97.9, 98.1, 98.4, 98.2, 98.7, 98.5] }],
      "%",
    );
    draw(
      "aDemand",
      "bar",
      months,
      s("Demand", [31500, 34000, 37000, 39000, 41700, 44600]),
      "MWh",
    );
    draw(
      "aDaily",
      "line",
      hours,
      s("Generation", [0, 35, 104, 151, 132, 67, 8]),
      "kWh",
    );
    draw("aMonth", "bar", months, s("Generation", generation), "kWh");
    draw(
      "aSource",
      "doughnut",
      ["Self-consumed solar", "Grid import"],
      [{ name: "Consumption share", values: [91.2, 8.8] }],
      "%",
    );
    draw(
      "aConsumption",
      "line",
      months,
      s("Consumption", [14200, 14900, 15500, 16300, 16180, 15680]),
      "kWh",
    );
    draw(
      "aCarbon",
      "bar",
      months,
      [
        {
          name: "Avoided emissions",
          values: scaled(generation).map((v) => +(v * 0.00071).toFixed(2)),
        },
      ],
      "tCO₂e",
    );
    draw(
      "aSavings",
      "line",
      months,
      s(
        "Self-consumption value",
        [68800, 79200, 94800, 101200, 108000, 114400],
      ),
      "₹",
    );
    draw(
      "availability",
      "line",
      months,
      [{ name: "Availability", values: [97.9, 98.1, 98.4, 98.2, 98.7, 98.5] }],
      "%",
    );
    draw(
      "losses",
      "bar",
      ["Soiling", "Curtailment", "Downtime", "Other"],
      s("Losses", [240, 180, 120, 60]),
      "MWh",
    );
    draw(
      "sCarbon",
      "bar",
      months,
      [
        {
          name: "Avoided emissions",
          values: portfolio.map((v) => Math.round(v * 0.71)),
        },
      ],
      "tCO₂e",
    );
    draw(
      "sShare",
      "doughnut",
      ["Solar", "Wind"],
      [{ name: "Generation share", values: [64.5, 35.5] }],
      "%",
    );
  }
  function wire() {
    q("#period")?.addEventListener("change", (e) => {
      period = e.target.value;
      charts.forEach((c) => c.destroy());
      charts = [];
      drawAll();
    });
    if (q("#period")) q("#period").value = period;
    q("#dash-project-search")?.addEventListener("input", (e) => {
      const text = e.target.value.toLowerCase();
      const list = PROJECTS.map((p, i) => ({ ...p, i })).filter((p) =>
        `${p.name} ${p.location} ${p.technology}`.toLowerCase().includes(text),
      );
      q("#dash-project-count").textContent =
        list.length + " illustrative concepts";
      q("#dash-project-table").innerHTML = list.length
        ? table(
            [
              "Project",
              "Location",
              "Technology",
              "Capacity",
              "Status",
              "Action",
            ],
            list.map((p) => [
              p.name,
              p.location,
              p.technology,
              `${p.capacity} ${p.unit}`,
              badge(p.status),
              `<button class="btn secondary small" data-project="${p.i}">Details</button>`,
            ]),
          )
        : '<div class="empty">No matching projects. Try another search.</div>';
    });
    function showClients(query = "") {
      const list = clientData.filter((r) =>
        r.join(" ").toLowerCase().includes(query.toLowerCase()),
      );
      q("#client-table").innerHTML = list.length
        ? table(
            ["Client", "Industry", "Technology", "Capacity", "Status"],
            list.map((r) => [...r.slice(0, 4), badge(r[4])]),
            "Client organizations",
          )
        : '<div class="empty">No matching clients.</div>';
    }
    if (q("#client-table")) {
      showClients();
      q("#client-search").addEventListener("input", (e) =>
        showClients(e.target.value),
      );
    }
    q("#support-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      if (!f.reportValidity()) return;
      const subject = q("#ticket-subject").value.trim();
      if (subject.length < 5) {
        q("#ticket-subject").setCustomValidity(
          "Enter at least five non-space characters.",
        );
        q("#ticket-subject").reportValidity();
        return;
      }
      location.href = "404.html";
    });
    q("#ticket-subject")?.addEventListener("input", (e) =>
      e.target.setCustomValidity(""),
    );
  }
  function download(kind) {
    let rows;
    if (kind === "projects")
      rows = [
        [
          "Project",
          "Location",
          "Technology",
          "Capacity",
          "Unit",
          "Annual generation",
          "Carbon estimate",
          "Status",
        ],
        ...PROJECTS.map((p) => [
          p.name,
          p.location,
          p.technology,
          p.capacity,
          p.unit,
          p.generation,
          p.carbon,
          p.status,
        ]),
      ];
    else if (kind === "carbon")
      rows = [
        ["Metric", "Value", "Unit", "Note"],
        [
          "Renewable generation",
          admin ? 42800 : 18.42,
          "MWh",
          "Illustrative September 2026",
        ],
        [
          "Emissions factor",
          0.71,
          "tCO2e/MWh",
          "Illustrative factor, not current official data",
        ],
        ["Avoided emissions", admin ? 30388 : 13.0782, "tCO2e", "Not audited"],
      ];
    else
      rows = [
        ["Metric", "Value", "Unit", "Period"],
        ["Generation", admin ? 42800000 : 18420, "kWh", "September 2026"],
        ["Consumption", admin ? 44600000 : 15680, "kWh", "September 2026"],
        ["Grid export", admin ? "Not defined" : 4120, "kWh", "September 2026"],
        ["Data status", "Demonstration only", "", ""],
      ];
    const csv = rows
      .map((row) =>
        row.map((c) => '"' + String(c).replaceAll('"', '""') + '"').join(","),
      )
      .join("\r\n");
    const url = URL.createObjectURL(
        new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" }),
      ),
      a = document.createElement("a");
    a.href = url;
    a.download = "STACKLY-" + kind + "-demo.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    q("#report-status").textContent =
      "The " + kind + " demonstration report is ready to download.";
  }
  document.addEventListener("click", (e) => {
    const v = e.target.closest("[data-view]");
    if (v) {
      if (v.closest("#dashboard-content")) {
        location.href = "404.html";
        return;
      }
      render(v.dataset.view);
      closeDashboardMenu();
      content.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    const p = e.target.closest("[data-project]");
    if (p) {
      location.href = "404.html";
      return;
    }
    const t = e.target.closest("[data-task]");
    if (t) {
      location.href = "404.html";
      return;
    }
    const m = e.target.closest("[data-message]");
    if (m) {
      location.href = "404.html";
      return;
    }
    const r = e.target.closest("[data-report]");
    if (r) {
      location.href = "404.html";
      return;
    }
  });
  document.querySelector(".sign-out").addEventListener("click", () => {
    try {
      sessionStorage.removeItem("stackly-demo-role");
      sessionStorage.removeItem("stackly-demo-email");
    } catch {}
    location.href = "signin.html";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDashboardMenu();
  });
  window.addEventListener("resize", () => {
    if (!isDashboardMobile()) closeDashboardMenu();
  });
  const initial = items.find(
    (i) => i.toLowerCase().replaceAll(" ", "-") === location.hash.slice(1),
  );
  render(initial || "Overview");
  window.addEventListener("hashchange", () => {
    const name = items.find(
      (i) => i.toLowerCase().replaceAll(" ", "-") === location.hash.slice(1),
    );
    if (name && name !== active) render(name);
  });
})();
