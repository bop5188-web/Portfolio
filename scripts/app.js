/* eslint-disable no-use-before-define */

const PROJECTS = [
  {
    id: "location-graph",
    rank: 1,
    name: "Location Graph Explorer",
    short:
      "Interactive graph algorithms (BFS/DFS/Dijkstra + cycle detection) built from scratch, visualized live.",
    tags: ["Graph Algorithms", "UX", "Prototyping"],
    page: "graph",
    embed: null
  },
  {
    id: "art-gallery-chatbot",
    rank: 2,
    name: "Art Gallery AI Chatbot",
    short:
      "Streamlit + LangChain app that answers questions about exhibitions, artists, and artworks with guided prompts.",
    tags: ["Python", "LangChain", "LLM UX"],
    page: "art-gallery",
    embed: {
      // Replace this once you deploy the Streamlit app.
      url: ""
    }
  },
  {
    id: "accessify-hcdd",
    rank: 3,
    name: "Accessify (HCDD Prototype)",
    short:
      "Accessibility-focused navigation concept with AI communication support, personalized profiles, and route mapping.",
    tags: ["Accessibility", "Figma", "Human-Centered Design"],
    page: "accessify",
    embed: {
      // You may need to switch to a Figma "embed" URL if the plain design URL blocks inside iframes.
      url: "https://www.figma.com/design/18CsUWEd8NesTK272KF3Er/High-Fidelity?node-id=0-1&t=NVWjUDXb1XBGBgJf-1"
    }
  },
  {
    id: "storefront-sql",
    rank: 4,
    name: "Bakery Storefront (SQL + Reasoning)",
    short:
      "MySQL schema + query work for customers, orders, products, ingredients, inventory, and invoices (with example questions).",
    tags: ["SQL", "MySQL", "Data Modeling"],
    page: "sql",
    embed: null
  }
];

function routeFromHash() {
  const h = (window.location.hash || "#/").replace(/^#/, "");
  // e.g. "", "/", "/about", "/projects/graph"
  const path = h.startsWith("/") ? h : `/${h}`;
  return path;
}

function setHash(path) {
  window.location.hash = path.startsWith("/") ? path : `/${path}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function createEl(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "className") el.className = v;
    else if (k === "textContent") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v);
  });
  for (const child of children) {
    if (child == null) continue;
    if (typeof child === "string") el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  }
  return el;
}

function layout({ title, subtitle, contentEl }) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const wrapper = createEl("section", { class: "card" }, []);
  wrapper.style.padding = "18px 16px";

  const sub = createEl("div", { class: "project-desc" }, []);
  sub.textContent = subtitle || "";

  if (title) {
    const head = createEl("div", { class: "section-title" }, []);
    head.textContent = title;
    wrapper.appendChild(head);
  }
  if (subtitle) wrapper.appendChild(sub);
  if (contentEl) wrapper.appendChild(contentEl);
  app.appendChild(wrapper);
}

function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const hero = createEl("section", { class: "hero" }, []);
  const heroMain = createEl("div", { class: "hero-card" }, []);

  heroMain.appendChild(createEl("div", { className: "kicker", textContent: "Human-Centered Design Major · Interactive Portfolio" }, []));
  const h1 = createEl("h1", {}, []);
  h1.textContent = "Design clarity that feels alive.";
  heroMain.appendChild(h1);

  const p = createEl(
    "p",
    {},
    []
  );
  p.textContent =
    "I build user-first experiences: accessibility-aware layouts, thoughtful systems, and demos you can actually interact with (not just screenshots).";
  heroMain.appendChild(p);

  const ctaRow = createEl("div", { class: "cta-row" }, []);

  const btnProjects = createEl("button", { className: "btn btn-primary" }, []);
  btnProjects.textContent = "Explore Projects";
  btnProjects.addEventListener("click", () => setHash("/projects"));
  ctaRow.appendChild(btnProjects);

  const btnAbout = createEl("button", { className: "btn btn-ghost" }, []);
  btnAbout.textContent = "About Me";
  btnAbout.addEventListener("click", () => setHash("/about"));
  ctaRow.appendChild(btnAbout);

  heroMain.appendChild(ctaRow);

  const side = createEl("div", { className: "side-stack" }, []);
  const mini1 = createEl("div", { className: "mini-card" }, []);
  mini1.appendChild(createEl("div", { className: "mini-title", textContent: "What you’ll find" }, []));
  mini1.appendChild(
    createEl("div", { className: "project-desc" }, [
      "Interactive algorithm demos, AI chatbot UX, and design prototypes grounded in accessibility."
    ])
  );

  const mini2 = createEl("div", { className: "mini-card" }, []);
  mini2.appendChild(createEl("div", { className: "mini-title", textContent: "How to use this site" }, []));
  const tagRow = createEl("div", { className: "chip-row" }, []);
  ["Click into demos", "Adjust inputs", "See results"].forEach((t) => {
    const chip = createEl("span", { className: "chip", textContent: t }, []);
    tagRow.appendChild(chip);
  });
  mini2.appendChild(tagRow);

  side.appendChild(mini1);
  side.appendChild(mini2);

  // Highlight top project
  const top = [...PROJECTS].sort((a, b) => a.rank - b.rank)[0];
  const highlight = createEl("div", { className: "mini-card" }, []);
  const title = createEl("div", { className: "mini-title", textContent: `Top pick: #${top.rank}` }, []);
  const name = createEl("div", { className: "project-name", textContent: top.name }, []);
  const desc = createEl("div", { className: "project-desc" }, [top.short]);
  const btn = createEl("button", { className: "btn btn-primary" }, []);
  btn.textContent = "Run the demo";
  btn.addEventListener("click", () => setHash(`/projects/${top.page}`));
  highlight.appendChild(title);
  highlight.appendChild(name);
  highlight.appendChild(desc);
  highlight.appendChild(btn);
  side.appendChild(highlight);

  hero.appendChild(heroMain);
  hero.appendChild(side);
  app.appendChild(hero);

  const sectionTitle = createEl("div", { className: "section-title", textContent: "Projects (most impressive to least)" }, []);
  app.appendChild(sectionTitle);

  const list = createEl("div", { className: "grid-2" }, []);
  for (const pr of [...PROJECTS].sort((a, b) => a.rank - b.rank)) {
    list.appendChild(projectCard(pr));
  }
  app.appendChild(list);
}

function projectCard(project) {
  const card = createEl("div", { className: "card project-card" }, []);
  const topRow = createEl("div", { className: "project-top" }, []);
  const name = createEl("div", { className: "project-name" }, []);
  name.textContent = project.name;
  const badge = createEl("div", { className: "rank-badge" }, []);
  badge.textContent = `Rank #${project.rank}`;
  topRow.appendChild(name);
  topRow.appendChild(badge);
  card.appendChild(topRow);

  card.appendChild(createEl("div", { className: "project-desc" }, [project.short]));

  const tags = createEl("div", { className: "tag-row" }, []);
  project.tags.forEach((t) => tags.appendChild(createEl("span", { className: "tag", textContent: t }, [])));
  card.appendChild(tags);

  const actions = createEl("div", { className: "project-actions" }, []);
  const btn = createEl("button", { className: "btn btn-primary" }, []);
  btn.textContent = "Open";
  btn.addEventListener("click", () => setHash(`/projects/${project.page}`));
  actions.appendChild(btn);

  const btn2 = createEl("button", { className: "btn btn-ghost" }, []);
  btn2.textContent = "Quick view";
  btn2.addEventListener("click", () => {
    showToast(`Preview: ${project.name}`);
  });
  actions.appendChild(btn2);

  card.appendChild(actions);
  return card;
}

let toastTimer = null;
function showToast(msg) {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();
  const el = createEl("div", { id: "toast", className: "notice" }, []);
  el.style.position = "fixed";
  el.style.right = "16px";
  el.style.bottom = "16px";
  el.style.zIndex = 9999;
  el.textContent = msg;
  document.body.appendChild(el);
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2200);
}

function renderProjectsList() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const title = createEl("div", { className: "section-title", textContent: "Projects" }, []);
  app.appendChild(title);
  const list = createEl("div", { className: "grid-2" }, []);
  [...PROJECTS].sort((a, b) => a.rank - b.rank).forEach((p) => list.appendChild(projectCard(p)));
  app.appendChild(list);

  const hint = createEl("div", { className: "notice" }, []);
  hint.textContent =
    "If a demo embed is blank, that usually means the live deployment URL needs to be added. The interactive graph demo works immediately in-browser.";
  hint.style.marginTop = "14px";
  app.appendChild(hint);
}

function renderAbout() {
  layout({
    title: "About",
    subtitle: "Human-centered design with real interaction and accessible UX.",
    contentEl: renderAboutContent()
  });
}

function renderAboutContent() {
  const wrap = createEl("div", { className: "split" }, []);

  const left = createEl("div", {}, []);
  const card = createEl("div", { className: "card" }, []);
  card.style.padding = "16px";

  const imgWrap = createEl("div", {}, []);
  imgWrap.style.display = "flex";
  imgWrap.style.alignItems = "center";
  imgWrap.style.gap = "14px";

  const img = createEl("img", { src: "./assets/portrait.jpg", alt: "Portrait of you" }, []);
  img.style.width = "92px";
  img.style.height = "92px";
  img.style.objectFit = "cover";
  img.style.borderRadius = "999px";
  img.style.border = "1px solid rgba(255,255,255,.14)";
  img.onerror = () => {
    img.style.display = "none";
    const ph = document.getElementById("portrait-placeholder");
    if (ph) ph.style.display = "inline-flex";
  };

  const placeholder = createEl(
    "div",
    {
      id: "portrait-placeholder",
      className: "rank-badge"
    },
    []
  );
  placeholder.style.display = "none";
  placeholder.style.background = "rgba(122,167,255,.12)";
  placeholder.style.borderColor = "rgba(122,167,255,.25)";
  placeholder.style.width = "92px";
  placeholder.style.height = "92px";
  placeholder.style.alignItems = "center";
  placeholder.style.justifyContent = "center";
  placeholder.textContent = "Add Photo";

  imgWrap.appendChild(img);
  imgWrap.appendChild(placeholder);
  card.appendChild(imgWrap);

  const details = createEl("div", { className: "project-desc" }, []);
  details.style.marginTop = "12px";
  details.innerHTML = `
    <div><strong>Name:</strong> Your Name Here</div>
    <div><strong>Major:</strong> Human-Centered Design</div>
    <div><strong>Focus:</strong> Accessibility-aware UX · prototyping · coding</div>
    <div><strong>Goal:</strong> Senior-year internships where I can build experiences end-to-end.</div>
  `;
  card.appendChild(details);

  left.appendChild(card);
  wrap.appendChild(left);

  const right = createEl("div", {}, []);
  const card2 = createEl("div", { className: "card" }, []);
  card2.style.padding = "16px";

  const h = createEl("div", { className: "mini-title", textContent: "What I bring" }, []);
  const desc = createEl(
    "div",
    { className: "project-desc" },
    [
      "I design for how people actually use systems: clear flows, inclusive choices, and feedback that explains what’s happening. Then I build the interface and the logic so the behavior matches the experience."
    ]
  );

  const bulletish = createEl("div", { className: "tag-row" }, []);
  ["Accessibility-first", "Interaction design", "Clear information architecture", "Functional demos"].forEach((t) => {
    bulletish.appendChild(createEl("span", { className: "tag", textContent: t }, []));
  });

  const note = createEl("div", { className: "notice" }, []);
  note.style.marginTop = "12px";
  note.textContent =
    "Replace the placeholders (name, photo) and set your live embed URLs in `scripts/app.js` for the Art Gallery demo.";

  card2.appendChild(h);
  card2.appendChild(desc);
  card2.appendChild(bulletish);
  card2.appendChild(note);

  right.appendChild(card2);
  wrap.appendChild(right);
  return wrap;
}

function renderProjectDetail(page) {
  const project = PROJECTS.find((p) => p.page === page);
  if (!project) {
    layout({
      title: "Page not found",
      subtitle: "",
      contentEl: createEl("div", { className: "notice" }, ["That route doesn't exist."])
    });
    return;
  }

  const content = createEl("div", { className: "split" }, []);

  const left = createEl("div", {}, []);
  const right = createEl("div", {}, []);

  // Left: description + story
  const story = createEl("div", { className: "card" }, []);
  story.style.padding = "16px";
  const title = createEl("div", { className: "section-title", textContent: project.name }, []);
  story.appendChild(title);
  story.appendChild(createEl("div", { className: "project-desc" }, [project.short]));

  const tagRow = createEl("div", { className: "tag-row" }, []);
  project.tags.forEach((t) => tagRow.appendChild(createEl("span", { className: "tag", textContent: t }, [])));
  story.appendChild(tagRow);

  const codeActions = createEl("div", { className: "project-actions" }, []);
  const codeHrefByPage = {
    graph: "./code/location-graph-java/LocationGraph.java",
    "art-gallery": "./code/art-gallery-ai/app.py",
    accessify: "./code/accessify-figma/README.md",
    sql: "./code/storefront-sql/queries.sql"
  };
  const codeHref = codeHrefByPage[project.page];
  if (codeHref) {
    const codeLink = createEl(
      "a",
      { class: "btn btn-ghost", href: codeHref, target: "_blank", rel: "noopener noreferrer" },
      ["View code"]
    );
    codeActions.appendChild(codeLink);
  }
  if (codeActions.childNodes.length) story.appendChild(codeActions);

  if (project.page === "graph") {
    story.appendChild(
      createEl(
        "div",
        { className: "output" },
        [
          "This demo is implemented fully in-browser to let recruiters test the algorithms directly: edit edges, run BFS/DFS, run Dijkstra for minimum path, and detect cycles."
        ]
      )
    );
  }

  if (project.page === "art-gallery") {
    story.appendChild(
      createEl(
        "div",
        { className: "output" },
        [
          "To keep API keys safe, the chatbot itself should be deployed as a separate Streamlit app. This page embeds it once you add your deployed URL."
        ]
      )
    );
  }

  if (project.page === "accessify") {
    story.appendChild(
      createEl(
        "div",
        { className: "output" },
        [
          "Prototype embed works best when Figma allows iframes. If it doesn’t load, recruiters can click through using the link in this page."
        ]
      )
    );
  }

  if (project.page === "sql") {
    story.appendChild(
      createEl(
        "div",
        { className: "output" },
        [
          "This section uses your provided screenshots + query text to demonstrate how you model relationships and write real SQL questions."
        ]
      )
    );
  }

  left.appendChild(story);

  // Right: interactive / embed
  const demoWrap = createEl("div", { className: "card" }, []);
  demoWrap.style.padding = "16px";

  if (project.page === "graph") {
    demoWrap.appendChild(renderGraphDemo());
  } else if (project.page === "art-gallery") {
    demoWrap.appendChild(renderArtGalleryEmbed(project));
  } else if (project.page === "accessify") {
    demoWrap.appendChild(renderAccessifyEmbed(project));
  } else if (project.page === "sql") {
    demoWrap.appendChild(renderSQLStory());
  }

  right.appendChild(demoWrap);
  content.appendChild(left);
  content.appendChild(right);

  layout({
    title: "",
    subtitle: "",
    contentEl: content
  });
}

function renderArtGalleryEmbed(project) {
  const wrap = createEl("div", {}, []);
  const url = project.embed?.url || "";

  const iframeHolder = createEl("div", { className: "embed" }, []);
  iframeHolder.style.height = "480px";

  if (!url) {
    const notice = createEl(
      "div",
      { className: "notice" },
      [
        "Art Gallery embed URL isn’t set yet. Deploy your Streamlit app and paste the public URL into `PROJECTS` in `scripts/app.js` (field: `embed.url`)."
      ]
    );
    notice.style.marginTop = "8px";
    wrap.appendChild(createEl("div", { className: "mini-title", textContent: "Demo (requires deployment)" }, []));
    wrap.appendChild(notice);
    return wrap;
  }

  const iframe = createEl("iframe", { src: url, title: "Art Gallery AI Chatbot", style: "width:100%;height:100%;border:0;" }, []);
  iframeHolder.appendChild(iframe);
  wrap.appendChild(createEl("div", { className: "mini-title", textContent: "Chatbot demo" }, []));
  wrap.appendChild(iframeHolder);

  const linkRow = createEl("div", { className: "project-actions" }, []);
  const linkBtn = createEl("button", { className: "btn btn-ghost" }, []);
  linkBtn.textContent = "Open chatbot in new tab";
  linkBtn.addEventListener("click", () => window.open(url, "_blank", "noopener,noreferrer"));
  linkRow.appendChild(linkBtn);
  wrap.appendChild(linkRow);
  return wrap;
}

function renderAccessifyEmbed(project) {
  const wrap = createEl("div", {}, []);
  const url = project.embed?.url || "";

  wrap.appendChild(createEl("div", { className: "mini-title", textContent: "Figma prototype (embed)" }, []));

  if (!url) {
    wrap.appendChild(
      createEl("div", { className: "notice" }, ["Add your Figma URL in `scripts/app.js` → embed.url for this project."])
    );
    return wrap;
  }

  const iframeHolder = createEl("div", { className: "embed" }, []);
  const iframe = createEl("iframe", { src: url, title: "Accessify prototype", style: "width:100%;height:100%;border:0;" }, []);
  iframeHolder.appendChild(iframe);
  wrap.appendChild(iframeHolder);

  const linkRow = createEl("div", { className: "project-actions" }, []);
  const linkBtn = createEl("button", { className: "btn btn-primary" }, []);
  linkBtn.textContent = "Open prototype link";
  linkBtn.addEventListener("click", () => window.open(url, "_blank", "noopener,noreferrer"));
  linkRow.appendChild(linkBtn);
  wrap.appendChild(linkRow);

  return wrap;
}

function renderSQLStory() {
  const wrap = createEl("div", {}, []);
  wrap.appendChild(createEl("div", { className: "mini-title", textContent: "SQL + Modeling (MySQL Workbench)" }, []));

  const p = createEl(
    "div",
    { className: "project-desc" },
    [
      "This project focused on designing a relational schema and writing SQL queries that answer real storefront-style questions. Below is an interactive viewer for your schema snapshot + example queries from the assignment screenshots."
    ]
  );
  wrap.appendChild(p);

  // These filenames match what’s currently in the repo assets folder when we copied them.
  const imgSchema = "./assets/Screenshot_2025-05-05_at_4.12.01_PM-5d677e48-31a6-49e8-952c-b2469d2cbdbb.png";
  const imgQ2 = "./assets/Screenshot_2025-05-05_at_3.30.15_PM__1_-fee8c6e2-6232-4911-9254-2731c8c2a2dc.png";
  const imgQ3 = "./assets/Screenshot_2025-05-05_at_3.32.54_PM__1_-d33fd91a-6521-4f67-b394-08d21150075e.png";
  const imgQ1 = "./assets/Screenshot_2025-05-05_at_3.06.01_PM__1_-6514cf15-fe87-4813-8bb6-aca6b21179de.png";

  const items = [
    {
      key: "schema",
      title: "Schema / ER Diagram",
      img: imgSchema,
      desc: "Entity relationships and join tables (modeled so orders, products, and ingredients connect cleanly)."
    },
    {
      key: "q1",
      title: "Employees: hire date + salary filter",
      img: imgQ1,
      desc: "Query with range filtering and ordering so business users get a sorted view of results.",
      query: `SELECT first_name, last_name, hire_date, salary
FROM employees
WHERE salary BETWEEN 3000 AND 5000
  AND hire_date < '1998-01-01'
ORDER BY salary;`
    },
    {
      key: "q2",
      title: "No dependents (subquery)",
      img: imgQ2,
      desc: "Uses a subquery to filter employees and then aggregates counts by department.",
      query: `SELECT d.department_name, COUNT(e.employee_id) AS employee_count
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id NOT IN (
  SELECT dep.employee_id
  FROM dependents dep
  WHERE dep.employee_id IS NOT NULL
)
GROUP BY d.department_name
ORDER BY d.department_name;`
    },
    {
      key: "q3",
      title: "Total employees per department",
      img: imgQ3,
      desc: "Simple modeling + aggregation query to produce a department summary.",
      query: `SELECT d.department_name, COUNT(e.employee_id) AS employee_count
FROM employees e
JOIN departments d ON e.department_id = d.department_id
GROUP BY d.department_name
ORDER BY d.department_name;`
    }
  ];

  const controls = createEl("div", { className: "card" }, []);
  controls.style.padding = "14px";
  controls.style.marginTop = "12px";

  const label = createEl("label", { textContent: "Select what to view" }, []);
  label.style.marginBottom = "8px";

  const select = createEl("select", { className: "input" }, []);
  select.style.minWidth = "220px";
  for (const it of items) {
    const opt = createEl("option", { value: it.key }, [it.title]);
    select.appendChild(opt);
  }

  const main = createEl("div", {}, []);
  main.style.marginTop = "12px";

  const imgEl = createEl("img", { alt: "SQL screenshot" }, []);
  imgEl.style.width = "100%";
  imgEl.style.borderRadius = "14px";
  imgEl.style.border = "1px solid rgba(255,255,255,.10)";
  imgEl.style.background = "rgba(0,0,0,.20)";

  const descEl = createEl("div", { className: "project-desc" }, []);
  descEl.style.marginTop = "10px";

  const codeBlock = createEl(
    "pre",
    {
      style:
        "white-space:pre-wrap; word-break:break-word; margin:10px 0 0; padding:12px 14px; border-radius:14px; border:1px dashed rgba(255,255,255,.18); background: rgba(0,0,0,.15); color: rgba(234,240,255,.78); font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace; font-size:12px; line-height:1.6;"
    },
    []
  );

  function renderItem(key) {
    const it = items.find((x) => x.key === key) || items[0];
    imgEl.src = it.img;
    descEl.textContent = it.desc;
    codeBlock.textContent = it.query ? it.query : "// Schema view (no SQL text)";
  }

  select.addEventListener("change", () => renderItem(select.value));

  controls.appendChild(label);
  controls.appendChild(select);
  main.appendChild(imgEl);
  main.appendChild(descEl);
  main.appendChild(codeBlock);
  controls.appendChild(main);
  wrap.appendChild(controls);

  const note = createEl(
    "div",
    { className: "notice" },
    [
      "If you want the portfolio to run the queries against a real MySQL database, paste your exported `.sql` schema + inserts into `code/storefront-sql/` and I can upgrade this into a true in-browser runner."
    ]
  );
  note.style.marginTop = "12px";
  wrap.appendChild(note);

  renderItem(select.value || "schema");
  return wrap;
}

function renderGraphDemo() {
  const container = createEl("div", {}, []);

  container.appendChild(createEl("div", { className: "mini-title", textContent: "Graph Explorer (interactive)" }, []));

  const controls = createEl("div", { className: "card" }, []);
  controls.style.padding = "14px";
  controls.style.marginTop = "10px";

  const formRow = createEl("div", { className: "field-row" }, []);
  const aWrap = createEl("div", {}, []);
  aWrap.appendChild(createEl("label", { textContent: "Location A" }, []));
  const aInput = createEl("input", { className: "input", type: "text", placeholder: "e.g., Library" }, []);
  aInput.id = "g-a";
  aWrap.appendChild(aInput);

  const bWrap = createEl("div", {}, []);
  bWrap.appendChild(createEl("label", { textContent: "Location B" }, []));
  const bInput = createEl("input", { className: "input", type: "text", placeholder: "e.g., Cafeteria" }, []);
  bInput.id = "g-b";
  bWrap.appendChild(bInput);

  const wWrap = createEl("div", {}, []);
  wWrap.appendChild(createEl("label", { textContent: "Distance / Weight" }, []));
  const wInput = createEl("input", { className: "input", type: "number", step: "0.5", placeholder: "e.g., 2" }, []);
  wInput.id = "g-w";
  wWrap.appendChild(wInput);

  formRow.appendChild(aWrap);
  formRow.appendChild(bWrap);
  formRow.appendChild(wWrap);
  controls.appendChild(formRow);

  const actionRow = createEl("div", { className: "project-actions" }, []);
  const btnAdd = createEl("button", { className: "btn btn-primary" }, []);
  btnAdd.textContent = "Add edge (A <-> B)";
  const btnSample = createEl("button", { className: "btn btn-ghost" }, []);
  btnSample.textContent = "Load sample graph";
  const btnReset = createEl("button", { className: "btn btn-ghost" }, []);
  btnReset.textContent = "Reset";
  actionRow.appendChild(btnAdd);
  actionRow.appendChild(btnSample);
  actionRow.appendChild(btnReset);
  controls.appendChild(actionRow);

  const status = createEl("div", { className: "output", style: "margin-top:12px;" }, []);
  status.textContent = "Ready.";
  controls.appendChild(status);

  container.appendChild(controls);

  // Algorithms UI
  const alg = createEl("div", { className: "card" }, []);
  alg.style.padding = "14px";
  alg.style.marginTop = "12px";

  const bfsRow = createAlgRow("BFS distance", "BFS start", "BFS end", (start, end) => graph.findDistanceBreadthFirst(start, end));
  const dfsRow = createAlgRow("DFS distance", "DFS start", "DFS end", (start, end) => graph.findDistanceDepthFirst(start, end));
  const dikRow = createAlgRow("Dijkstra minimum path", "Start", "End", (start, end) => graph.findMinimumPath(start, end));
  const cycRow = createCycleRow(() => graph.detectCycle());

  alg.appendChild(bfsRow);
  alg.appendChild(dfsRow);
  alg.appendChild(dikRow);
  alg.appendChild(cycRow);

  container.appendChild(alg);

  // Matrix
  const matrixWrap = createEl("div", { className: "card" }, []);
  matrixWrap.style.padding = "14px";
  matrixWrap.style.marginTop = "12px";
  const matrixTitle = createEl("div", { className: "mini-title", textContent: "Adjacency matrix (weights)" }, []);
  const matrixDiv = createEl("div", { className: "table-wrap", style: "margin-top:10px;" }, []);
  matrixWrap.appendChild(matrixTitle);
  matrixWrap.appendChild(matrixDiv);
  container.appendChild(matrixWrap);

  // --- Graph logic (in-browser port of your Java code) ---
  class Vertex {
    constructor(name) {
      this.name = name;
      this.edges = [];
    }
  }

  class Edge {
    constructor(weight, destination) {
      this.weight = weight;
      this.destination = destination;
    }
  }

  class LocationGraph {
    constructor() {
      this.vertices = new Map();
    }

    addLocation(location) {
      if (this.vertices.has(location)) return false;
      this.vertices.set(location, new Vertex(location));
      return true;
    }

    addDistance(locationA, locationB, distance) {
      if (!this.vertices.has(locationA)) this.addLocation(locationA);
      if (!this.vertices.has(locationB)) this.addLocation(locationB);
      const a = this.vertices.get(locationA);
      const b = this.vertices.get(locationB);

      for (const e of a.edges) {
        if (e.destination === b) return false;
      }
      a.edges.push(new Edge(distance, b));
      b.edges.push(new Edge(distance, a));
      return true;
    }

    findDistanceBreadthFirst(locationA, locationB) {
      if (!this.vertices.has(locationA) || !this.vertices.has(locationB)) return -1;
      const queue = [];
      const distances = new Map();
      queue.push(this.vertices.get(locationA));
      distances.set(locationA, 0);

      while (queue.length) {
        const current = queue.shift();
        for (const edge of current.edges) {
          if (!distances.has(edge.destination.name)) {
            distances.set(edge.destination.name, distances.get(current.name) + edge.weight);
            queue.push(edge.destination);
          }
        }
      }

      return distances.has(locationB) ? distances.get(locationB) : -1;
    }

    findDistanceDepthFirst(locationA, locationB) {
      const visited = new Set();
      return this._dfs(locationA, locationB, visited, 0);
    }

    _dfs(current, target, visited, distance) {
      if (!this.vertices.has(current) || !this.vertices.has(target)) return -1;
      if (current === target) return distance;

      visited.add(current);
      const vertex = this.vertices.get(current);
      for (const edge of vertex.edges) {
        if (!visited.has(edge.destination.name)) {
          const result = this._dfs(edge.destination.name, target, visited, distance + edge.weight);
          if (result !== -1) return result;
        }
      }
      return -1;
    }

    detectCycle() {
      const visited = new Set();
      for (const name of this.vertices.keys()) {
        if (!visited.has(name)) {
          if (this._hasCycle(name, null, visited)) return true;
        }
      }
      return false;
    }

    _hasCycle(current, parent, visited) {
      visited.add(current);
      const v = this.vertices.get(current);
      for (const edge of v.edges) {
        const neighbor = edge.destination.name;
        if (!visited.has(neighbor)) {
          if (this._hasCycle(neighbor, current, visited)) return true;
        } else if (neighbor !== parent) {
          return true;
        }
      }
      return false;
    }

    findMinimumPath(start, end) {
      if (!this.vertices.has(start) || !this.vertices.has(end)) return -1;

      const distances = new Map();
      const pq = []; // simple array priority queue: [nodeName, dist]

      for (const name of this.vertices.keys()) distances.set(name, Infinity);
      distances.set(start, 0);
      pq.push([start, 0]);

      while (pq.length) {
        pq.sort((a, b) => a[1] - b[1]);
        const [current, dist] = pq.shift();

        if (current === end) return dist;
        if (dist > distances.get(current)) continue;

        for (const edge of this.vertices.get(current).edges) {
          const neighbor = edge.destination.name;
          const newDist = dist + edge.weight;
          if (newDist < distances.get(neighbor)) {
            distances.set(neighbor, newDist);
            pq.push([neighbor, newDist]);
          }
        }
      }

      return -1;
    }

    getVerticesSorted() {
      return Array.from(this.vertices.keys()).sort();
    }

    toAdjacencyMatrixTable() {
      const keys = this.getVerticesSorted();
      const table = createEl("table", {}, []);
      const thead = createEl("thead", {}, []);
      const headRow = createEl("tr", {}, []);
      headRow.appendChild(createEl("th", {}, ["from \\ to"]));
      keys.forEach((k) => headRow.appendChild(createEl("th", {}, [k])));
      thead.appendChild(headRow);
      table.appendChild(thead);

      const tbody = createEl("tbody", {}, []);
      for (const from of keys) {
        const tr = createEl("tr", {}, []);
        tr.appendChild(createEl("td", {}, [from]));
        for (const to of keys) {
          if (from === to) {
            tr.appendChild(createEl("td", {}, ["0"]));
            continue;
          }
          let found = "-1";
          for (const edge of this.vertices.get(from).edges) {
            if (edge.destination.name === to) {
              found = String(edge.weight);
              break;
            }
          }
          tr.appendChild(createEl("td", {}, [found]));
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      return table;
    }
  }

  const graph = new LocationGraph();

  function renderMatrix() {
    matrixDiv.innerHTML = "";
    if (!graph.vertices.size) {
      matrixDiv.appendChild(createEl("div", { className: "project-desc", textContent: "Add edges to see the matrix." }, []));
      return;
    }
    matrixDiv.appendChild(graph.toAdjacencyMatrixTable());
  }

  function loadSample() {
    graph.vertices = new Map();
    graph.addDistance("A", "B", 1.0);
    graph.addDistance("B", "C", 2.0);
    graph.addDistance("A", "C", 5.0);
    status.textContent = "Loaded sample graph: A-B(1), B-C(2), A-C(5).";
    renderMatrix();
  }

  function resetGraph() {
    graph.vertices = new Map();
    status.textContent = "Reset. Add edges to begin.";
    renderMatrix();
  }

  btnAdd.addEventListener("click", () => {
    const a = aInput.value.trim();
    const b = bInput.value.trim();
    const w = Number(wInput.value);
    if (!a || !b || Number.isNaN(w)) {
      status.textContent = "Enter Location A, Location B, and a valid weight.";
      return;
    }
    const ok = graph.addDistance(a, b, w);
    status.textContent = ok
      ? `Edge added: ${a} <-> ${b} (weight ${w}).`
      : `Edge not added (duplicate or invalid).`;
    renderMatrix();
  });

  btnSample.addEventListener("click", loadSample);
  btnReset.addEventListener("click", resetGraph);

  // helpers to construct algorithm controls
  function createAlgRow(label, startPlaceholder, endPlaceholder, runFn) {
    const row = createEl("div", { className: "output" }, []);
    row.style.marginTop = "10px";

    const start = createEl("input", { className: "input", type: "text", placeholder: startPlaceholder }, []);
    const end = createEl("input", { className: "input", type: "text", placeholder: endPlaceholder }, []);
    start.style.minWidth = "160px";
    end.style.minWidth = "160px";

    const btn = createEl("button", { className: "btn btn-primary" }, []);
    btn.textContent = `Run ${label.split(" ")[0]}`;

    return buildAlgRow(row, label, start, end, btn, runFn);
  }

  function buildAlgRow(row, label, start, end, btn, runFn) {
    row.innerHTML = "";
    const title = createEl("div", { style: "font-weight:900; margin-bottom:10px; color: rgba(234,240,255,.92);" }, []);
    title.textContent = label;
    row.appendChild(title);
    const form = createEl("div", { className: "field-row" }, []);
    form.appendChild(start);
    form.appendChild(end);

    const btnRow = createEl("div", { className: "project-actions" }, []);
    btnRow.appendChild(btn);

    const resultBox = createEl("div", { className: "output", style: "margin-top:10px; background: rgba(0,0,0,.12); border-style: solid; border-color: rgba(255,255,255,.12);" }, []);
    resultBox.textContent = "Result will appear here.";
    row.appendChild(form);
    row.appendChild(btnRow);
    row.appendChild(resultBox);

    btn.addEventListener("click", () => {
      const s = start.value.trim();
      const t = end.value.trim();
      if (!s || !t) {
        resultBox.textContent = "Enter both start and end node names.";
        return;
      }
      const result = runFn(s, t);
      resultBox.textContent = `Result: ${result}`;
    });

    return row;
  }

  function createCycleRow(runFn) {
    const row = createEl("div", { className: "output" }, []);
    row.style.marginTop = "10px";
    row.innerHTML = "";
    const title = createEl("div", { style: "font-weight:900; margin-bottom:10px; color: rgba(234,240,255,.92);" }, []);
    title.textContent = "Cycle detection";

    const btn = createEl("button", { className: "btn btn-primary" }, []);
    btn.textContent = "Detect cycle";

    const resultBox = createEl(
      "div",
      { className: "output", style: "margin-top:10px; background: rgba(0,0,0,.12); border-style: solid; border-color: rgba(255,255,255,.12);" },
      []
    );
    resultBox.textContent = "Result will appear here.";

    btn.addEventListener("click", () => {
      const result = runFn();
      resultBox.textContent = `Has cycle: ${result}`;
    });

    row.appendChild(title);
    row.appendChild(btn);
    row.appendChild(resultBox);
    return row;
  }

  // initial sample so the demo isn't empty
  loadSample();

  return container;
}

function renderRoute() {
  const path = routeFromHash();
  if (path === "/" || path === "/home" || path === "") return renderHome();
  if (path === "/about") return renderAbout();
  if (path === "/projects") return renderProjectsList();

  const projectMatch = path.match(/^\/projects\/(.+)$/);
  if (projectMatch) {
    const page = projectMatch[1];
    return renderProjectDetail(page);
  }

  layout({
    title: "Page not found",
    subtitle: "",
    contentEl: createEl("div", { className: "notice" }, ["That route doesn't exist. Try Home or Projects."])
  });
}

function init() {
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

init();

