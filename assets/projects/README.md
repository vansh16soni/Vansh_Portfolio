# Project Screenshots & Media Assets

Place your high-resolution project screenshots in this folder:

- `repocity.png` (or `.jpg` / `.webp`) — Screenshot for **Repo City** (3D Codebase Visualization)
- `gyanai.png` — Screenshot for **GYAN.AI** (Knowledge Platform & React Flow graphs)
- `shadowplay.png` — Screenshot for **ShadowPlay** (Hand gesture & shadow studio)
- `netsage.png` — Screenshot for **NetSage AI** (Cisco Network Troubleshooting Assistant)

### How the Website Handles Screenshots:
In `index.html`, inside each `.project-screenshot-frame`:
When you add your actual screenshot, replace the `.editorial-blueprint-placeholder` block with an image tag:
```html
<img src="assets/projects/repocity.png" alt="Repo City 3D Interface" class="project-img-cover">
```

Or leave the blueprint placeholder active as an architectural drawing until your screenshots are ready!
