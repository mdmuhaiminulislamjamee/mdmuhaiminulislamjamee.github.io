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
    const introMarkup = intro ? '<p>' + escapeHtml(intro) + '</p>' : "";
    return '<header class="page-hero"><h1>' + escapeHtml(heading) + '</h1>' + introMarkup + '</header>';
  }

  function renderLinkIcon(type) {
    const icons = {
      email: '<path d="M3.5 6.5h17v11h-17z"></path><path d="m4 7 8 6 8-6"></path>',
      phone: '<path d="M7.2 3.5 10 8 7.8 9.8c1.4 2.8 3.6 5 6.4 6.4L16 14l4.5 2.8-.8 3c-.2.7-.9 1.2-1.7 1.2C9.7 20.5 3.5 14.3 3 6c0-.8.5-1.5 1.2-1.7l3-.8Z"></path>',
      linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2"></rect><path d="M8 10v7M8 7.2v.1M12 17v-7M12 13a3 3 0 0 1 6 0v4"></path>',
      scholar: '<path d="m2.5 9 9.5-5 9.5 5-9.5 5-9.5-5Z"></path><path d="M6 11.2V16c3.5 2.7 8.5 2.7 12 0v-4.8M21.5 9v6"></path>',
      orcid: '<circle cx="12" cy="12" r="9"></circle><path d="M8.5 10.5v5M8.5 7.8v.1M12 10.5h2a2.5 2.5 0 0 1 0 5h-2v-5Z"></path>',
      github: '<path d="M9 19c-4.2 1.3-4.2-2.1-5.9-2.6M14.9 21v-3.3c0-1 .1-1.7-.5-2.4 2.8-.3 5.7-1.4 5.7-6.3a5 5 0 0 0-1.3-3.4 4.6 4.6 0 0 0-.1-3.4s-1.1-.4-3.6 1.3a12.4 12.4 0 0 0-6.2 0C6.4 1.8 5.3 2.2 5.3 2.2a4.6 4.6 0 0 0-.1 3.4A5 5 0 0 0 3.9 9c0 4.9 2.9 6 5.7 6.3-.5.6-.6 1.3-.5 2.4V21"></path>',
      cv: '<path d="M6 2.5h8l4 4V21H6z"></path><path d="M14 2.5v4h4M12 10v7M9.5 14.5 12 17l2.5-2.5"></path>'
    };
    return '<span class="profile-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + (icons[type] || icons.cv) + '</svg></span>';
  }

  function renderExternalLink(url, label, extraClass) {
    const className = "external-link" + (extraClass ? " " + extraClass : "");
    const icon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6"></path><path d="m20 4-9 9"></path><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"></path></svg>';
    if (url) {
      return '<a class="' + escapeHtml(className) + '" href="' + escapeHtml(rootUrl(url)) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escapeHtml(label) + '" title="' + escapeHtml(label) + '">' + icon + '</a>';
    }
    return '<span class="' + escapeHtml(className + " is-pending") + '" role="img" aria-label="' + escapeHtml(label + " link has not been added") + '" title="Add this Google Drive link in the JSON file">' + icon + '</span>';
  }

  function renderMedia(image, alt, extraClass) {
    if (!image) return "";
    const className = extraClass ? "media-frame " + extraClass : "media-frame";
    return '<div class="' + escapeHtml(className) + '" data-placeholder="Add ' + escapeHtml(image) + '"><img src="' + escapeHtml(rootUrl(image)) + '" alt="' + escapeHtml(alt || "") + '"></div>';
  }

  function renderProjectMedia(image, alt) {
    if (!image) return "";
    const safeAlt = alt || "Project image";
    return '<button class="media-frame project-preview-trigger" type="button" data-image-preview="' + escapeHtml(rootUrl(image)) + '" data-preview-alt="' + escapeHtml(safeAlt) + '" data-placeholder="Add ' + escapeHtml(image) + '" aria-label="Preview ' + escapeHtml(safeAlt) + '"><img src="' + escapeHtml(rootUrl(image)) + '" alt="' + escapeHtml(safeAlt) + '"><span class="preview-hint">Preview image</span></button>';
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
      footer.innerHTML = '<p>© <span data-current-year>' + new Date().getFullYear() + '</span> ' + escapeHtml(site.name) + '</p>';
    }
  }

  function renderProfileLinks(site) {
    const profiles = Array.isArray(site.profiles) ? site.profiles : [];
    return [1, 2].map(function (column) {
      const links = profiles.filter(function (profile) { return Number(profile.column) === column; }).map(function (profile) {
        const download = profile.download ? " download" : "";
        const profileUrl = profile.download && site.cvFile ? site.cvFile : profile.url;
        const iconType = profile.icon || profile.label.toLowerCase().replace(/\s+/g, "-");
        return '<a href="' + escapeHtml(rootUrl(profileUrl)) + '" rel="me"' + download + '>' + renderLinkIcon(iconType) + '<span>' + escapeHtml(profile.label) + '</span></a>';
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
    const professionalTagline = Array.isArray(data.professionalTagline) && data.professionalTagline.length
      ? '<p class="professional-tagline">• ' + data.professionalTagline.map(escapeHtml).join(' <span aria-hidden="true">•</span> ') + '</p>'
      : "";
    const references = (data.references || []).map(function (reference, index) {
      return '<article class="reference-card"><h3><span>' + escapeHtml(index + 1) + '.</span> ' + escapeHtml(reference.name) + '</h3>' +
        '<p>' + escapeHtml(reference.role) + '</p><p>' + escapeHtml(reference.affiliation) + '</p>' +
        '<p><strong>Email:</strong> <a href="mailto:' + escapeHtml(reference.email) + '">' + escapeHtml(reference.email) + '</a></p>' +
        '<p><strong>Phone:</strong> <a href="tel:' + escapeHtml(reference.phoneLink || reference.phoneDisplay) + '">' + escapeHtml(reference.phoneDisplay) + '</a></p></article>';
    }).join("");
    const referencesMarkup = references
      ? '<section class="home-references" id="references" aria-labelledby="references-title"><h2 id="references-title">' + escapeHtml(data.referencesTitle || "References") + '</h2><div class="reference-grid">' + references + '</div></section>'
      : "";

    return '<div class="home-wrap">' +
      '<section class="home-intro" aria-labelledby="home-title">' +
        '<div class="profile-panel">' +
          renderMedia(site.profileImage, "Portrait of " + site.name, "profile-image") +
          '<ul class="profile-contact" aria-label="Contact details">' +
            '<li><strong>' + renderLinkIcon("email") + '<span>Email</span></strong><a href="mailto:' + escapeHtml(site.email) + '">' + escapeHtml(site.email) + '</a></li>' +
            '<li><strong>' + renderLinkIcon("phone") + '<span>Phone</span></strong><a href="tel:' + escapeHtml(site.phoneLink) + '">' + escapeHtml(site.phoneDisplay) + '</a></li>' +
          '</ul>' +
          '<div class="social-links" aria-label="Academic and professional profiles">' + renderProfileLinks(site) + '</div>' +
        '</div>' +
        '<div class="bio-panel"><h1 id="home-title">' + escapeHtml(data.heading) + '</h1>' + professionalTagline +
          '<p class="research-line"><strong>Research Interest:</strong> ' + escapeHtml(data.researchInterest) + '</p>' + biography +
        '</div>' +
      '</section>' +
      '<section class="quick-grid" aria-label="Profile details">' +
        '<div class="home-section skills-section" id="technical-skills"><h2>Technical Skills</h2><ul class="skills-summary">' + skillItems + '</ul></div>' +
        '<div class="home-section" id="coursework"><h2>Relevant Coursework</h2><ul class="plain-list home-detail-list">' + coursework + '</ul></div>' +
        '<div class="home-section"><h2>Language Skills</h2><ul class="plain-list home-detail-list">' + languages + '</ul></div>' +
        '<div class="home-section full-grid-section"><h2>News</h2><ul class="news-list">' + news + '</ul></div>' +
      '</section>' + referencesMarkup +
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
        const role = entry.role
          ? '<p class="timeline-role">' + escapeHtml(entry.role) + '</p>'
          : "";
        return '<article class="timeline-item">' +
          renderMedia(entry.image, entry.title, "timeline-visual") +
          '<div class="timeline-meta"><strong>' + escapeHtml(entry.date) + '</strong><span>' + escapeHtml(entry.location) + '</span></div>' +
          '<div class="timeline-content"><h3>' + escapeHtml(entry.title) + '</h3>' + role + summary + bullets +
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
      const skills = (project.skills || project.tags || []).map(function (skill) { return '<li>' + escapeHtml(skill) + '</li>'; }).join("");
      const projectLink = renderExternalLink(project.projectUrl, "Open " + project.title + " project file", "project-external-link");
      return '<article class="project-card"' + itemId + '>' + renderProjectMedia(project.image, project.imageAlt || project.title) +
        '<div class="project-copy"><div class="project-number">' + escapeHtml(project.number) + '</div><div class="project-title-row"><h2>' + escapeHtml(project.title) + '</h2>' + projectLink + '</div><p>' + escapeHtml(project.description) + '</p><strong class="project-skills-title">Skills:</strong><ul class="project-skill-list">' + skills + '</ul></div></article>';
    }).join("");
    return renderHero(data.heading, data.intro) + '<div class="project-grid">' + projects + '</div>';
  }

  function renderLearning(data) {
    const sections = Array.isArray(data.sections) && data.sections.length
      ? data.sections
      : [{ id: "certificates", title: "Certificates", items: data.items || [] }];
    const sectionMarkup = sections.map(function (section) {
      const items = (section.items || []).map(function (item) {
        const certificateLabel = escapeHtml(item.certificateLabel || "Certificate");
        const certificateLink = item.certificateUrl
          ? '<a class="certificate-link" href="' + escapeHtml(rootUrl(item.certificateUrl)) + '" target="_blank" rel="noopener noreferrer">' + certificateLabel + '</a>'
          : '<span class="certificate-link is-pending" title="Add the Google Drive link in data/learning.json">' + certificateLabel + '</span>';
        return '<article class="learning-card">' + renderMedia(item.image, item.imageAlt || item.title) +
          '<div class="learning-copy"><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.provider) + ' · ' + escapeHtml(item.year) + '</p><div class="learning-actions"><span class="learning-status">' + escapeHtml(item.status) + '</span>' + certificateLink + '</div></div></article>';
      }).join("");
      const titleId = (section.id || "certificates") + "-title";
      return '<section class="certificate-section" id="' + escapeHtml(section.id || "certificates") + '" aria-labelledby="' + escapeHtml(titleId) + '"><h2 id="' + escapeHtml(titleId) + '" class="band-heading">' + escapeHtml(section.title) + '</h2><div class="learning-grid">' + items + '</div></section>';
    }).join("");
    return renderHero(data.heading, data.intro) + sectionMarkup;
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
      "learning.html": learning.intro || "Certifications",
      "gallery.html": gallery.intro || "Gallery",
      "blog.html": blog.intro || "Blog"
    };
    const index = (site.navigation || []).map(function (item) {
      return { title: item.label, url: item.url, detail: pageDetails[item.url] || "" };
    });

    index.push({ title: "Technical Skills", url: "index.html#technical-skills", detail: (home.technicalSkills || []).map(function (item) { return item.label + " " + item.value; }).join(" ") });
    index.push({ title: "Relevant Coursework", url: "index.html#coursework", detail: (home.coursework || []).join(" ") });
    (home.references || []).forEach(function (reference) {
      index.push({ title: reference.name, url: "index.html#references", detail: [reference.role, reference.affiliation, reference.email].filter(Boolean).join(" ") });
    });
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
      index.push({ title: project.title, url: "projects.html" + (project.id ? "#" + project.id : ""), detail: [project.description, (project.skills || project.tags || []).join(" ")].filter(Boolean).join(" ") });
    });
    const learningSections = Array.isArray(learning.sections) && learning.sections.length
      ? learning.sections
      : [{ id: "certificates", title: "Certificates", items: learning.items || [] }];
    learningSections.forEach(function (section) {
      (section.items || []).forEach(function (item) {
        index.push({ title: item.title, url: "learning.html#" + (section.id || "certificates"), detail: [section.title, item.provider, item.year, item.status].filter(Boolean).join(" ") });
      });
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
