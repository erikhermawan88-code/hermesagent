---
name: image-analyzer
description: Analisis gambar yang dikirim via Telegram. Extract isi gambar, text (OCR), dan descriptive summary. Untuk tim Clipper Company yang perlu baca screenshot/design/image.
triggers:
  - gambar apa ini
  - tolong baca image
  - analyze image
  - baca screenshot ini
  - apa yang ada di gambar
  - tolong buatkan skill baca image
  - deskripsiin ini
  - lihatin apa yang ada di gambar
  - read this image
---

# Image Analyzer Skill

## Fungsi
Menerima input gambar (jpg/png/webp) dan mengembalikan analisis lengkap dalam Bahasa Indonesia.

## Prosedur Analisis (pilihan sesuai kebutuhan)

### Method 1: Tesseract OCR (RELIABLE — gunakan ini dulu untuk text-based images)
```bash
# Basic OCR - works on VPS, returns text directly
tesseract <image_path> stdout -l eng+ind 2>/dev/null

# Mobile screenshots (Indonesian/English mixed content)
tesseract /root/.hermes/image_cache/img_xxx.jpg stdout -l eng+ind
```
- Cocok untuk: screenshot app, ads, UI text, quote cards, dokumen
- Hasil langsung berupa text yang bisa di-read

### Method 2: Subagent Delegation (untuk visual/creative content)
```python
delegate_task(
    context="Analyze image in detail. Describe all visual elements, text, colors, layout, mood. Respond in Bahasa Indonesia.",
    goal="Use vision_analyze tool on /root/.hermes/image_cache/img_xxx.jpg. Return complete description.",
    toolsets=["vision"],
    role="leaf"
)
```
- Cocok untuk: desain aesthetic, mood board, creative content
- Subagent dapat menjalankan multiple terminal calls untuk enhance dan analyze

### Method 3: OpenCV Basic Analysis (fallback)
```python
python3 -c "
import cv2
import numpy as np
img = cv2.imread('<image_path>')
print(f'Size: {img.shape}')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
print(f'Mean brightness: {np.mean(gray):.1f}')
"
```
- Untuk info basic: dimensi, warna rata-rata, dll

## Output
Return:
- Deskripsi detail isi gambar (Bahasa Indonesia)
- Text/OCR yang terdeteksi (jika ada)
- Elemen visual penting (warna, layout, mood)
- Rekomendasi action (jika applicable)

## Tips
- Mobile screenshots biasanya 576-1280px wide, portrait orientation
- Tesseract dengan `eng+ind` language pack menangkap Bahasa Indonesia dan English
- Start dengan tesseract — lebih cepat dan hasil langsung terlihat
- Kalau tesseract kosong atau gambar visual-complex, pakai subagent delegation
- Image di-cache di `/root/.hermes/image_cache/` dengan format `img_<hash>.jpg`