"use strict";
const $ = (s, r = document) => r.querySelector(s),
  $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const menu = $(".menu-toggle"),
  nav = $("#nav-links");
function closeMenu() {
  nav?.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("aria-label", "Open navigation");
}
const socialLinks = [
  {
    label: "Instagram",
    path: '<rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1.3"></circle>',
  },
  {
    label: "Facebook",
    path: '<path d="M14 8.2h2V5.1c-.4-.1-1.7-.2-3.1-.2-3.1 0-5.1 1.9-5.1 5.3v3H4.5v3.5h3.3V24h3.9v-7.3h3.2l.5-3.5h-3.7v-2.6c0-1 .3-2.4 2.3-2.4Z"></path>',
  },
  {
    label: "YouTube",
    path: '<path d="M23 7.4a3 3 0 0 0-2.1-2.1C19 4.8 12 4.8 12 4.8s-7 0-8.9.5A3 3 0 0 0 1 7.4 31.8 31.8 0 0 0 .5 12 31.8 31.8 0 0 0 1 16.6a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31.8 31.8 0 0 0 .5-4.6 31.8 31.8 0 0 0-.5-4.6ZM9.8 15.2V8.8l5.8 3.2-5.8 3.2Z"></path>',
  },
  {
    label: "X",
    path: '<path d="M18.7 2h3.5l-7.7 8.8L23.6 22h-7.1l-5.6-6.9L4.6 22H1.1l8.2-9.4L.6 2h7.3l5 6.2L18.7 2Zm-1.2 18h1.9L6.9 3.9H4.8L17.5 20Z"></path>',
  },
];
const socialMarkup = `<nav class="social-links" aria-label="Social links">${socialLinks
  .map(
    ({ label, path }) =>
      `<a class="social-link" href="404.html" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg></a>`,
  )
  .join("")}</nav>`;
$$(".footer-grid > div:first-child p").forEach((paragraph) => {
  paragraph.insertAdjacentHTML("afterend", socialMarkup);
});
menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
nav?.addEventListener("click", (e) => {
  if (e.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nav?.classList.contains("open")) {
    closeMenu();
    menu.focus();
  }
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar")) closeMenu();
});
window.addEventListener("resize", () => {
  if (innerWidth > 850) closeMenu();
});
window.addEventListener(
  "scroll",
  () => {
    $(".navbar")?.classList.toggle("scrolled", scrollY > 15);
    $(".to-top")?.classList.toggle("visible", scrollY > 650);
  },
  { passive: true },
);
$(".to-top")?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
});
$$(".pause").forEach((b) =>
  b.addEventListener("click", () => {
    const paused = b
      .closest(".diagram-shell")
      .classList.toggle("motion-paused");
    b.setAttribute("aria-pressed", String(paused));
    b.textContent = paused ? "▶ Resume motion" : "Ⅱ Pause motion";
  }),
);
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("seen");
          obs.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  $$(".reveal").forEach((el) => obs.observe(el));
  const motion = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      e.target
        .querySelectorAll(".connector")
        .forEach(
          (c) =>
            (c.style.animationPlayState = e.isIntersecting
              ? "running"
              : "paused"),
        );
      e.target.classList.toggle("out-of-view", !e.isIntersecting);
    }),
  );
  $$(".diagram-shell").forEach((el) => motion.observe(el));
}
if (!reduced && "IntersectionObserver" in window) {
  const counters = new IntersectionObserver((entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      counters.unobserve(e.target);
      const final = Number(e.target.dataset.count),
        decimal = String(final).includes(".") ? 1 : 0,
        start = performance.now();
      function tick(now) {
        const t = Math.min(1, (now - start) / 1100);
        e.target.textContent = (final * (1 - Math.pow(1 - t, 3))).toFixed(
          decimal,
        );
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }),
  );
  $$("[data-count]").forEach((el) => counters.observe(el));
}
const dialog = $("#detail-dialog");
window.openDetail = (title, html) => {
  $("#dialog-content").innerHTML =
    `<h2 id="dialog-title">${esc(title)}</h2>${html}`;
  dialog.showModal();
};
$(".close-dialog")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
document.addEventListener("click", (e) => {
  const p = e.target.closest("[data-project]"),
    a = e.target.closest("[data-article]"),
    policy = e.target.closest("[data-policy]");
  if (p) {
    location.href = "404.html";
    return;
    const d = PROJECTS[Number(p.dataset.project)];
    openDetail(
      d.name,
      `<p class="small">ILLUSTRATIVE PROJECT · ${esc(d.location)} · ${esc(d.technology)}</p><p>${esc(d.detail)}</p><div class="project-meta"><div><span>Capacity</span><strong>${d.capacity} ${d.unit}</strong></div><div><span>Status</span><strong>${d.status}</strong></div><div><span>Annual generation</span><strong>${d.generation}</strong></div><div><span>Indicative emissions avoided</span><strong>${d.carbon}</strong></div></div><h3>Planning considerations</h3><p>Site access, electrical protection, metering, maintenance responsibilities and local approvals require project-specific review. These figures demonstrate a project reporting format and are not verified operating results.</p><a class="btn" href="contact.html">Discuss a similar project ↗</a>`,
    );
  }
  if (a) {
    location.href = "404.html";
    return;
    const d = ARTICLES[Number(a.dataset.article)];
    openDetail(
      d[1],
      `<p class="small">${esc(d[0])} · 09 Sep 2026 · 2 min read · STACKLY Editorial</p><p><strong>${esc(d[2])}</strong></p>${d
        .slice(3)
        .map(
          (p, i) =>
            `<h3>${["The starting point", "What to consider", "A practical next step"][i]}</h3><p>${esc(p)}</p>`,
        )
        .join(
          "",
        )}<p class="small">General educational content. Site-specific technical and commercial conditions require separate assessment.</p>`,
    );
  }
  if (policy) {
    const privacy = policy.dataset.policy === "privacy";
    openDetail(
      privacy ? "Privacy in this demonstration" : "Demonstration terms",
      privacy
        ? "<p>This frontend demonstration does not submit form entries to a backend. Passwords and enquiry details are not stored. Demo role state may be held in session storage, and dashboard display preferences may be saved in this browser.</p><p>Do not enter confidential information. Sign out clears the demo role state. Charts load Chart.js from jsDelivr, which receives the normal network request needed to deliver the library.</p>"
        : "<p>This site presents illustrative renewable energy services, projects and performance data. It does not make verified business, engineering or financial claims, create service contracts, or accept real enquiries.</p><p>Calculations are simplified examples. The role selector is demo navigation and is not access control. Project figures, roadmap milestones and testimonials are not actual company results or endorsements.</p>",
    );
  }
});
function projectHTML(p, i) {
  return `<article class="card project-card"><span class="tag">${p.technology} · ${p.status}</span><div class="capacity">${p.capacity} <small>${p.unit}</small></div><h3>${p.name}</h3><p>${p.location} · ${p.sector}</p><div class="project-meta"><div><span>Annual generation</span><strong>${p.generation}</strong></div><div><span>Indicative avoided emissions</span><strong>${p.carbon}</strong></div></div><button class="text-link" style="border:0;background:none;padding:0;text-align:left" data-project="${i}">Explore project ↗</button></article>`;
}
let projectFilter = "All";
function filterProjects() {
  const q = $("#project-search")?.value.trim().toLowerCase() || "",
    sector = $("#project-sector")?.value || "All industries",
    status = $("#project-status")?.value || "All statuses";
  const selected = PROJECTS.map((p, i) => ({ ...p, i })).filter(
    (p) =>
      (projectFilter === "All" || p.technology === projectFilter) &&
      (sector === "All industries" || p.sector === sector) &&
      (status === "All statuses" || p.status === status) &&
      `${p.name} ${p.location} ${p.technology} ${p.sector}`
        .toLowerCase()
        .includes(q),
  );
  $("#project-grid").innerHTML = selected.length
    ? selected.map((p) => projectHTML(p, p.i)).join("")
    : '<div class="empty"><h3>No matching projects</h3><p>Try another technology, industry or location.</p><button class="btn secondary" id="reset-projects">Reset filters</button></div>';
  $("#project-count").textContent =
    `${selected.length} project concept${selected.length === 1 ? "" : "s"}`;
  $("#reset-projects")?.addEventListener("click", () => {
    projectFilter = "All";
    if ($("#project-search")) $("#project-search").value = "";
    if ($("#project-sector")) $("#project-sector").selectedIndex = 0;
    if ($("#project-status")) $("#project-status").selectedIndex = 0;
    $$("[data-project-filter]").forEach((b) => {
      b.classList.toggle("active", b.dataset.projectFilter === "All");
      b.setAttribute("aria-pressed", String(b.dataset.projectFilter === "All"));
    });
    filterProjects();
    $("#project-search")?.focus();
  });
}
$$("[data-project-filter]").forEach((b) =>
  b.addEventListener("click", () => {
    projectFilter = b.dataset.projectFilter;
    $$("[data-project-filter]").forEach((t) => {
      t.classList.toggle("active", t === b);
      t.setAttribute("aria-pressed", String(t === b));
    });
    filterProjects();
  }),
);
["project-search", "project-sector", "project-status"].forEach((id) =>
  $("#" + id)?.addEventListener(
    id === "project-search" ? "input" : "change",
    filterProjects,
  ),
);
let blogFilter = "All";
function filterArticles() {
  const q = $("#blog-search").value.trim().toLowerCase(),
    list = ARTICLES.map((a, i) => ({ a, i })).filter(
      ({ a }) =>
        (blogFilter === "All" || a[0] === blogFilter) &&
        a.slice(0, 3).join(" ").toLowerCase().includes(q),
    );
  $("#article-list").innerHTML = list.length
    ? list
        .map(
          ({ a, i }) =>
            `<article class="article-row"><span class="num">${String(i + 1).padStart(2, "0")}</span><div><span class="small">${a[0].toUpperCase()}</span><h3>${a[1]}</h3><p class="small" style="margin:0">${a[2]}</p></div><div class="article-meta small">09 Sep 2026<br>2 min read · STACKLY Editorial</div><button data-article="${i}" aria-label="Read ${a[1]}">↗</button></article>`,
        )
        .join("")
    : '<div class="empty"><h3>No matching insights</h3><p>Try a broader search or select All.</p></div>';
  $("#blog-count").textContent =
    `${list.length} article${list.length === 1 ? "" : "s"}`;
}
$$("[data-blog-filter]").forEach((b) =>
  b.addEventListener("click", () => {
    blogFilter = b.dataset.blogFilter;
    $$("[data-blog-filter]").forEach((t) => {
      t.classList.toggle("active", t === b);
      t.setAttribute("aria-pressed", String(t === b));
    });
    filterArticles();
  }),
);
$("#blog-search")?.addEventListener("input", filterArticles);
const solutionData = [
  [
    "Solar energy",
    "Turn unused rooftops and open land into productive energy assets.",
    "solar",
  ],
  [
    "Wind energy",
    "Capture stronger resources with site-led turbine and grid planning.",
    "wind",
  ],
  [
    "Energy storage",
    "Shift clean generation to the hours your business needs it most.",
    "storage",
  ],
  [
    "Hybrid systems",
    "Coordinate solar, wind and batteries as one intelligent system.",
    "hybrid",
  ],
  [
    "Smart energy management",
    "Make energy decisions with clear metering and actionable analytics.",
    "management",
  ],
  [
    "Energy consulting",
    "Build a practical roadmap from your first audit to implementation.",
    "consulting",
  ],
];
function activateTab(b) {
  $$("[data-solution]").forEach((t) => {
    t.setAttribute("aria-selected", String(t === b));
    t.tabIndex = t === b ? 0 : -1;
  });
  const d = solutionData[Number(b.dataset.solution)],
    panel = $("#solution-panel");
  panel.setAttribute("aria-labelledby", b.id);
  panel.innerHTML = `<h3>${d[0]}</h3><p>${d[1]}</p><a class="text-link" href="404.html">Explore technical options ↓</a>`;
}
$$("[data-solution]").forEach((b, i) => {
  b.tabIndex = i === 0 ? 0 : -1;
  b.addEventListener("click", () => activateTab(b));
  b.addEventListener("keydown", (e) => {
    const tabs = $$("[data-solution]");
    let n;
    if (e.key === "ArrowRight") n = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") n = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = tabs.length - 1;
    if (n !== undefined) {
      e.preventDefault();
      tabs[n].focus();
      activateTab(tabs[n]);
    }
  });
});
function calculate() {
  const inputs = ["capacity", "yield", "tariff"].map((x) => $("#calc-" + x));
  if (inputs.some((x) => !x.value || !x.checkValidity())) {
    $("#calc-result").textContent = "Check your inputs";
    $("#calc-energy").textContent =
      "Enter positive values within the specified ranges.";
    return;
  }
  const [c, y, t] = inputs.map((x) => Number(x.value)),
    energy = c * y * 30;
  $("#calc-result").textContent = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(energy * t);
  $("#calc-energy").textContent =
    `${energy.toLocaleString("en-IN", { maximumFractionDigits: 0 })} kWh estimated generation / 30 days`;
}
["capacity", "yield", "tariff"].forEach((x) =>
  $("#calc-" + x)?.addEventListener("input", calculate),
);
$$(".show-password").forEach((b) =>
  b.addEventListener("click", () => {
    const i = $("input", b.parentElement),
      show = i.type === "password";
    i.type = show ? "text" : "password";
    b.textContent = show ? "Hide" : "Show";
    b.setAttribute("aria-label", show ? "Hide password" : "Show password");
  }),
);
window.validateForm = (form) => {
  let first = null;
  $$("input[required],select[required],textarea[required]", form).forEach(
    (input) => {
      let msg = "";
      if (!input.value.trim()) msg = "Please complete this field.";
      else if (input.type === "email" && !input.validity.valid)
        msg = "Enter a valid email address.";
      else if (
        input.name === "phone" &&
        !/^[+()\d\s-]{7,20}$/.test(input.value.trim())
      )
        msg = "Enter a valid phone number.";
      else if (
        input.name === "confirm-password" &&
        input.value !== $('input[name="password"]', form)?.value
      )
        msg = "Passwords do not match.";
      else if (input.minLength > 0 && input.value.length < input.minLength)
        msg = `Use at least ${input.minLength} characters.`;
      else if (!input.validity.valid)
        msg = "Enter a value within the allowed range.";
      const err = $("#" + input.getAttribute("aria-describedby"), form);
      if (err) err.textContent = msg;
      input.classList.toggle("field-invalid", !!msg);
      input.setAttribute("aria-invalid", String(!!msg));
      if (msg && !first) first = input;
    },
  );
  if (first) first.focus();
  return !first;
};
$$(".validate-form").forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    const status = $(".form-status", form);
    if (form.id === "signin-form") {
      const data = new FormData(form);
      const role = data.get("role");
      const email = String(data.get("email") || "").trim();
      try {
        sessionStorage.setItem("stackly-demo-role", role);
        sessionStorage.setItem("stackly-demo-email", email);
      } catch {}
      form.reset();
      location.href =
        role === "admin" ? "admin-dashboard.html" : "customer-dashboard.html";
    } else if (form.id === "register-form") {
      form.reset();
      status.textContent =
        "Your account is successfully created. Moving to sign in...";
      setTimeout(() => {
        location.href = "signin.html";
      }, 1200);
    } else {
      form.reset();
      location.href = "404.html";
    }
  }),
);
const requestedType = new URLSearchParams(location.search).get("type");
if (
  requestedType &&
  $("#project-type") &&
  $$("#project-type option").some((o) => o.value === requestedType)
)
  $("#project-type").value = requestedType;
const projectTypeSelect = $("#project-type");
if (projectTypeSelect) {
  const projectTypeMobile = matchMedia("(max-width: 540px)");
  const closeProjectTypeSelect = () => {
    projectTypeSelect.removeAttribute("size");
  };
  const openProjectTypeSelect = () => {
    if (projectTypeMobile.matches)
      projectTypeSelect.size = projectTypeSelect.options.length;
  };
  const syncProjectTypeSelect = () => {
    if (!projectTypeMobile.matches) closeProjectTypeSelect();
  };
  projectTypeSelect.addEventListener("focus", openProjectTypeSelect);
  projectTypeSelect.addEventListener("click", openProjectTypeSelect);
  projectTypeSelect.addEventListener("change", () => {
    closeProjectTypeSelect();
    projectTypeSelect.blur();
  });
  projectTypeSelect.addEventListener("blur", closeProjectTypeSelect);
  addEventListener("resize", syncProjectTypeSelect);
}
$("#go-back")?.addEventListener("click", () => {
  if (history.length > 1) history.back();
  else location.href = "index.html";
});

// Empty configuration values intentionally keep image areas ready for later photos.
$$("[data-image-key]").forEach((slot) => {
  const path = window.STACKLY_IMAGES?.[slot.dataset.imageKey];
  if (typeof path !== "string" || !path.trim()) return;
  const img = $("img", slot),
    placeholder = $(".image-placeholder", slot);
  img.addEventListener(
    "load",
    () => {
      img.hidden = false;
      placeholder.hidden = true;
      slot.classList.add("has-image");
    },
    { once: true },
  );
  img.addEventListener(
    "error",
    () => {
      img.hidden = true;
      placeholder.hidden = false;
      slot.classList.remove("has-image");
    },
    { once: true },
  );
  img.src = path.trim();
});
