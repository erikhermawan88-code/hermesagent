# Bumi.digital — AI Aggregator SaaS Case Study

## Apa Mereka Lakukan

Bumi.digital adalah AI generation SaaS berbayar (Indonesian market, Rp denom).
Mereka TIDAK training model sendiri — cukup集成 berbagai AI provider lewat satu unified API, lalu jual pakai sistem kredit.

**URL**: https://bumi.digital/
**Model**: Credit-based SaaS, pay-per-generation

---

## Revenue Model

### Credit Packages
| Pack | Price (Rp) | Credits | Cost/credit |
|------|-----------|---------|-------------|
| Pay-as-you-go | Rp 50.000 | 17 | Rp 2.941 |
| Small | Rp 100.000 | 40 | Rp 2.500 |
| Medium | Rp 200.000 | 90 | Rp 2.222 |
| Large | Rp 500.000 | 230 | Rp 2.173 |

### Credit Cost per Model
**Image** (大多数 model): **0.1 credits/generation**
**Video** (duration + resolution dependent): **2-12 credits**

---

## AI Provider yang Mereka Use

### Image Models (30+ models)
- Google: Imagen 3, Imagen 4 Ultra/Fast, Nano Banana 2/Pro
- Bytedance: Seedream 3/4/4.5/5.0 Lite, Dreamina 3.1
- Recraft: V4/V4.1/V4.1 Pro/V4 Pro
- OpenAI: GPT Image 1.5, GPT Image 2
- Qwen (Alibaba): Image/Image 2/Image 2 Pro
- FLUX (Black Forest Labs): 1.1 [pro] Ultra, Kontext Max/Pro
- Wan 2.7 (ByteDance-based): Image/Image Pro

### Video Models
- Happy Horse 1.0: 2 credits/sec, pricing varies by duration/resolution
- Seedance 2.0 Fast: 3 credits/sec default

---

## Core Architecture

```
User Request → Bumi.digital API → Route to Provider
                    ↓
             Deduct Credits (immediate)
                    ↓
        Queue/Async Processing + Webhook
                    ↓
           Update status → Return URL
```

### API Endpoints
```
POST /api/v1/image/generate   → Generate image
POST /api/v1/video/generate   → Generate video
POST /api/v1/audio/generate   → Generate audio
POST /api/v1/upload          → Upload reference file
GET  /api/v1/generation/{id} → Check status (async)
```

### Key Features
1. **Credit system** — User credits deducted per generation, no subscription needed
2. **Async processing** — Webhook notification when generation completes
3. **Community gallery** — Recent creations displayed publicly
4. **File upload** — Reference images/videos via `/api/v1/upload`
5. **API access** — Full REST API for developers to integrate

---

## How to Build Serupa

### Step 1 — AI Provider Integration (Recommended: Replicate)
Replicate pakai SDK Python, united interface untuk 100+ models.

```bash
pip install replicate
```

```python
import os, replicate
client = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
output = client.run("black-forest-labs/flux-1.1-pro", input={
    "prompt": "professional product photography",
    "aspect_ratio": "16:9",
    "output_format": "jpg"
})
```

**Kelebihan Replicate:**
- $50 welcome credit (500+ image generations)
- Unified API untuk FLUX, Kling, SDXL, dll
- Built-in async + webhook
- Model hosting already done

### Step 2 — Credit System Schema (PostgreSQL)
```sql
users (id, email, credits, created_at)
api_keys (id, user_id, key, name, created_at)
generations (id, user_id, model_id, status, prompt, credits_cost, result_url, created_at, completed_at)
credit_transactions (id, user_id, amount, type, generation_id, created_at)
```

### Step 3 — Payment (Indonesian)
- **Midtrans** atau **Xendit** — payment gateway lokal
- Credit top-up: buy → payment success → add credits

### Step 4 — Tech Stack
- Frontend: Next.js + Tailwind (dark theme, like Bumi.digital)
- Backend: Node.js/Fastify atau Go
- Database: PostgreSQL
- Storage: Cloudflare R2 atau AWS S3 (CDN untuk generated assets)
- Queue: Redis + worker (async job processing)
- Hosting: VPS Indonesia (Rp 100-200k/month cukup untuk MVP)

### Step 5 — Priority AI Providers
1. **Replicate** — start here ($50 free, easiest integration)
2. **Google Gemini API** — untuk Imagen/Nano Banana
3. **OpenAI API** — untuk GPT Image (min $5 top-up)
4. **ByteDance Seedream** — direct API (request access)

---

## Estimasi MVP Cost

| Component | Monthly Cost |
|-----------|-------------|
| VPS (4 core, 8GB RAM) | Rp 150.000 |
| Replicate API (pass-through) | ~Rp 0 (user pays) |
| Domain + SSL | Rp 100.000 |
| Storage (R2/S3) | ~$5 |
| **Total** | **~Rp 250.000/month** |

Time to MVP: 4-8 weeks untuk 1 engineer.

---

## Key Insight

Model Bumi.digital itu essentially **AI provider abstraction layer**:
- Mereka tidak solve AI problem (models already exist)
- Mereka solve **access + payment + simplicity** problem
- Indonesian users mau Rp500-2.000/credit — price-sensitive tapi volume-aware

Kalau mau build serupa, mulai dari Replicate + 1 model aja dulu (FLUX atau GPT Image). Jangan attempt semua models simultaneous — MVP dulu.

---

## Credit System Logic

```python
# Deduct credits immediately when request received
user = auth_api_key(api_key)
model_cost = get_model_credit_cost(model_id)

if user.credits < model_cost:
    return {"error": "insufficient credits"}, 400

deduct_credits(user.id, model_cost)
generation = save_generation(user_id=user.id, model_id=model_id, status="processing")

# Async: webhook will update status → "completed" or "failed"
# If failed → refund credits
```

Webhooks are critical karena AI generation takes time (image ~10-30s, video ~1-5 min).
