(function () {
  "use strict";

  const basePath = document.body.dataset.base || "";
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const fileName = pathParts[pathParts.length - 1] || "index.html";
  const isBlogArticle = fileName === "autonomous-waste-robot.html";
  const pageMap = {
    "index.html": { key: "home", file: "home.json", activeUrl: "index.html" },
    "research.html": { key: "research", file: "research.json", activeUrl: "research.html" },
    "experience.html": { key: "experience", file: "experience.json", activeUrl: "experience.html" },
    "awards.html": { key: "awards", file: "awards.json", activeUrl: "awards.html" },
    "projects.html": { key: "projects", file: "projects.json", activeUrl: "projects.html" },
    "learning.html": { key: "learning", file: "learning.json", activeUrl: "learning.html" },
    "gallery.html": { key: "gallery", file: "gallery.json", activeUrl: "gallery.html" },
    "blog.html": { key: "blog", file: "blog.json", activeUrl: "blog.html" }
  };
  const pageConfig = isBlogArticle
    ? { key: "blogArticle", file: "blog.json", activeUrl: "blog.html", slug: "autonomous-waste-robot" }
    : pageMap[fileName];
  const allPageFiles = [
    "home.json",
    "research.json",
    "experience.json",
    "awards.json",
    "projects.json",
    "learning.json",
    "gallery.json",
    "blog.json"
  ];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function rootUrl(url) {
    const value = String(url || "");
    return /^(?:[a-z][a-z0-9+.-]*:|#)/i.test(value) ? value : basePath + value;
  }

  function renderHero(heading, intro) {
    return '<header class="page-hero"><h1>' + escapeHtml(heading) + '</h1><p>' + escapeHtml(intro) + '</p></header>';
  }

  function renderMedia(image, alt, extraClass) {
    if (!image) return "";
    const className = extraClass ? "media-frame " + extraClass : "media-frame";
    return '<div class="' + escapeHtml(className) + '" data-placeholder="Add ' + escapeHtml(image) + '"><img src="' + escapeHtml(rootUrl(image)) + '" alt="' + escapeHtml(alt || "") + '"></div>';
  }

  function setMetadata(data, site, titleOverride, descriptionOverride) {
    const title = titleOverride || data.browserTitle;
    const description = descriptionOverride || data.description;
    if (title) document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute("content", description);
    if (!title && site && site.name) document.title = site.name;
  }

  function applySiteData(site) {
    document.querySelectorAll(".brand").forEach(function (brand) {
      brand.href = rootUrl("index.html");
      brand.setAttribute("aria-label", site.name + ", home");
      if (brand.children[1]) brand.children[1].textContent = site.name;
      const initials = brand.querySelector(".brand-photo > span");
      const avatar = brand.querySelector(".brand-photo img");
      if (initials) initials.textContent = site.shortName || "";
      if (avatar && site.avatarImage) avatar.src = rootUrl(site.avatarImage);
    });

    const navigation = document.querySelector("[data-navigation]");
    if (navigation && Array.isArray(site.navigation)) {
      navigation.innerHTML = site.navigation.map(function (item) {
        const current = item.url === pageConfig.activeUrl ? ' aria-current="page"' : "";
        return '<a href="' + escapeHtml(rootUrl(item.url)) + '"' + current + '>' + escapeHtml(item.label) + '</a>';
      }).join("");
    }

    const footer = document.querySelector(".site-footer");
    if (footer) {
      footer.innerHTML = '<p>© <span data-current-year>' + new Date().getFullYear() + '</span> ' + escapeHtml(site.name) + ' · <a href="mailto:' + escapeHtml(site.email) + '">' + escapeHtml(site.email) + '</a></p>';
    }
  }

  function renderProfileLinks(site) {
    const profiles = Array.isArray(site.profiles) ? site.profiles : [];
    return [1, 2].map(function (column) {
      const links = profiles.filter(function (profile) { return Number(profile.column) === column; }).map(function (profile) {
        const download = profile.download ? " download" : "";
        const profileUrl = profile.download && site.cvFile ? site.cvFile : profile.url;
        return '<a href="' + escapeHtml(rootUrl(profileUrl)) + '" rel="me"' + download + '>[' + escapeHtml(profile.label) + ']</a>';
      }).join("");
      return '<div class="social-column">' + links + '</div>';
    }).join("");
  }

  function renderHome(data, site) {
    const skillItems = (data.technicalSkills || []).map(function (skill) {
      return '<li><strong>' + escapeHtml(skill.label) + ':</strong> ' + escapeHtml(skill.value) + '</li>';
    }).join("");
    const coursework = (data.coursework || []).map(function (course) {
      return '<li>' + escapeHtml(course) + '</li>';
    }).join("");
    const languages = (data.languages || []).map(function (item) {
      return '<li><strong>' + escapeHtml(item.language) + ':</strong> ' + escapeHtml(item.level) + '</li>';
    }).join("");
    const news = (data.news || []).map(function (item) {
      return '<li><span class="news-year">' + escapeHtml(item.year) + '</span><span>' + escapeHtml(item.text) + '</span></li>';
    }).join("");
    const biography = (data.biography || []).map(function (paragraph) {
      return '<p>' + escapeHtml(paragraph) + '</p>';
    }).join("");

    return '<div class="home-wrap">' +
      '<section class="home-intro" aria-labelledby="home-title">' +
        '<div class="profile-panel">' +
          renderMedia(site.profileImage, "Portrait of " + site.name, "profile-image") +
          '<ul class="profile-contact" aria-label="Contact details">' +
            '<li><strong>Email</strong><a href="mailto:' + escapeHtml(site.email) + '">' + escapeHtml(site.email) + '</a></li>' +
            '<li><strong>Phone</strong><a href="tel:' + escapeHtml(site.phoneLink) + '">' + escapeHtml(site.phoneDisplay) + '</a></li>' +
          '</ul>' +
          '<div class="social-links" aria-label="Academic and professional profiles">' + renderProfileLinks(site) + '</div>' +
        '</div>' +
        '<div class="bio-panel"><h1 id="home-title">' + escapeHtml(data.heading) + '</h1>' +
          '<p class="research-line"><strong>Research Interest:</strong> ' + escapeHtml(data.researchInterest) + '</p>' + biography +
        '</div>' +
      '</section>' +
      '<section class="quick-grid" aria-label="Profile details">' +
        '<div class="home-section skills-section" id="technical-skills"><h2>Technical Skills</h2><ul class="skills-summary">' + skillItems + '</ul></div>' +
        '<div class="home-section" id="coursework"><h2>Relevant Coursework</h2><ul class="plain-list">' + coursework + '</ul></div>' +
        '<div class="home-section"><h2>Language Skills</h2><ul class="plain-list">' + languages + '</ul></div>' +
        '<div class="home-section full-grid-section"><h2>News</h2><ul class="news-list">' + news + '</ul></div>' +
      '</section>' +
    '</div>';
  }

  function highlightAuthor(authors, highlight) {
    const safeAuthors = escapeHtml(authors);
    const safeHighlight = escapeHtml(highlight);
    if (!safeHighlight) return safeAuthors;
    return safeAuthors.split(safeHighlight).join('<strong>' + safeHighlight + '</strong>');
  }

  function renderResearch(data) {
    const years = (data.years || []).map(function (yearGroup) {
      const yearId = "year-" + String(yearGroup.year).replace(/[^a-z0-9-]/gi, "-");
      const publications = (yearGroup.publications || []).map(function (publication) {
        const itemId = publication.id ? ' id="' + escapeHtml(publication.id) + '"' : "";
        const details = publication.details ? ", " + escapeHtml(publication.details) : "";
        const links = publication.doi
          ? '<div class="publication-links"><a href="https://doi.org/' + escapeHtml(publication.doi) + '">DOI: ' + escapeHtml(publication.doi) + '</a><a href="' + escapeHtml(data.scholarUrl) + '">Google Scholar</a></div>'
          : "";
        return '<article class="publication-item"' + itemId + '><h2>' + escapeHtml(publication.title) + '</h2>' +
          '<p>' + highlightAuthor(publication.authors, data.highlightAuthor) + '</p>' +
          '<p><em>' + escapeHtml(publication.venue) + '</em>' + details + '</p>' + links + '</article>';
      }).join("");
      return '<section class="year-block" aria-labelledby="' + yearId + '"><h2 id="' + yearId + '" class="year-heading">' + escapeHtml(yearGroup.year) + '</h2><div class="publication-list">' + publications + '</div></section>';
    }).join("");
    const record = data.recordText
      ? '<section class="content-wrap data-record-note"><div class="replacement-note"><strong>' + escapeHtml(data.recordLabel) + ':</strong> ' + escapeHtml(data.recordText) + '</div></section>'
      : "";
    return renderHero(data.heading, data.intro) + years + record;
  }

  function renderExperience(data) {
    const sections = (data.sections || []).map(function (section) {
      const entries = (section.entries || []).map(function (entry) {
        const summary = entry.summary ? '<p>' + escapeHtml(entry.summary) + '</p>' : "";
        const bullets = Array.isArray(entry.bullets) && entry.bullets.length
          ? '<ul class="compact-points">' + entry.bullets.map(function (bullet) { return '<li>' + escapeHtml(bullet) + '</li>'; }).join("") + '</ul>'
          : "";
        return '<article class="timeline-item">' +
          renderMedia(entry.image, entry.title, "timeline-visual") +
          '<div class="timeline-meta"><strong>' + escapeHtml(entry.date) + '</strong><span>' + escapeHtml(entry.location) + '</span></div>' +
          '<div class="timeline-content"><h3>' + escapeHtml(entry.title) + '</h3>' +
            (entry.role ? '<p class="timeline-role">' + escapeHtml(entry.role) + '</p>' : "") + summary + bullets +
          '</div></article>';
      }).join("");
      const titleId = section.id + "-title";
      return '<section class="section-block" id="' + escapeHtml(section.id) + '" aria-labelledby="' + escapeHtml(titleId) + '"><h2 id="' + escapeHtml(titleId) + '" class="band-heading">' + escapeHtml(section.title) + '</h2><div class="timeline">' + entries + '</div></section>';
    }).join("");
    return renderHero(data.heading, data.intro) + sections;
  }

  function renderAwards(data) {
    const awards = (data.awards || []).map(function (award) {
      return '<article class="award-item">' + renderMedia(award.image, award.title, "award-media") +
        '<div class="award-year">' + escapeHtml(award.year) + '</div><div><h2>' + escapeHtml(award.title) + '</h2><p>' + escapeHtml(award.organization) + '</p></div></article>';
    }).join("");
    return renderHero(data.heading, data.intro) + '<h2 class="band-heading" id="' + escapeHtml(data.sectionId) + '">' + escapeHtml(data.sectionTitle) + '</h2><div class="award-list">' + awards + '</div>';
  }

  function renderProjects(data) {
    const projects = (data.projects || []).map(function (project) {
      const itemId = project.id ? ' id="' + escapeHtml(project.id) + '"' : "";
      const tags = (project.tags || []).map(function (tag) { return '<li>' + escapeHtml(tag) + '</li>'; }).join("");
      return '<article class="project-card"' + itemId + '>' + renderMedia(project.image, project.imageAlt || project.title) +
        '<div class="project-copy"><div class="project-number">' + escapeHtml(project.number) + '</div><h2>' + escapeHtml(project.title) + '</h2><p>' + escapeHtml(project.description) + '</p><ul class="tag-list">' + tags + '</ul></div></article>';
    }).join("");
    return renderHero(data.heading, data.intro) + '<div class="project-grid">' + projects + '</div>';
  }

  function renderLearning(data) {
    const items = (data.items || []).map(function (item) {
      return '<article class="learning-card">' + renderMedia(item.image, item.imageAlt || item.title) +
        '<div class="learning-copy"><h2>' + escapeHtml(item.title) + '</h2><p>' + escapeHtml(item.provider) + ' · ' + escapeHtml(item.year) + '</p><span class="learning-status">' + escapeHtml(item.status) + '</span></div></article>';
    }).join("");
    return renderHero(data.heading, data.intro) + '<div class="learning-grid">' + items + '</div>';
  }

  function renderGallery(data) {
    const items = (data.items || []).map(function (item) {
      return '<figure class="gallery-card">' + renderMedia(item.image, item.imageAlt || item.title) +
        '<figcaption class="gallery-caption"><h2>' + escapeHtml(item.title) + '</h2><p>' + escapeHtml(item.caption) + '</p></figcaption></figure>';
    }).join("");
    return renderHero(data.heading, data.intro) + '<div class="gallery-grid">' + items + '</div>';
  }

  function renderBlog(data) {
    const posts = (data.posts || []).map(function (post) {
      const postUrl = rootUrl(post.url);
      return '<li class="blog-entry"><a class="blog-thumb" href="' + escapeHtml(postUrl) + '" aria-label="Read ' + escapeHtml(post.shortTitle || post.title) + '">' +
        renderMedia(post.image, post.imageAlt || post.title) + '</a><div><h2><a href="' + escapeHtml(postUrl) + '">' + escapeHtml(post.title) + '</a></h2>' +
        '<time datetime="' + escapeHtml(post.date) + '">' + escapeHtml(post.displayDate) + '</time><p>' + escapeHtml(post.summary) + '</p></div></li>';
    }).join("");
    return '<section class="blog-main" aria-labelledby="blog-title"><h1 id="blog-title">' + escapeHtml(data.heading) + '</h1><p class="blog-lead">' + escapeHtml(data.intro) + '</p><ul class="blog-list">' + posts + '</ul></section>';
  }

  function renderArticleBlock(block) {
    if (block.type === "heading2") return '<h2>' + escapeHtml(block.text) + '</h2>';
    if (block.type === "heading3") return '<h3>' + escapeHtml(block.text) + '</h3>';
    return '<p>' + escapeHtml(block.text) + '</p>';
  }

  function renderBlogArticle(data, site) {
    const post = (data.posts || []).find(function (item) { return item.slug === pageConfig.slug; });
    if (!post) return "";
    const blocks = (post.blocks || []).map(renderArticleBlock).join("");
    const doi = post.doi ? '<p><a href="https://doi.org/' + escapeHtml(post.doi) + '">DOI: ' + escapeHtml(post.doi) + '</a></p>' : "";
    setMetadata(data, site, (post.shortTitle || post.title) + " | " + site.name, post.description);
    return '<article class="article-main"><header><h1>' + escapeHtml(post.title) + '</h1><time class="article-date" datetime="' + escapeHtml(post.date) + '">' + escapeHtml(post.displayDate) + '</time></header>' +
      renderMedia(post.image, post.imageAlt || post.title, "article-hero") + blocks + doi + '<a class="back-link" href="' + escapeHtml(rootUrl("blog.html")) + '">← All posts</a></article>';
  }

  const renderers = {
    home: renderHome,
    research: renderResearch,
    experience: renderExperience,
    awards: renderAwards,
    projects: renderProjects,
    learning: renderLearning,
    gallery: renderGallery,
    blog: renderBlog,
    blogArticle: renderBlogArticle
  };

  function buildSearchIndex(site, dataByFile) {
    const home = dataByFile["home.json"] || {};
    const research = dataByFile["research.json"] || {};
    const experience = dataByFile["experience.json"] || {};
    const awards = dataByFile["awards.json"] || {};
    const projects = dataByFile["projects.json"] || {};
    const learning = dataByFile["learning.json"] || {};
    const gallery = dataByFile["gallery.json"] || {};
    const blog = dataByFile["blog.json"] || {};
    const pageDetails = {
      "index.html": home.description || home.researchInterest || "Academic biography and profile",
      "research.html": research.intro || "Research and publications",
      "experience.html": experience.intro || "Education and experience",
      "awards.html": awards.intro || "Awards and achievements",
      "projects.html": projects.intro || "Selected projects",
      "learning.html": learning.intro || "Learning and certifications",
      "gallery.html": gallery.intro || "Gallery",
      "blog.html": blog.intro || "Blog"
    };
    const index = (site.navigation || []).map(function (item) {
      return { title: item.label, url: item.url, detail: pageDetails[item.url] || "" };
    });

    index.push({ title: "Technical Skills", url: "index.html#technical-skills", detail: (home.technicalSkills || []).map(function (item) { return item.label + " " + item.value; }).join(" ") });
    index.push({ title: "Relevant Coursework", url: "index.html#coursework", detail: (home.coursework || []).join(" ") });
    (research.years || []).forEach(function (yearGroup) {
      (yearGroup.publications || []).forEach(function (publication) {
        index.push({ title: publication.title, url: "research.html" + (publication.id ? "#" + publication.id : ""), detail: [publication.authors, publication.venue, publication.doi].filter(Boolean).join(" ") });
      });
    });
    (experience.sections || []).forEach(function (section) {
      (section.entries || []).forEach(function (entry) {
        index.push({ title: entry.title, url: "experience.html#" + section.id, detail: [entry.role, entry.date, entry.location, entry.summary, (entry.bullets || []).join(" ")].filter(Boolean).join(" ") });
      });
    });
    (awards.awards || []).forEach(function (award) {
      index.push({ title: award.title, url: "awards.html#" + (awards.sectionId || ""), detail: [award.year, award.organization].filter(Boolean).join(" ") });
    });
    (projects.projects || []).forEach(function (project) {
      index.push({ title: project.title, url: "projects.html" + (project.id ? "#" + project.id : ""), detail: [project.description, (project.tags || []).join(" ")].filter(Boolean).join(" ") });
    });
    (learning.items || []).forEach(function (item) {
      index.push({ title: item.title, url: "learning.html", detail: [item.provider, item.year, item.status].filter(Boolean).join(" ") });
    });
    (gallery.items || []).forEach(function (item) {
      index.push({ title: item.title, url: "gallery.html", detail: item.caption || "" });
    });
    (blog.posts || []).forEach(function (post) {
      index.push({ title: post.title, url: post.url, detail: post.summary || "" });
    });
    return index;
  }

  async function fetchJson(file) {
    const response = await fetch(basePath + "data/" + file, { cache: "no-cache" });
    if (!response.ok) throw new Error("Unable to load " + file + " (" + response.status + ")");
    return response.json();
  }

  async function loadContent() {
    if (!pageConfig) return false;
    const site = await fetchJson("site.json");
    const data = await fetchJson(pageConfig.file);
    const results = await Promise.all(allPageFiles.map(function (file) {
      if (file === pageConfig.file) return Promise.resolve({ file: file, data: data });
      return fetchJson(file).then(function (data) {
        return { file: file, data: data };
      }).catch(function () {
        return { file: file, data: null };
      });
    }));
    const dataByFile = {};
    results.forEach(function (result) { dataByFile[result.file] = result.data; });
    const main = document.querySelector("#main-content");
    if (!main || !renderers[pageConfig.key]) return false;

    applySiteData(site);
    const markup = renderers[pageConfig.key](data, site);
    if (markup) main.innerHTML = markup;
    if (pageConfig.key !== "blogArticle") setMetadata(data, site);
    window.portfolioSearchIndex = buildSearchIndex(site, dataByFile);
    window.portfolioData = { site: site, page: data, pageKey: pageConfig.key };
    return true;
  }

  window.portfolioContentReady = loadContent().catch(function (error) {
    console.warn("Using the built-in page content because JSON data could not be loaded.", error);
    return false;
  });
})();
