(function () {
  "use strict";

  const menuButton = document.querySelector("[data-menu-button]");
  const navigation = document.querySelector("[data-navigation]");
  const searchDialog = document.querySelector("[data-search-dialog]");
  const searchInput = document.querySelector("[data-search-input]");
  const searchResults = document.querySelector("[data-search-results]");
  const searchButtons = document.querySelectorAll("[data-search-open]");
  const searchClose = document.querySelector("[data-search-close]");
  const basePath = document.body.dataset.base || "";

  document.querySelectorAll("img").forEach(function (image) {
    if (image.complete) {
      image.hidden = image.naturalWidth === 0;
    } else {
      image.hidden = true;
      image.addEventListener("load", function () { image.hidden = false; });
      image.addEventListener("error", function () { image.hidden = true; });
    }
  });

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      const open = navigation.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }

  const searchIndex = [
    { title: "Home", url: "index.html", detail: "Biography, research interests, skills, coursework, languages, hobbies, and news" },
    { title: "Research & Publications", url: "research.html", detail: "Published work in robotics, IoT, computer vision, intelligent systems, and communication engineering" },
    { title: "Education & Experience", url: "experience.html", detail: "Education, RUET research experience, professional work, and volunteering" },
    { title: "Awards & Achievements", url: "awards.html", detail: "National and international awards in robotics, programming, olympiads, science, and innovation" },
    { title: "Projects", url: "projects.html", detail: "Selected embedded systems, robotics, IoT, and AI projects" },
    { title: "Learning", url: "learning.html", detail: "Specializations, bootcamps, courses, workshops, and certifications" },
    { title: "Gallery", url: "gallery.html", detail: "Research, competitions, projects, outreach, and academic moments" },
    { title: "Blog", url: "blog.html", detail: "Research notes on embedded AI, robotics, computer vision, and autonomous systems" },
    { title: "Smart Waste Management Robot", url: "research.html#publication-iccitt-2024", detail: "IoT, artificial intelligence, SLAM, CNN, trash collection, and categorization" },
    { title: "AI-Based Smart Notice Board", url: "projects.html#smart-notice-board", detail: "Facial recognition, machine learning, image processing, sockets, and personalized notices" },
    { title: "Undergraduate Research Assistant at RUET", url: "experience.html#research-experience", detail: "Electronics, embedded systems, robotics, machine learning, deep learning, experiments, and publications" },
    { title: "Microsoft Office Specialist Bangladesh Championship", url: "awards.html#awards-2025", detail: "Divisional winner and finalist, 2025" },
    { title: "Technical Skills", url: "index.html#technical-skills", detail: "Programming, frameworks, electronics software, hardware, protocols, platforms, and engineering tools" },
    { title: "Relevant Coursework", url: "index.html#coursework", detail: "Electronics, communication, signal processing, control, networks, VLSI, and programming" }
  ];

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
      return '<li><a href="' + basePath + item.url + '">' + item.title + '</a><p>' + item.detail + '</p></li>';
    }).join("");
  }

  function openSearch() {
    if (!searchDialog) return;
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
      if (navigation) navigation.classList.remove("is-open");
      if (menuButton) menuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
    if (event.key === "/" && !document.body.classList.contains("search-open") && !/input|textarea/i.test(document.activeElement.tagName)) {
      event.preventDefault();
      openSearch();
    }
  });

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
