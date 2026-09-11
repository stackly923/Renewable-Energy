# STACKLY Renewable Energy

A complete, image-ready, twelve-page renewable energy website built with HTML5, CSS3 and vanilla JavaScript. Chart.js is the only external JavaScript library and is used by the dashboards.

## Run

Open `dist/index.html` in a modern browser, or serve the `dist` folder with any static web server. No installation or compilation is needed. An internet connection loads Chart.js from jsDelivr; charts have a local bar-chart fallback and text data summaries when the library is unavailable.

In the downloadable website ZIP, the HTML files are at the root. Open `index.html` after extracting it.

## Pages

- Home: twenty-one sections, animated energy network and impact counters.
- About: eighteen sections, company framework, milestones and engineering principles.
- Solutions: technology tabs, seven solution families, comparison, calculator, process and FAQs.
- Projects: technology, industry and status filters plus project search and detail dialogs.
- Sustainability: roadmap, carbon methodology, ESG and resource responsibility.
- Blog: twelve full educational articles with search and category filters.
- Contact: validated and resetting demo enquiry form.
- Sign In and Register: client and administrator demo role flows.
- Client dashboard: nine distinct panels, generation and consumption charts, reports and support tickets.
- Administrator dashboard: eleven distinct panels, operations charts, client search, maintenance and messages.
- 404: accessible return and back navigation.

## Demo behavior

Enter a syntactically valid sample email and any password of at least eight characters on Sign In. Choose Energy Client or Energy Administrator. There is no secure authentication; these are intentionally accessible demonstration workspaces. Passwords are never stored.

Registration and enquiry submissions do not reach a server. Support tickets, maintenance states and message read status last only for the current dashboard page session. Display preferences use browser-local storage. Sign Out clears the demonstration role state.

All project data, portfolio metrics, roadmap milestones and testimonials are illustrative. The solar value calculator assumes all generation displaces electricity purchases and excludes costs and losses. The sample emissions factor is not represented as a current official factor.

## Editing

The deployable source is the `dist` folder. `styles.css` contains the full design system and responsive rules. `app.js` owns marketing-page interactions; `dashboard.js` owns dashboard views and interactions; `data.js` contains projects and editorial articles. `build.py` can regenerate the twelve HTML pages and data.js from the content templates, without overwriting the CSS or interaction scripts.

## Validation

All twelve HTML entrypoints, local references, anchor destinations and duplicate IDs were checked. All JavaScript files pass Node syntax checks. Home now has twenty-one sections and About has eighteen. Main text and button contrast were checked. Responsive CSS includes mobile, tablet and desktop breakpoints and reduced-motion support.

Browser visual and end-to-end checks were not run. A real authentication service, form delivery, equipment integration and verified business information would be separate production work.

## Image-ready update

Home, About, Projects, Blog and Solutions each include three additional sections: two alternating image-and-text stories and a three-card image gallery. There are 25 reserved image frames in total.

Add your photos to the page-specific subfolders inside `dist/images/`, then enter their relative paths in `dist/images.js`. The complete key-to-filename mapping is in `dist/images/README.md`. In the extracted ZIP these paths start directly with `images/` and `images.js`. Empty entries make no image requests and keep the styled placeholders visible. Images that load use `object-fit: contain` to preserve the whole image.

`image_sections.py` owns the additional content and folder guide. Running `build.py` preserves an existing `images.js` configuration.
