from flask import Flask, render_template, jsonify
from pathlib import Path

app = Flask(__name__)

BASE = Path(__file__).resolve().parent
IMG = BASE / 'static' / 'img'

GALLERY = [
    'photo_2025-10-21_18-15-17.jpg',
    'photo_2025-10-21_18-15-18.jpg',
    'photo_2025-10-21_18-15-01.jpg',
    'photo_2025-10-21_18-15-10.jpg',
    'photo_2025-10-21_18-15-12.jpg',
    'photo_2025-10-21_18-15-13.jpg',
    'photo_2025-10-21_18-15-15.jpg',
    'photo_2025-10-21_18-15-16.jpg',
]

ACHIEVEMENTS = [
    ('گواهینامه مربیگری کشتی', 'گواهینامه از فدراسیون کشتی ایران', 'photo_2025-10-21_18-13-43.jpg'),
    ('مدرک علوم بدنسازی', 'دانشگاه علوم بدنسازی UAL', 'photo_2025-10-21_18-13-47.jpg'),
    ('قهرمانی کیک‌بوکسینگ WASKO', 'جایگاه اول در مسابقات حرفه‌ای', 'photo_2025-10-21_18-13-48.jpg'),
    ('گواهینامه فنی ICHMAF', 'دوره فنی در استان البرز', 'photo_2025-10-21_18-13-52.jpg'),
    ('مدال مربیگری کشتی', 'همکاری با قهرمانان جوان', 'photo_2025-10-21_18-13-53.jpg'),
    ('گواهینامه HCCO', 'دوره تخصصی هنرهای رزمی', 'photo_2025-10-21_18-13-54.jpg'),
]

@app.route('/')
def index():
    gallery = [f for f in GALLERY if (IMG / f).is_file()]
    achievements = [a for a in ACHIEVEMENTS if (IMG / a[2]).is_file()]
    return render_template('index.html', gallery=gallery, achievements=achievements)

@app.get('/api/gallery')
def gallery_api():
    return jsonify([f'/static/img/{f}' for f in GALLERY if (IMG / f).is_file()])

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
