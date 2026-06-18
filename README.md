# Flask Portfolio

This project is a simple Flask web application that serves a portfolio page showcasing video editing and AI content creation services.

## Project Structure

```
flask-portfolio
├── app.py                # Main entry point of the Flask application
├── requirements.txt      # Lists dependencies for the project
├── .gitignore            # Specifies files and directories to ignore by Git
├── templates
│   └── portfolio.html    # HTML content for the portfolio page
├── static
│   ├── css
│   │   └── style.css     # CSS styles for the portfolio page
│   └── js
│       └── main.js       # JavaScript for interactive features
└── README.md             # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd flask-portfolio
   ```

2. **Create a virtual environment:**
   ```
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. **Install the required dependencies:**
   ```
   pip install -r requirements.txt
   ```

5. **Run the application:**
   ```
   python app.py
   ```

6. **Open your web browser and go to:**
   ```
   http://127.0.0.1:5000
   ```

## Overview

This Flask application is designed to showcase the skills and services of Kellvin Aaron Ocampo, a video editor and AI content creator. The portfolio page includes information about services offered, skills, and contact options. The design is responsive and visually appealing, making use of modern web technologies.