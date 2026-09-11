# Add your website images

The website includes 25 reserved image areas across five pages. No stock images are included.

## How to add an image

1. Place a photo in the matching folder, using the suggested filename below (or your own filename).
2. Open `images.js` beside `index.html`.
3. Replace that image key’s empty string with the relative file path listed below.
4. Reload the page. A successfully loaded photo replaces its placeholder automatically.

If a configured image cannot load, its placeholder stays visible rather than showing a broken image. JPG, PNG, WebP and AVIF paths can all be used. Use your actual extension in images.js.

Split images reserve a 4:3 frame; cards use 16:10. Images use object-fit: contain so the entire photo stays visible without cropping.

| Page      | Image key                        | Suggested path                               |
| --------- | -------------------------------- | -------------------------------------------- |
| Home      | `home-solar-installation`        | `images/home/solar-installation.webp`        |
| Home      | `home-community-energy`          | `images/home/community-energy.webp`          |
| Home      | `home-solar-rooftop`             | `images/home/solar-rooftop.webp`             |
| Home      | `home-wind-landscape`            | `images/home/wind-landscape.webp`            |
| Home      | `home-battery-facility`          | `images/home/battery-facility.webp`          |
| About     | `about-engineering-team`         | `images/about/engineering-team.webp`         |
| About     | `about-site-assessment`          | `images/about/site-assessment.webp`          |
| About     | `about-design-review`            | `images/about/design-review.webp`            |
| About     | `about-safe-installation`        | `images/about/safe-installation.webp`        |
| About     | `about-operations-review`        | `images/about/operations-review.webp`        |
| Projects  | `projects-solar-project`         | `images/projects/solar-project.webp`         |
| Projects  | `projects-project-commissioning` | `images/projects/project-commissioning.webp` |
| Projects  | `projects-wind-project`          | `images/projects/wind-project.webp`          |
| Projects  | `projects-storage-project`       | `images/projects/storage-project.webp`       |
| Projects  | `projects-agricultural-project`  | `images/projects/agricultural-project.webp`  |
| Blog      | `blog-rooftop-guide`             | `images/blog/rooftop-guide.webp`             |
| Blog      | `blog-battery-guide`             | `images/blog/battery-guide.webp`             |
| Blog      | `blog-wind-guide`                | `images/blog/wind-guide.webp`                |
| Blog      | `blog-smart-grid-guide`          | `images/blog/smart-grid-guide.webp`          |
| Blog      | `blog-ev-charging-guide`         | `images/blog/ev-charging-guide.webp`         |
| Solutions | `solutions-solar-solutions`      | `images/solutions/solar-solutions.webp`      |
| Solutions | `solutions-ev-solutions`         | `images/solutions/ev-solutions.webp`         |
| Solutions | `solutions-wind-solutions`       | `images/solutions/wind-solutions.webp`       |
| Solutions | `solutions-storage-solutions`    | `images/solutions/storage-solutions.webp`    |
| Solutions | `solutions-hybrid-solutions`     | `images/solutions/hybrid-solutions.webp`     |
