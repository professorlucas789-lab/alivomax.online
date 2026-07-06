# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**alivomax.online** is a minimal web presence repository. Currently, it contains basic landing page files powered by the TheMinerX platform.

**Current Status:**
- Early stage project with foundational files only
- Hosted via TheMinerX (see `index.html`)
- Repository serves as the source for the domain `alivomax.online`

## Repository Contents

```
alivomax.online/
├── README.md            # Project title
├── index.html           # Main landing page (links to theminerx.com)
└── .git/               # Git history
```

## Current Project Structure

- **`index.html`**: Single-line reference to TheMinerX platform
- **`README.md`**: Project title only

## Development Approach

### Adding New Content

When expanding this repository, consider:

1. **Static Content**: Add HTML files in root or in organized folders (`pages/`, `assets/`, etc.)
2. **Styling**: If adding custom CSS, create a `styles/` directory
3. **Scripts**: If adding JavaScript, create a `scripts/` directory
4. **Assets**: Images, icons, and media in `assets/` directory

### Git Workflow

```bash
# Create feature branches for changes
git checkout -b feature/description

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push to remote
git push -u origin feature/description
```

## Technology Decisions (Future)

When expanding this project, consider:

- **Static Site Generator** (Hugo, Jekyll, Eleventy) if content grows significantly
- **Framework** (React, Vue, Svelte) if interactivity is needed
- **Build Tool** (Webpack, Vite, Parcel) if using modern JavaScript
- **CMS** (Contentful, Sanity) if content management is required

Document any new technology stack additions in this file.

## Hosting & Deployment

Currently hosted via TheMinerX platform (referenced in `index.html`).

For future deployments:
- **Static hosting**: Vercel, Netlify, GitHub Pages
- **Server-side rendering**: Heroku, Railway, Render
- **CMS-based**: Specific to chosen CMS platform

Update deployment instructions here when infrastructure changes.

## Common Tasks

### Updating the Landing Page

1. Edit `index.html` directly or create new HTML files
2. Test locally by opening files in a browser
3. Commit changes: `git commit -m "update: landing page content"`
4. Push to development branch for review
5. Merge to main when ready

### Adding Static Assets

```bash
# Create assets directory if not exists
mkdir -p assets/images assets/css assets/js

# Add files to respective directories
# Update references in HTML files
# Commit: git commit -m "add: new assets"
```

### Version Control Best Practices

- Keep commits focused and descriptive
- Use conventional commit style: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`
- Don't commit environment-specific files or build artifacts
- Create separate branches for different features/fixes

## Future Development

### Phase 1 Ideas (When Ready)
- Expand landing page with more content sections
- Add styling (CSS) for professional appearance
- Create additional pages (about, services, contact)
- Add basic contact form or CTA buttons

### Phase 2 Ideas (Longer term)
- Add blog or news section
- Implement proper build/deployment pipeline
- Add analytics tracking
- Optimize for SEO

Document decisions and architectural changes as you expand the project.

## Code Conventions

### HTML
- Use semantic HTML5 tags
- Include meta tags for responsive design: `<meta name="viewport">`
- Always include title and description meta tags for SEO
- Properly nested and indented code

### CSS (When Added)
- Use a consistent naming convention (BEM, utility-first, etc.)
- Organize styles by component or section
- Keep specificity low to avoid conflicts

### JavaScript (When Added)
- Use consistent naming (camelCase for variables, PascalCase for classes)
- Comment complex logic
- Avoid global variables
- Use modern JavaScript (ES6+)

## Resources & References

- [HTML Best Practices](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [Web Performance](https://web.dev/performance/)
- [Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [TheMinerX Platform](https://theminerx.com)

## Questions & Next Steps

When expanding this repository:
1. Define clear project goals and scope
2. Choose technology stack based on requirements
3. Update this CLAUDE.md with new conventions and patterns
4. Commit documentation changes along with code changes
