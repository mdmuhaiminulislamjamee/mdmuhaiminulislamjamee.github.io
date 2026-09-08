(async function () {
  "use strict";

  if (window.portfolioContentReady) {
    await window.portfolioContentReady;
  }

  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");
  const searchDialog = document.querySelector("[data-search-dialog]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const searchButtons = document.querySelectorAll("[data-search-open]");
  const searchClose = document.querySelector("[data-search-close]");
  const basePath = document.body.dataset.base || "";

  function closeNavigation() {
    if (navigation) navigation.classList.remove("is-open");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function prepareImage(image) {
    if (image.complete) {
      image.hidden = image.naturalWidth === 0;
    } else {
      image.hidden = true;
      image.addEventListener("load", function () { image.hidden = false; });
      image.addEventListener("error", function () { image.hidden = true; });
    }
  }

  document.querySelectorAll("img").forEach(prepareImage);

  function addPlaceholderImage(item, path, className, alt) {
    const frame = document.createElement("div");
    const image = document.createElement("img");
    frame.className = "media-frame " + className;
    frame.dataset.placeholder = "Add " + path;
    image.src = basePath + path;
    image.alt = alt;
    frame.appendChild(image);
    item.insertBefore(frame, item.firstChild);
    prepareImage(image);
  }

  [
    { selector: "#education .timeline-item", prefix: "education" },
    { selector: "#research-experience .timeline-item", prefix: "research" },
    { selector: "#work-experience .timeline-item", prefix: "work" },
    { selector: "#volunteering .timeline-item", prefix: "volunteering" }
  ].forEach(function (group) {
    document.querySelectorAll(group.selector).forEach(function (item, index) {
      if (item.querySelector(".timeline-visual")) return;
      const number = String(index + 1).padStart(2, "0");
      const title = item.querySelector("h3");
      addPlaceholderImage(item, "images/experience/" + group.prefix + "-" + number + ".jpg", "timeline-visual", title ? title.textContent : "Experience image");
    });
  });

  document.querySelectorAll(".award-item").forEach(function (item, index) {
    if (item.querySelector(".award-media")) return;
    const number = String(index + 1).padStart(2, "0");
    const title = item.querySelector("h2");
    addPlaceholderImage(item, "images/awards/award-" + number + ".jpg", "award-media", title ? title.textContent : "Award image");
  });

  const navShell = document.querySelector(".nav-shell");
  const firstSearchButton = document.querySelector("[data-search-open]");
  if (navShell && firstSearchButton) {
    const themeButton = document.createElement("button");
    themeButton.type = "button";
    themeButton.className = "icon-button theme-toggle";
    themeButton.innerHTML = '<svg class="moon-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z"></path></svg><svg class="sun-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path></svg>';
    navShell.insertBefore(themeButton, firstSearchButton);

    let savedTheme = "";
    try { savedTheme = window.localStorage.getItem("portfolio-theme") || ""; } catch (error) { savedTheme = ""; }
    const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";

    function setTheme(theme) {
      document.documentElement.dataset.theme = theme;
      themeButton.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      themeButton.setAttribute("aria-pressed", String(theme === "dark"));
      themeButton.title = theme === "dark" ? "Light mode" : "Dark mode";
    }

    setTheme(initialTheme);
    themeButton.addEventListener("click", function () {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      setTheme(nextTheme);
      try { window.localStorage.setItem("portfolio-theme", nextTheme); } catch (error) { /* Preference remains active for this page. */ }
    });
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const open = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });

    const desktopNavigation = window.matchMedia("(min-width: 1025px)");
    const resetNavigationAtDesktop = function (event) {
      if (event.matches) closeNavigation();
    };
    if (desktopNavigation.addEventListener) {
      desktopNavigation.addEventListener("change", resetNavigationAtDesktop);
    } else {
      desktopNavigation.addListener(resetNavigationAtDesktop);
    }
  }

  const fallbackSearchIndex = [
    { title: "Home", url: "index.html", detail: "Biography, research interests, technical skills, coursework, languages, and news" },
    { title: "Research & Publications", url: "research.html", detail: "Published work in robotics, IoT, computer vision, intelligent systems, and communication engineering" },
    { title: "Education & Experience", url: "experience.html", detail: "Education, RUET research experience, professional work, and volunteering" },
    { title: "Awards & Achievements", url: "awards.html", detail: "National and international awards in robotics, programming, olympiads, science, and innovation" },
    { title: "Projects", url: "projects.html", detail: "Selected embedded systems, robotics, IoT, and AI projects" },
    { title: "Learning", url: "learning.html", detail: "Specializations, bootcamps, courses, workshops, and certifications" },
    { title: "Gallery", url: "gallery.html", detail: "Research, competitions, projects, outreach, and academic moments" },
    { title: "Blog", url: "blog.html", detail: "Research notes on embedded AI, robotics, computer vision, and autonomous systems" },
    { title: "From Detection to Collection", url: "blog/autonomous-waste-robot.html", detail: "Project note on the autonomous waste-management robot, SLAM, CNN detection, navigation, and embedded control" },
    { title: "Smart Waste Management Robot", url: "research.html#publication-iccitt-2024", detail: "IoT, artificial intelligence, SLAM, CNN, trash collection, and categorization" },
    { title: "AI-Based Smart Notice Board", url: "projects.html#smart-notice-board", detail: "Facial recognition, machine learning, image processing, sockets, and personalized notices" },
    { title: "Undergraduate Research Assistant at RUET", url: "experience.html#research-experience", detail: "Electronics, embedded systems, robotics, machine learning, deep learning, experiments, and publications" },
    { title: "Microsoft Office Specialist Bangladesh Championship", url: "awards.html#awards-2025", detail: "Divisional winner and finalist, 2025" },
    { title: "Technical Skills", url: "index.html#technical-skills", detail: "Programming, frameworks, electronics software, hardware, protocols, platforms, and engineering tools" },
    { title: "Relevant Coursework", url: "index.html#coursework", detail: "Electronics, communication, signal processing, control, networks, VLSI, and programming" }
  ];
  const searchIndex = Array.isArray(window.portfolioSearchIndex) && window.portfolioSearchIndex.length
    ? window.portfolioSearchIndex
    : fallbackSearchIndex;

  function escapeSearchHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderResults(query) {
    if (!searchResults) return;
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      searchResults.innerHTML = '<li class="search-hint">Start typing to search the portfolio.</li>';
      return;
    }

    const results = searchIndex.filter(function (item) {
      return (item.title + " " + item.detail).toLowerCase().includes(normalized);
    });

    if (!results.length) {
      searchResults.innerHTML = '<li class="search-hint">No matching pages or topics found.</li>';
      return;
    }

    searchResults.innerHTML = results.map(function (item) {
      return '<li><a href="' + escapeSearchHtml(basePath + item.url) + '">' + escapeSearchHtml(item.title) + '</a><p>' + escapeSearchHtml(item.detail) + '</p></li>';
    }).join("");
  }

  function openSearch() {
    if (!searchDialog) return;
    closeNavigation();
    searchDialog.classList.add("is-open");
    searchDialog.setAttribute("aria-hidden", "false");
    document.body.classList.add("search-open");
    renderResults("");
    window.setTimeout(function () { searchInput && searchInput.focus(); }, 30);
  }

  function closeSearch() {
    if (!searchDialog) return;
    searchDialog.classList.remove("is-open");
    searchDialog.setAttribute("aria-hidden", "true");
    document.body.classList.remove("search-open");
  }

  searchButtons.forEach(function (button) { button.addEventListener("click", openSearch); });
  if (searchClose) searchClose.addEventListener("click", closeSearch);
  if (searchInput) searchInput.addEventListener("input", function () { renderResults(searchInput.value); });
  if (searchDialog) {
    searchDialog.addEventListener("click", function (event) {
      if (event.target === searchDialog) closeSearch();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSearch();
      closeNavigation();
    }
    if (event.key === "/" && !document.body.classList.contains("search-open") && !/input|textarea/i.test(document.activeElement.tagName)) {
      event.preventDefault();
      openSearch();
    }
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
