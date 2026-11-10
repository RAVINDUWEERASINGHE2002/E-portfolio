# Ravindu Lakshan Weerasinghe — Professional Portfolio

A premium, recruiter-focused, modern personal portfolio website for an IT undergraduate, aspiring DevOps engineer, and software developer.

## Features & Highlights

- **Visual Design:** Navy and light-blue theme, ambient floating gradient orbs, restrained typewriter role rotator (`DevOps Engineer`, `Software Developer`, `AI/ML Enthusiast`), staggered hero entrance animation, and `IntersectionObserver` scroll reveals.
- **Interactive 3D Tilt:** Mouse-tracking 3D tilt elevation with radial spotlight gradients across project, skill, and Colab cards.
- **Filterable Showcase:** Interactive project filtering (`All`, `DevOps`, `Software Engineering`, `AI/ML`, `Web Development`) preserving verified GitHub repositories.
- **Dedicated AI/ML & Google Colab Section:** Structured layout displaying problem statement, dataset, methodology, scientific libraries, evaluation metrics, and Colab/GitHub links.
- **Experience Timeline:** Detailed spotlight on Marketing Internship at Bank of Ceylon (Southern Province Office, March–August 2024).
- **Dual Resumes:** One-click downloads for both DevOps-focused and Software Engineering-focused CVs (`.pdf`).
- **Performance & Accessibility:** Pure lightweight HTML5, modern CSS3, and vanilla JavaScript (zero heavy dependencies). WCAG AA contrast, keyboard navigation, and full `prefers-reduced-motion` compliance.

---

## Preview Locally

You have three easy ways to run this project locally:

1. **Using npm (Recommended):**
   ```bash
   npm start
   # or
   npm run dev
   ```
   Starts a local server at `http://localhost:3000` and automatically opens your default browser.

2. **Using the batch script (Windows):**
   Double-click `start.bat` in the root folder.

3. **Directly in browser:**
   Double-click `index.html` to open it directly in any modern browser.

---

## Publish to GitHub & Deploy to Vercel

### Step 1: Repository
The project is connected to:
`https://github.com/RAVINDUWEERASINGHE2002/E-portfolio.git`

To push future updates:
```bash
git add .
git commit -m "your commit message"
git push
```

### Step 2: Deploy on Vercel
1. Go to [Vercel](https://vercel.com) and click **Add New → Project**.
2. Select and import your GitHub repository.
3. Settings:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** Leave empty / None
   - **Output Directory:** Leave empty / None
4. Click **Deploy**.
5. Once deployed, test the live URL and update your CVs accordingly.

---

## Project Structure

```
Ravindu_Portfolio_Ready_for_Vercel/
├── assets/
│   └── profile.jpg                    # Original, unedited profile photograph
├── index.html                         # Semantic HTML structure & accessible markup
├── styles.css                         # Custom responsive styles, 3D tilt & animations
├── script.js                          # Vanilla JS: typewriter, tilt, filter, scrollspy
├── server.js                          # Lightweight local development HTTP server
├── package.json                       # Project scripts (npm start, npm run dev)
├── package-lock.json                  # Lockfile
├── start.bat                          # One-click Windows launcher
├── vercel.json                        # Vercel configuration
├── .gitignore                         # Git ignore rules
├── Ravindu_DevOps_CV.pdf              # DevOps-focused Resume
├── Ravindu_Software_Engineering_CV.pdf # Software Engineering Resume
└── README.md                          # Documentation
```
