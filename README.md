# Md. Muhaiminul Islam — Academic Portfolio

A lightweight static academic website for PhD applications, built for GitHub Pages.

## Pages

- Home: research interests, academic biography, skills, coursework, languages, hobbies, and news.
- Research & Publications: chronological IEEE publication list and research focus.
- Education & Experience: education, RUET research experience, work experience, and volunteering.
- Awards & Achievements.
- Projects.
- Learning & Certifications.
- Gallery with captions.
- Blog, plus a reusable long-form article template at `blog/post-template.html`.
- Site-wide search from the magnifying-glass button or `/` keyboard shortcut.

## Add images

The current placeholders disappear automatically when the matching files are uploaded:

- `images/profile.jpg` — main portrait, preferably 4:5.
- `images/avatar.jpg` — square header portrait.
- `images/projects/project-01.jpg` through `project-07.jpg`.
- `images/certificates/certificate-01.jpg` through `certificate-12.jpg`.
- `images/gallery/gallery-01.jpg` through `gallery-09.jpg`.

See `images/README.md` for the same upload map.

## Final personal detail to update

The CV did not include an ORCID identifier. Replace the ORCID home-page URL in `index.html` with the full personal ORCID URL when available.

## Open, commit, and push with VS Code

The repository is already cloned, connected to GitHub, and currently uses the `master` branch.

1. Open **Visual Studio Code**.
2. Select **File → Open Folder**.
3. Open this exact folder:

   `C:\Users\Admin\Documents\ChatGPT\MINN\website`

4. If VS Code asks whether you trust the authors of the folder, confirm only after checking that the selected path is the one above.
5. Open **Source Control** from the left activity bar, or press `Ctrl+Shift+G`.
6. Review the files listed under **Changes**. Select a file to see its differences.
7. Select the `+` beside **Changes** to stage all website files.
8. Enter `Build academic portfolio website` in the commit-message box.
9. Click **Commit**.
10. Open the `…` menu in Source Control and select **Push**. You can also click **Sync Changes** if it is shown.
11. Complete the GitHub browser sign-in if VS Code requests authentication.

When the push finishes, open:

`https://github.com/mdmuhaiminulislamjamee/mdmuhaiminulislamjamee.github.io`

Then follow the **Turn on GitHub Pages** section below.

### VS Code terminal alternative

In VS Code, select **Terminal → New Terminal**, then run:

```powershell
git status
git add --all
git commit -m "Build academic portfolio website"
git push origin master
```

Because VS Code was opened directly in the `website` folder, no `cd` command should be needed.

## Open the project in GitHub Desktop

The repository is already cloned and connected to:

`https://github.com/mdmuhaiminulislamjamee/mdmuhaiminulislamjamee.github.io`

1. Open **GitHub Desktop**.
2. Select **File → Add local repository**.
3. Choose this folder:

   `C:\Users\Admin\Documents\ChatGPT\MINN\website`

4. Click **Add repository**.
5. Review the changed files in the left panel.
6. Enter a commit summary such as `Build academic portfolio website`.
7. Click **Commit to master**.
8. Click **Push origin** to upload the commit to GitHub.

After pushing, open the repository in your browser:

`https://github.com/mdmuhaiminulislamjamee/mdmuhaiminulislamjamee.github.io`

## Upload with a terminal instead

Open PowerShell in the website folder and run:

```powershell
cd "C:\Users\Admin\Documents\ChatGPT\MINN\website"
git status
git add --all
git commit -m "Build academic portfolio website"
git push origin master
```

If GitHub asks you to sign in, complete the authentication prompt and run the final `git push origin master` command again.

## Turn on GitHub Pages

This is a static site and includes `.nojekyll`, so it can be served directly without a build command.

1. Open the repository on GitHub.
2. Select **Settings**.
3. In the sidebar, select **Pages** under **Code and automation**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Select the `master` branch and the `/(root)` folder.
6. Click **Save**.
7. Wait for the Pages deployment to finish, then visit:

   `https://mdmuhaiminulislamjamee.github.io`

Future updates only require another commit and push. GitHub Pages will redeploy the changed site automatically.

## Add images later through GitHub

You can add an image in GitHub by opening its destination folder, selecting **Add file → Upload files**, uploading the correctly named image, and committing the change. The exact filenames are listed above and in `images/README.md`.

## Privacy check before publishing

The downloadable CV currently contains contact information, including a telephone number and street address. Remove or replace those details in `files/Md-Muhaiminul-Islam-CV.pdf` first if you do not want them publicly accessible.
