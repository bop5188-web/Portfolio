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
    id: "neurodivergent-web-prototype",
    rank: 4,
    name: "Neurodivergent-Friendly Website Prototype",
    short:
      "Interactive accessibility settings recommender focused on reducing cognitive load and making websites easier to read and navigate.",
    tags: ["UX Research", "Accessibility", "JavaScript"],
    page: "neurodivergent",
    embed: null
  },
  {
    id: "storefront-sql",
    rank: 5,
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

  card.appendChild(actions);
  return card;
}

function createCaseStudySection(title, points) {
  const block = createEl("div", { className: "card" }, []);
  block.style.padding = "12px";
  block.style.marginTop = "10px";
  block.appendChild(createEl("div", { className: "mini-title", textContent: title }, []));
  const list = createEl("ul", { style: "margin:8px 0 0 18px; padding:0; color: var(--muted); line-height:1.6;" }, []);
  points.forEach((p) => {
    list.appendChild(createEl("li", { style: "margin-bottom:6px;" }, [p]));
  });
  block.appendChild(list);
  return block;
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
}

function renderAbout() {
  layout({
    title: "About",
    subtitle: "Human-Centered Design and Development student focused on UX, accessibility, and interactive web experiences.",
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
    <div><strong>Brielle Picard</strong></div>
    <div>Penn State University, College of IST</div>
    <div>B.S. Human-Centered Design and Development, Expected May 2027</div>
    <div>Minor: Social Media Trends and Analytics · GPA: 3.47</div>
    <div>Dean's List: Fall 2024, Spring 2025</div>
    <div style="margin-top:8px;"><strong>Contact:</strong> (978) 337-0817 · briellepicard@icloud.com</div>
    <div><strong>LinkedIn:</strong> linkedin.com/in/brielle-picard-4519b7318</div>
  `;
  card.appendChild(details);

  left.appendChild(card);
  wrap.appendChild(left);

  const right = createEl("div", {}, []);
  const card2 = createEl("div", { className: "card" }, []);
  card2.style.padding = "16px";

  const h = createEl("div", { className: "mini-title", textContent: "What I bring to internship teams" }, []);
  const desc = createEl(
    "div",
    { className: "project-desc" },
    [
      "I like projects where design and code actually work together. In classes and my internship, I have done wireframes, prototypes, usability testing, and website updates to make things clearer and more accessible. I use Figma, HTML/CSS/JavaScript, Python, SQL, and Google Analytics the most. I really like getting feedback and then changing the design based on what users got stuck on."
    ]
  );

  const bulletish = createEl("div", { className: "tag-row" }, []);
  ["Accessibility-focused design", "Wireframing + prototyping", "Usability testing", "JavaScript / Python / SQL", "Figma + analytics"].forEach((t) => {
    bulletish.appendChild(createEl("span", { className: "tag", textContent: t }, []));
  });

  card2.appendChild(h);
  card2.appendChild(desc);
  card2.appendChild(bulletish);

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
    neurodivergent: "./code/neurodivergent-friendly/README.md",
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
          "I built this project to make graph algorithms easier to understand in a hands-on way. In the original Java version, locations are vertices and paths are weighted edges, then I run breadth-first search, depth-first search, cycle detection, and a Dijkstra-style shortest path. For this portfolio, I rebuilt the same logic in JavaScript so you can test it live by adding edges and running each algorithm. This project shows my OOP coding skills and how I can explain technical logic through UI. It is a good example of how I connect backend logic with front-end interaction."
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
          "I made this AI chatbot project for class to act like a gallery assistant that answers questions about artists, exhibitions, and art styles. My original version used Streamlit, LangChain, and OpenAI with chat history and logging. For this portfolio, I kept the same idea and rebuilt it so it works directly on the site and can be tested live. This project helped me practice prompt design, API thinking, and building a user-friendly AI interface. It shows I can take an AI idea and turn it into something people can actually use."
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
          "Accessify is a human-centered prototype focused on helping students with disabilities navigate campus more safely and comfortably. My team and I used interviews and usability feedback to find pain points like inaccessible routes, confusing navigation, and missing personalization. We designed features like accessibility preference profiles, disability-friendly path mapping, AI support, and community updates. This project helped me grow in user research, accessibility-first design, and iterative prototyping. It reminded me that the best solutions come from designing with users, not guessing what they need."
        ]
      )
    );
  }

  if (project.page === "neurodivergent") {
    story.appendChild(
      createEl(
        "div",
        { className: "output" },
        [
          "I built this project to show how accessibility settings can be personalized for neurodivergent users instead of using one default interface for everyone. The tool asks about focus support, visual sensitivity, reading support, navigation style, and pacing needs, then generates recommendations with clear reasons. I based the recommendations on patterns I have used in class and accessibility guidance, like reducing motion, using plain language, and chunking content. This project helped me practice turning UX research into something interactive and easy to test. It reflects the kind of work I want to do in internships: user-centered design decisions backed by practical implementation."
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
          "This project shows how I designed a relational database for a bakery storefront scenario in MySQL Workbench. I modeled customers, employees, orders, invoices, products, ingredients, suppliers, and inventory so the relationships stayed clean and scalable. I then wrote queries for practical questions like salary-range filtering, no-dependent subqueries, and employee counts by department. It helped me strengthen SQL fundamentals, schema planning, and query debugging. It also improved how I structure data so reporting is accurate and useful."
        ]
      )
    );
  }

  left.appendChild(story);

  // Recruiter-facing UX case study structure (problem -> research -> decisions -> testing -> iteration)
  if (project.page === "accessify") {
    left.appendChild(
      createCaseStudySection("Problem", [
        "Students with physical disabilities shared that campus navigation apps did not clearly surface accessible routes or building constraints.",
        "Users needed route confidence, especially for ramps, elevators, and safer nighttime navigation."
      ])
    );
    left.appendChild(
      createCaseStudySection("Research", [
        "I contributed to user interviews and reviewed accessibility pain points from participant feedback.",
        "Key themes included older building barriers, poor lighting at night, and lack of personalization in existing tools."
      ])
    );
    left.appendChild(
      createCaseStudySection("Design Decisions", [
        "Prioritized accessibility preference profiles (ramps, elevators, quiet spaces, building access settings).",
        "Added AI communication support and a community board so users could share real-time context with each other."
      ])
    );
    left.appendChild(
      createCaseStudySection("Testing + Iteration", [
        "After usability testing, we simplified layouts, improved icon clarity, and adjusted color choices for readability.",
        "We also expanded personalization controls because users wanted faster access to settings tied to their own needs."
      ])
    );
    left.appendChild(
      createCaseStudySection("My Role", [
        "UX research synthesis",
        "Wireframing and prototype refinement",
        "Accessibility-focused interaction decisions"
      ])
    );
  }

  if (project.page === "neurodivergent") {
    left.appendChild(
      createCaseStudySection("Problem", [
        "A lot of websites overwhelm users with too much visual noise, long text blocks, and unpredictable interactions.",
        "I wanted to create a simple way to recommend interface settings based on how someone actually processes information."
      ])
    );
    left.appendChild(
      createCaseStudySection("Research", [
        "I reviewed cognitive accessibility guidance and neurodivergent UX patterns around readability, reduced motion, and predictable flows.",
        "The main themes were lower sensory load, plain language, clearer structure, and better user control."
      ])
    );
    left.appendChild(
      createCaseStudySection("Design Decisions", [
        "I used a question-based settings flow so users can quickly describe their needs.",
        "I mapped each answer to concrete recommendations like reduced animation, chunked content, larger text, and guided navigation."
      ])
    );
    left.appendChild(
      createCaseStudySection("Testing + Iteration", [
        "After peer feedback, I simplified labels and made each recommendation easier to understand at a glance.",
        "I also added examples so the output feels practical, not just theoretical."
      ])
    );
    left.appendChild(
      createCaseStudySection("My Role", [
        "UX research + synthesis",
        "Interaction design",
        "Front-end implementation in JavaScript"
      ])
    );
  }

  // Right: interactive / embed
  const demoWrap = createEl("div", { className: "card" }, []);
  demoWrap.style.padding = "16px";

  if (project.page === "graph") {
    demoWrap.appendChild(renderGraphDemo());
  } else if (project.page === "art-gallery") {
    demoWrap.appendChild(renderArtGalleryEmbed(project));
  } else if (project.page === "accessify") {
    demoWrap.appendChild(renderAccessifyEmbed(project));
  } else if (project.page === "neurodivergent") {
    demoWrap.appendChild(renderNeurodivergentProject(project));
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

  // Same curated basis as the original Python project.
  const EXHIBITIONS = {
    "modern art":
      "The Modern Art exhibition showcases abstract and contemporary pieces from artists worldwide.",
    impressionism:
      "The Impressionism exhibition features works by Monet, Degas, and Renoir.",
    "sculpture hall":
      "The Sculpture Hall displays 3D works from classical to modern sculptors."
  };

  const ARTISTS = {
    monet:
      "Claude Monet was a French painter and a founder of Impressionism, known for his water lilies series.",
    "van gogh":
      "Vincent van Gogh was a Dutch post-impressionist painter, famous for Starry Night.",
    picasso:
      "Pablo Picasso was a Spanish painter and sculptor, co-founder of Cubism."
  };

  function titleCase(text) {
    return text
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
      .join(" ");
  }

  function buildReply(question) {
    const q = question.trim().toLowerCase();
    if (!q) return "Please ask a question so I can help.";

    for (const [name, info] of Object.entries(ARTISTS)) {
      if (q.includes(name)) {
        return `Great question. ${info} If you want, I can also suggest related exhibitions to explore next.`;
      }
    }

    for (const [name, info] of Object.entries(EXHIBITIONS)) {
      if (q.includes(name)) {
        return `Absolutely. ${info} Let me know if you want recommendations for artists connected to ${titleCase(
          name
        )}.`;
      }
    }

    if (q.includes("art style") || q.includes("styles")) {
      return "We currently highlight styles like impressionism, modern art, and sculpture-focused work. If you name a style you like, I can point you to a matching artist or exhibition.";
    }

    return "Welcome to the gallery. I can help with artists like Monet, Van Gogh, and Picasso, or exhibitions like Modern Art, Impressionism, and Sculpture Hall. Try asking about one of those and I will share details.";
  }

  wrap.appendChild(createEl("div", { className: "mini-title", textContent: "Art Gallery AI Chatbot (live demo)" }, []));

  const panel = createEl("div", { className: "card" }, []);
  panel.style.padding = "14px";
  panel.style.marginTop = "10px";

  const intro = createEl("div", { className: "project-desc" }, [
    "Ask a question about exhibitions, artists, or styles. This demo follows the same curated dataset style as my original Python/LangChain project."
  ]);
  panel.appendChild(intro);

  const inputRow = createEl("div", { className: "field-row" }, []);
  inputRow.style.marginTop = "10px";
  const input = createEl("input", {
    className: "input",
    type: "text",
    placeholder: "Try: Tell me about Monet"
  });
  input.style.flex = "1";
  input.style.minWidth = "240px";
  const askBtn = createEl("button", { className: "btn btn-primary" }, ["Ask"]);
  inputRow.appendChild(input);
  inputRow.appendChild(askBtn);
  panel.appendChild(inputRow);

  const quickRow = createEl("div", { className: "project-actions" }, []);
  [
    "Tell me about Monet",
    "What's in Modern Art?",
    "What art styles are featured?"
  ].forEach((q) => {
    const b = createEl("button", { className: "btn btn-ghost" }, [q]);
    b.addEventListener("click", () => {
      input.value = q;
      runQuestion();
    });
    quickRow.appendChild(b);
  });
  panel.appendChild(quickRow);

  const historyBox = createEl("div", { className: "output" }, []);
  historyBox.style.marginTop = "12px";
  historyBox.style.maxHeight = "280px";
  historyBox.style.overflowY = "auto";
  panel.appendChild(historyBox);

  const history = [];

  function renderHistory() {
    historyBox.innerHTML = "";
    if (!history.length) {
      historyBox.textContent = "No chat history yet.";
      return;
    }
    history.forEach((chat) => {
      const q = createEl("div", { className: "project-desc" }, [`You: ${chat.user}`]);
      q.style.color = "rgba(234,240,255,.95)";
      const a = createEl("div", { className: "project-desc" }, [`Bot: ${chat.bot}`]);
      a.style.marginBottom = "10px";
      historyBox.appendChild(q);
      historyBox.appendChild(a);
    });
  }

  function runQuestion() {
    const q = input.value.trim();
    if (!q) return;
    const reply = buildReply(q);
    history.push({ user: q, bot: reply });
    input.value = "";
    renderHistory();
  }

  askBtn.addEventListener("click", runQuestion);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runQuestion();
  });

  renderHistory();
  wrap.appendChild(panel);
  return wrap;
}

function renderAccessifyEmbed(project) {
  const wrap = createEl("div", {}, []);
  const url = project.embed?.url || "";

  wrap.appendChild(createEl("div", { className: "mini-title", textContent: "Accessify Figma Prototype" }, []));

  if (!url) {
    wrap.appendChild(createEl("div", { className: "project-desc" }, ["Figma link will be added here."]));
    return wrap;
  }

  wrap.appendChild(
    createEl(
      "div",
      { className: "project-desc" },
      ["Open the full interactive prototype in Figma to click through the flow and review the design decisions."]
    )
  );

  const linkRow = createEl("div", { className: "project-actions" }, []);
  const linkBtn = createEl("button", { className: "btn btn-primary" }, []);
  linkBtn.textContent = "Open Figma prototype";
  linkBtn.addEventListener("click", () => window.open(url, "_blank", "noopener,noreferrer"));
  linkRow.appendChild(linkBtn);
  wrap.appendChild(linkRow);

  return wrap;
}

function renderNeurodivergentProject(project) {
  const wrap = createEl("div", {}, []);
  wrap.appendChild(createEl("div", { className: "mini-title", textContent: "Neurodivergent Settings Recommender (live)" }, []));
  wrap.appendChild(
    createEl("div", { className: "project-desc" }, [
      "This is a working example of an accessibility settings recommender. Choose your preferences and the tool suggests practical UI settings with a short reason for each one."
    ])
  );

  const principles = createEl("div", { className: "card" }, []);
  principles.style.padding = "12px";
  principles.style.marginTop = "10px";
  principles.appendChild(createEl("div", { className: "mini-title", textContent: "Research-informed principles used" }, []));
  const pList = createEl("ul", { style: "margin:8px 0 0 18px; padding:0; line-height:1.6;" }, []);
  [
    "Reduce sensory load and respect reduced-motion preferences.",
    "Use plain language and chunked content for readability.",
    "Keep navigation predictable and avoid memory-heavy flows.",
    "Provide personalization and user control over display settings."
  ].forEach((t) => pList.appendChild(createEl("li", { style: "margin-bottom:6px;" }, [t])));
  principles.appendChild(pList);
  wrap.appendChild(principles);

  const panel = createEl("div", { className: "card" }, []);
  panel.style.padding = "14px";
  panel.style.marginTop = "10px";

  const form = createEl("div", { className: "field-row" }, []);

  function makeSelect(labelText, options) {
    const box = createEl("div", {}, []);
    box.appendChild(createEl("label", { textContent: labelText }, []));
    const sel = createEl("select", { className: "input" }, []);
    options.forEach((opt) => {
      sel.appendChild(createEl("option", { value: opt.value }, [opt.label]));
    });
    sel.style.minWidth = "200px";
    box.appendChild(sel);
    form.appendChild(box);
    return sel;
  }

  const focusNeed = makeSelect("Focus support", [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ]);
  const visualSensitivity = makeSelect("Visual sensitivity", [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" }
  ]);
  const readingPreference = makeSelect("Reading support", [
    { value: "standard", label: "Standard" },
    { value: "dyslexia", label: "Dyslexia-friendly" },
    { value: "large", label: "Larger text preferred" }
  ]);
  const navStyle = makeSelect("Navigation style", [
    { value: "compact", label: "Compact" },
    { value: "guided", label: "Guided / step-by-step" },
    { value: "minimal", label: "Minimal choices per screen" }
  ]);
  const paceSupport = makeSelect("Pacing support", [
    { value: "standard", label: "Standard pace" },
    { value: "extended", label: "Extended time / slower pace" },
    { value: "pause", label: "Pause reminders + save progress" }
  ]);

  panel.appendChild(form);

  const actions = createEl("div", { className: "project-actions" }, []);
  const recommendBtn = createEl("button", { className: "btn btn-primary" }, ["Apply settings + recommendations"]);
  const resetBtn = createEl("button", { className: "btn btn-ghost" }, ["Reset"]);
  const clearBtn = createEl("button", { className: "btn btn-ghost" }, ["Clear applied site settings"]);
  actions.appendChild(recommendBtn);
  actions.appendChild(resetBtn);
  actions.appendChild(clearBtn);
  panel.appendChild(actions);

  const output = createEl("div", { className: "output" }, []);
  output.style.marginTop = "12px";
  panel.appendChild(output);

  const examples = createEl("div", { className: "card" }, []);
  examples.style.padding = "12px";
  examples.style.marginTop = "10px";
  examples.appendChild(createEl("div", { className: "mini-title", textContent: "Example scenarios" }, []));
  const exList = createEl("ul", { style: "margin:8px 0 0 18px; padding:0; line-height:1.6;" }, []);
  [
    "High focus + high visual sensitivity -> distraction-free mode, reduced motion, calmer colors.",
    "Dyslexia-friendly reading + guided navigation -> more spacing, plain language labels, progress indicators.",
    "Minimal navigation + pause support -> fewer options per screen, save progress, pause/resume controls."
  ].forEach((t) => exList.appendChild(createEl("li", { style: "margin-bottom:6px;" }, [t])));
  examples.appendChild(exList);
  panel.appendChild(examples);

  function applyVisualSettings() {
    const body = document.body;
    if (!body) return;

    body.classList.remove(
      "nd-reduced-motion",
      "nd-calm-colors",
      "nd-large-text",
      "nd-dyslexia-text",
      "nd-guided-nav",
      "nd-minimal-nav",
      "nd-focus-mode"
    );

    if (visualSensitivity.value === "high") {
      body.classList.add("nd-reduced-motion", "nd-calm-colors");
    } else if (visualSensitivity.value === "medium") {
      body.classList.add("nd-calm-colors");
    }

    if (readingPreference.value === "large") {
      body.classList.add("nd-large-text");
    } else if (readingPreference.value === "dyslexia") {
      body.classList.add("nd-dyslexia-text");
    }

    if (navStyle.value === "guided") body.classList.add("nd-guided-nav");
    if (navStyle.value === "minimal") body.classList.add("nd-minimal-nav");
    if (focusNeed.value === "high") body.classList.add("nd-focus-mode");
  }

  function clearAppliedSettings() {
    document.body.classList.remove(
      "nd-reduced-motion",
      "nd-calm-colors",
      "nd-large-text",
      "nd-dyslexia-text",
      "nd-guided-nav",
      "nd-minimal-nav",
      "nd-focus-mode"
    );
  }

  function renderRecommendations() {
    const recs = [];

    // Baseline recommendations aligned with cognitive accessibility patterns.
    recs.push("Use plain-language labels and short instructions (avoid jargon in key actions).");
    recs.push("Chunk long content into clear sections with descriptive headings.");

    if (focusNeed.value === "high") {
      recs.push("Turn on distraction-free mode (hide secondary panels and reduce on-screen clutter).");
      recs.push("Use step-by-step task flow so only one primary action appears at a time.");
    } else if (focusNeed.value === "medium") {
      recs.push("Use clear section grouping with strong headings for easier scanning.");
    }

    if (visualSensitivity.value === "high") {
      recs.push("Use reduced motion and disable animated transitions by default.");
      recs.push("Lower color intensity and avoid high-saturation accent colors.");
    } else if (visualSensitivity.value === "medium") {
      recs.push("Use subtle transitions only and avoid flashing feedback states.");
    }

    if (readingPreference.value === "dyslexia") {
      recs.push("Increase line spacing and character spacing; use left-aligned text blocks.");
      recs.push("Prefer plain language labels and shorter paragraph chunks.");
    } else if (readingPreference.value === "large") {
      recs.push("Set base font size to 18px+ with stronger contrast for body text.");
    } else {
      recs.push("Keep readable font size with clear heading hierarchy.");
    }

    if (navStyle.value === "guided") {
      recs.push("Use progress indicators and 'next step' prompts for multi-step tasks.");
    } else if (navStyle.value === "minimal") {
      recs.push("Show fewer options per screen and put advanced settings behind a secondary panel.");
    } else {
      recs.push("Use compact navigation with quick links, but keep labels explicit.");
    }

    if (paceSupport.value === "extended") {
      recs.push("Extend time limits and avoid auto-expiring forms during active input.");
    } else if (paceSupport.value === "pause") {
      recs.push("Add pause/resume controls and save progress so users can continue later.");
    } else {
      recs.push("Show clear timing expectations for multi-step tasks.");
    }

    output.innerHTML = "";
    output.appendChild(createEl("div", { className: "mini-title", textContent: "Recommended settings" }, []));
    const ul = createEl("ul", { style: "margin:8px 0 0 18px; padding:0; line-height:1.6;" }, []);
    recs.forEach((r) => ul.appendChild(createEl("li", { style: "margin-bottom:6px;" }, [r])));
    output.appendChild(ul);
    output.appendChild(
      createEl("div", { className: "project-desc" }, [
        "Applied to this site now: these settings lower cognitive load, improve reading comfort, and make the interface more predictable."
      ])
    );
  }

  recommendBtn.addEventListener("click", () => {
    applyVisualSettings();
    renderRecommendations();
  });
  resetBtn.addEventListener("click", () => {
    focusNeed.value = "low";
    visualSensitivity.value = "low";
    readingPreference.value = "standard";
    navStyle.value = "compact";
    paceSupport.value = "standard";
    clearAppliedSettings();
    output.textContent = "Reset complete. Click Apply settings + recommendations to test again.";
  });

  clearBtn.addEventListener("click", () => {
    clearAppliedSettings();
    output.textContent = "Site settings cleared. You are back to the default view.";
  });

  output.textContent = "Choose preferences, then click Apply settings + recommendations.";
  wrap.appendChild(panel);

  return wrap;
}

function renderSQLStory() {
  const wrap = createEl("div", {}, []);
  wrap.appendChild(createEl("div", { className: "mini-title", textContent: "SQL + Data Modeling (MySQL Workbench)" }, []));

  const p = createEl("div", { className: "project-desc" }, [
    "These screenshots show the database model and query outputs from my bakery storefront project. Each image highlights a different part of my process, from schema design to query results and validation."
  ]);
  wrap.appendChild(p);

  // These filenames match what’s currently in the repo assets folder when we copied them.
  const imgSchema = "./assets/Screenshot_2025-05-05_at_4.12.01_PM-5d677e48-31a6-49e8-952c-b2469d2cbdbb.png";
  const imgQ2 = "./assets/Screenshot_2025-05-05_at_3.30.15_PM__1_-fee8c6e2-6232-4911-9254-2731c8c2a2dc.png";
  const imgQ3 = "./assets/Screenshot_2025-05-05_at_3.32.54_PM__1_-d33fd91a-6521-4f67-b394-08d21150075e.png";
  const imgQ1 = "./assets/Screenshot_2025-05-05_at_3.06.01_PM__1_-6514cf15-fe87-4813-8bb6-aca6b21179de.png";

  const sections = [
    {
      title: "1) ER Diagram and table relationships",
      img: imgSchema,
      caption:
        "This image shows the full schema I built, including relationships between customers, employees, orders, invoices, products, ingredients, suppliers, and inventory tables."
    },
    {
      title: "2) Employees without dependents (subquery)",
      img: imgQ2,
      caption:
        "This result demonstrates a subquery-based filter and grouped department counts, which I used to answer a specific business question from the assignment."
    },
    {
      title: "3) Total employees by department",
      img: imgQ3,
      caption:
        "This output shows grouped employee totals by department in sorted order, confirming my joins and aggregation logic."
    },
    {
      title: "4) Hire date and salary range filter",
      img: imgQ1,
      caption:
        "This query result validates conditional filtering with both a date threshold and salary range, ordered from lowest to highest salary as required."
    }
  ];

  sections.forEach((item) => {
    const block = createEl("div", { className: "card" }, []);
    block.style.marginTop = "12px";
    block.style.padding = "14px";
    block.appendChild(createEl("div", { className: "mini-title", textContent: item.title }, []));
    block.appendChild(createEl("div", { className: "project-desc" }, [item.caption]));
    const imgEl = createEl("img", { src: item.img, alt: item.title }, []);
    imgEl.style.width = "100%";
    imgEl.style.marginTop = "10px";
    imgEl.style.borderRadius = "14px";
    imgEl.style.border = "1px solid rgba(255,255,255,.10)";
    imgEl.style.background = "rgba(0,0,0,.20)";
    block.appendChild(imgEl);
    wrap.appendChild(block);
  });

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

