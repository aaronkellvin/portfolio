Place your resume PDF here as: resume.pdf

Full paths in this project:
  public/static/uploads/resume.pdf   (served by Vercel CDN)
  assets/resume.pdf                  (bundled with the Python function)

Keep both files in sync. After adding or updating:
  1. Copy the same PDF to both paths above
  2. Commit and push to GitHub
  3. Wait for Vercel to redeploy

The resume is loaded from:
  /resume/pdf                        (Flask, works on Vercel via assets/)
  /static/uploads/resume.pdf         (CDN fallback)
