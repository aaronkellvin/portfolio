from pathlib import Path

from flask import Flask, abort, render_template, send_from_directory

app = Flask(__name__)

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_FOLDER = BASE_DIR / "static" / "uploads"
RESUME_FILENAME = "resume.pdf"
RESUME_PATH = UPLOAD_FOLDER / RESUME_FILENAME

CONTACT_EMAIL = "aaronocampo985@gmail.com"
MAILTO_LINK = f"mailto:{CONTACT_EMAIL}"
GMAIL_COMPOSE_LINK = (
    f"https://mail.google.com/mail/?view=cm&fs=1&to={CONTACT_EMAIL}"
)


def resume_exists():
    return RESUME_PATH.is_file() and RESUME_PATH.stat().st_size > 0


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
    if not resume_exists():
        return None
    return round(RESUME_PATH.stat().st_size / (1024 * 1024), 2)


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
    if not resume_exists():
        abort(404)
    return send_from_directory(UPLOAD_FOLDER, RESUME_FILENAME)


@app.route("/contact")
def contact():
    return render_template("contact.html", active_page="contact")


if __name__ == "__main__":
    app.run(debug=True)
