from pathlib import Path
import os

from flask import Flask, Response, jsonify, redirect, render_template, request, send_from_directory

BASE_DIR = Path(__file__).resolve().parent
STATIC_ROOT = BASE_DIR / "public" / "static"
RESUME_FILENAME = "resume.pdf"
RESUME_PUBLIC_PATH = STATIC_ROOT / "uploads" / RESUME_FILENAME
RESUME_PUBLIC_URL = "/static/uploads/resume.pdf"
RESUME_SERVE_URL = "/resume/pdf"
RESUME_FALLBACK_PATH = BASE_DIR / "assets" / RESUME_FILENAME
RESUME_CDN_URL = "https://cdn.jsdelivr.net/gh/aaronkellvin/portfolio@main/assets/resume.pdf"
MAX_RESUME_BYTES = 5 * 1024 * 1024

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
    # assets/ is bundled with the Vercel Python function; public/ is CDN-only.
    for path in (RESUME_FALLBACK_PATH, RESUME_PUBLIC_PATH):
        try:
            if path.is_file() and path.stat().st_size > 0:
                return path
        except OSError:
            continue
    return None


def resume_is_available():
    if get_resume_path():
        return True
    # public/ files may exist on the CDN even when absent from the lambda filesystem.
    return bool(os.environ.get("VERCEL_ENV"))


@app.context_processor
def inject_contact():
    return {
        "contact_email": CONTACT_EMAIL,
        "mailto_link": MAILTO_LINK,
        "gmail_compose_link": GMAIL_COMPOSE_LINK,
        "has_resume": resume_is_available(),
        "resume_public_url": RESUME_SERVE_URL,
        "resume_static_url": RESUME_PUBLIC_URL,
        "resume_cdn_url": RESUME_CDN_URL,
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
    if resume_path:
        return round(resume_path.stat().st_size / (1024 * 1024), 2)
    return None


@app.route("/resume")
def resume():
    return render_template(
        "resume.html",
        active_page="resume",
        resume_exists=resume_is_available(),
        resume_public_url=RESUME_SERVE_URL,
        resume_static_url=RESUME_PUBLIC_URL,
        resume_cdn_url=RESUME_CDN_URL,
        resume_size_mb=resume_size_mb(),
    )


@app.route("/resume/pdf")
def resume_pdf():
    resume_path = get_resume_path()
    if resume_path:
        return Response(
            resume_path.read_bytes(),
            mimetype="application/pdf",
            headers={
                "Content-Disposition": "inline; filename=resume.pdf",
                "Cache-Control": "public, max-age=3600",
            },
        )

    return redirect(RESUME_PUBLIC_URL, code=307)


@app.route("/resume/file")
def resume_file():
    return resume_pdf()


@app.route("/resume/upload", methods=["POST"])
def resume_upload():
    uploaded = request.files.get("resume_file")
    if not uploaded or not uploaded.filename:
        return jsonify({"error": "No file selected."}), 400

    if not uploaded.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files are allowed."}), 400

    data = uploaded.read()
    if not data:
        return jsonify({"error": "File is empty."}), 400
    if len(data) > MAX_RESUME_BYTES:
        return jsonify({"error": "File must be 5 MB or smaller."}), 400

    try:
        RESUME_PUBLIC_PATH.parent.mkdir(parents=True, exist_ok=True)
        RESUME_PUBLIC_PATH.write_bytes(data)
        RESUME_FALLBACK_PATH.parent.mkdir(parents=True, exist_ok=True)
        RESUME_FALLBACK_PATH.write_bytes(data)
        return jsonify(
            {
                "ok": True,
                "saved": True,
                "url": RESUME_SERVE_URL,
                "static_url": RESUME_PUBLIC_URL,
                "size_mb": round(len(data) / (1024 * 1024), 2),
            }
        )
    except OSError:
        return jsonify(
            {
                "ok": True,
                "saved": False,
                "message": (
                    "Preview is ready in your browser. "
                    "Permanent hosting requires saving locally or committing the file to git."
                ),
            }
        )


@app.route("/contact")
def contact():
    return render_template("contact.html", active_page="contact")


if __name__ == "__main__":
    app.run(debug=True)
