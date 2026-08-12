import express from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const STATIC_ROOT = path.join(ROOT, 'public', 'static');
const RESUME_FILENAME = 'resume.pdf';
const RESUME_PUBLIC_PATH = path.join(STATIC_ROOT, 'uploads', RESUME_FILENAME);
const RESUME_FALLBACK_PATH = path.join(ROOT, 'assets', RESUME_FILENAME);
const RESUME_SERVE_URL = '/resume/pdf';
const RESUME_PUBLIC_URL = '/static/uploads/resume.pdf';
const RESUME_CDN_URL =
  'https://cdn.jsdelivr.net/gh/aaronkellvin/portfolio@main/assets/resume.pdf';
const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES },
});

const router = express.Router();

function getResumePath() {
  for (const resumePath of [RESUME_FALLBACK_PATH, RESUME_PUBLIC_PATH]) {
    try {
      if (fs.existsSync(resumePath) && fs.statSync(resumePath).size > 0) {
        return resumePath;
      }
    } catch {
      continue;
    }
  }
  return null;
}

function resumeIsAvailable() {
  if (getResumePath()) return true;
  return Boolean(process.env.VERCEL_ENV);
}

function resumeSizeMb() {
  const resumePath = getResumePath();
  if (!resumePath) return null;
  return Math.round((fs.statSync(resumePath).size / (1024 * 1024)) * 100) / 100;
}

router.get('/resume/meta', (_req, res) => {
  res.json({
    hasResume: resumeIsAvailable(),
    resumePublicUrl: RESUME_SERVE_URL,
    resumeStaticUrl: RESUME_PUBLIC_URL,
    resumeCdnUrl: RESUME_CDN_URL,
    resumeSizeMb: resumeSizeMb(),
  });
});

function sendResumePdf(_req, res) {
  const resumePath = getResumePath();
  if (resumePath) {
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename=resume.pdf',
      'Cache-Control': 'public, max-age=3600',
    });
    return res.send(fs.readFileSync(resumePath));
  }
  return res.redirect(307, RESUME_PUBLIC_URL);
}

router.get('/resume/pdf', sendResumePdf);
router.get('/resume/file', sendResumePdf);

router.post('/resume/upload', upload.single('resume_file'), (req, res) => {
  const file = req.file;
  if (!file?.buffer?.length) {
    return res.status(400).json({ error: 'No file selected.' });
  }
  if (!file.originalname.toLowerCase().endsWith('.pdf')) {
    return res.status(400).json({ error: 'Only PDF files are allowed.' });
  }

  try {
    fs.mkdirSync(path.dirname(RESUME_PUBLIC_PATH), { recursive: true });
    fs.mkdirSync(path.dirname(RESUME_FALLBACK_PATH), { recursive: true });
    fs.writeFileSync(RESUME_PUBLIC_PATH, file.buffer);
    fs.writeFileSync(RESUME_FALLBACK_PATH, file.buffer);
    return res.json({
      ok: true,
      saved: true,
      url: RESUME_SERVE_URL,
      staticUrl: RESUME_PUBLIC_URL,
      sizeMb: Math.round((file.buffer.length / (1024 * 1024)) * 100) / 100,
    });
  } catch {
    return res.json({
      ok: true,
      saved: false,
      message:
        'Preview is ready in your browser. Permanent hosting requires saving locally or committing the file to git.',
    });
  }
});

export default router;
