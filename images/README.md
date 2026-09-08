# Image upload guide

The site hides missing images and shows clean placeholders. Upload images using these exact paths to make them appear automatically:

## Upload directly with GitHub

1. Open the required folder below.
2. Select **Add file → Upload files**.
3. Upload the correctly renamed `.jpg` image.
4. Select **Commit changes** and commit to `master`.

Each folder contains its own filename-to-content map:

- [Project images](projects/)
- [Certificate images](certificates/)
- [Gallery images](gallery/)
- [Education and experience images](experience/)
- [Award images](awards/)
- [Blog images](blog/)

Upload `profile.png` and `avatar.jpg` in this `images` folder.

- `images/profile.png` — main portrait, ideally a 4:5 vertical image.
- `images/avatar.jpg` — small square header portrait.
- `images/projects/project-01.jpg` through `project-10.jpg` — featured project images.
- `images/certificates/academic-01.jpg` through `academic-06.jpg` — academic certificate images.
- `images/certificates/research-01.jpg` through `research-06.jpg` — research certificate images.
- `images/certificates/professional-01.jpg` through `professional-06.jpg` — professional certificate images.
- `images/certificates/course-workshop-01.jpg` through `course-workshop-06.jpg` — course and workshop certificate images.
- `images/gallery/gallery-01.jpg` through `gallery-09.jpg` — gallery images.
- `images/experience/education-01.jpg` through `education-03.jpg` — education images.
- `images/experience/research-01.jpg` — RUET research-experience image.
- `images/experience/work-01.jpg` through `work-08.jpg` — work-experience images.
- `images/experience/freelancing-01.jpg` through `freelancing-03.jpg` — freelancing images.
- `images/experience/volunteering-01.jpg` through `volunteering-06.jpg` — volunteering images.
- `images/awards/award-01.jpg` through `award-22.jpg` — awards and achievement images.
- `images/blog/autonomous-waste-robot.jpg` — blog listing thumbnail and article cover.

JPG, PNG, and WebP all work, but if an extension changes, update the matching image path in the relevant JSON file inside [`data`](../data/).
