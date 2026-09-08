# Website information editor

The files in this folder are the editable content source for the published website. You normally do not need to edit the HTML files.

| File | Information controlled |
| --- | --- |
| [`site.json`](site.json) | Name, email, phone, profile links, CV path, avatar, and navigation |
| [`home.json`](home.json) | Research interests, biography, technical skills, coursework, languages, and news |
| [`research.json`](research.json) | Publications, authors, venues, DOI links, years, and research record |
| [`experience.json`](experience.json) | Education, research experience, work experience, freelancing, and volunteering |
| [`awards.json`](awards.json) | Awards, years, organizations, and award-image paths |
| [`projects.json`](projects.json) | Project titles, descriptions, skills, and project-image paths |
| [`learning.json`](learning.json) | Certificates, providers, years, status, Drive links, and certificate-image paths |
| [`gallery.json`](gallery.json) | Gallery titles, captions, image paths, and alternative text |
| [`blog.json`](blog.json) | Blog listing, article text, dates, cover image, and DOI link |

## Edit directly on GitHub

1. Open the JSON file you want to change.
2. Select the pencil button labeled **Edit this file**.
3. Change only the required text or add a new object by following the existing pattern.
4. Select **Commit changes** and commit directly to `master`.
5. Wait a few minutes for GitHub Pages to publish the update.

## Edit locally in VS Code

1. Open the repository folder in VS Code.
2. Open the required file inside `data` and save your changes.
3. Preview through the **Live Server** extension, or run `python -m http.server 4173` in the repository terminal and open `http://localhost:4173`.
4. Commit and push the update to `master`.

## JSON rules

- Keep all field names and text inside double quotes.
- Put a comma between items, but do not add a comma after the last item in a list or object.
- JSON does not support comments.
- Keep image paths and filenames exactly matched to the files inside `images`.
- Duplicate an existing entry when adding a publication, job, award, project, certificate, or gallery item; then edit its values.
- The existing blog article and blog listing are fully editable in `blog.json`. Adding another local article page also requires a corresponding HTML article URL.

If a JSON file contains a syntax error or cannot be loaded, the website keeps displaying its built-in HTML content instead of showing a blank page.
