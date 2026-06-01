# Broken Image Audit — 2026-05-26

## Problem 1: Product Gallery (product.html)
20 of 22 `compro-rde-eaton-*.png` files were NOT actual images — HTTP error HTML pages saved with `.png` extension. Only files 12 and 13 were valid PNGs.

## Problem 2: Homepage Products Grid (index.html #products)
The products grid on homepage used image filenames that don't exist on WordPress (compro-rde-eaton-10.png through 23.png — all broken). Section deleted entirely 2026-05-26.

Note: The **services gallery** uses different filenames (`retrofit-solutions_page_01.png` etc.) which are all valid on WordPress — those are fine.

## Diagnosis Commands
```bash
# Probe a batch of URLs for availability (BEFORE downloading)
for i in $(seq 8 29); do
  status=$(curl -s -o /dev/null -w "%{http_code}" "https://retrodayaengineering.com/wp-content/uploads/2025/06/compro-rde-eaton-${i}.png")
  echo "compro-rde-eaton-${i}.png: HTTP $status"
done

# Verify file type after download
file /var/www/retrodaya/images/products/gallery/<filename>
# PNG image data = valid
# HTML document text = BROKEN (saved error page with .png extension)

# Quick byte check
xxd -l 2 /var/www/retrodaya/images/products/gallery/<filename>
# 89 50 = PNG signature
# 3c 21 = "<!" HTML doctype start = BROKEN
```

## Lesson
WordPress sites can delete/reorganize media files. Always probe each URL with `curl -s -o /dev/null -w "%{http_code}"` BEFORE downloading. Download only HTTP 200 files.

## Fix Applied (2026-05-26)
- **product.html**: Removed 20 broken gallery-item entries; kept only compro-rde-eaton-12 and 13. Gallery: 2 Eaton Compro + 22 Compro Solutions + 27 Retrofit Solutions = 51 valid images.
- **index.html #products**: Entire section deleted (Our Products / Built to International Standards + product cards using broken filenames).
