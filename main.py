from pathlib import Path

from flask import Flask, redirect, render_template, send_from_directory

BASE_DIR = Path(__file__).resolve().parent
STATIC_ROOT = BASE_DIR / "public" / "static"
RESUME_FILENAME = "resume.pdf"
RESUME_CANDIDATE_PATHS = (
    BASE_DIR / "assets" / RESUME_FILENAME,
    STATIC_ROOT / "uploads" / RESUME_FILENAME,
)
RESUME_STATIC_URL = f"/static/uploads/{RESUME_FILENAME}"

app = Flask(
    __name__,
    template_folder=str(BASE_DIR / "templates"),
    static_folder=str(STATIC_ROOT),
    static_url_path="/static",
)

CONTACT_EMAIL = "aaronocampo985@gmail.com"
MAILTO_LINK = f"mailto:{CONTACT_EMAIL}"
GMAIL_COMPOSE_LINK = (
    f"https://mail.google.com/mail/?view=cm&fs=1&to={CONTACT_EMAIL}"
)


def get_resume_path():
    for path in RESUME_CANDIDATE_PATHS:
        try:
            if path.is_file() and path.stat().st_size > 0:
                return path
        except OSError:
            continue
    return None


def resume_exists():
    return get_resume_path() is not None


@app.context_processor
def inject_contact():
    return {
        "contact_email": CONTACT_EMAIL,
        "mailto_link": MAILTO_LINK,
        "gmail_compose_link": GMAIL_COMPOSE_LINK,
        "has_resume": resume_exists(),
    }


@app.route("/")
def home():
    return render_template("home.html", active_page="home")


@app.route("/skills")
def skills():
    return render_template("skills.html", active_page="skills")


@app.route("/projects")
def projects():
    return render_template("projects.html", active_page="projects")


@app.route("/experience")
def experience():
    return render_template("experience.html", active_page="experience")


@app.route("/certifications")
def certifications():
    return render_template("certifications.html", active_page="certifications")


def resume_size_mb():
    resume_path = get_resume_path()
    if not resume_path:
        return None
    return round(resume_path.stat().st_size / (1024 * 1024), 2)


@app.route("/resume")
def resume():
    return render_template(
        "resume.html",
        active_page="resume",
        resume_exists=resume_exists(),
        resume_size_mb=resume_size_mb(),
    )


@app.route("/resume/file")
def resume_file():
    resume_path = get_resume_path()
    if resume_path:
        return send_from_directory(str(resume_path.parent), resume_path.name)

    # On Vercel, files in public/ are served from the CDN, not the function filesystem.
    return redirect(RESUME_STATIC_URL, code=302)


@app.route("/contact")
def contact():
    return render_template("contact.html", active_page="contact")


if __name__ == "__main__":
    app.run(debug=True)
