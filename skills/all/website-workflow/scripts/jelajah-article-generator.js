#!/usr/bin/env node
/**
 * jelajah-article-generator.js
 * Generate Indonesian travel articles for the Jelajah news portal.
 * Produces realistic article data (title, excerpt, content, image, tags, etc.)
 * and pushes to the articles.php API.
 *
 * Usage: node jelajah-article-generator.js
 * Schedule (cron): 0 0,12 * * * (twice daily)
 */

const API_URL = 'https://digitalnusa.com/jelajah/api/articles.php';

const CATEGORIES = ['Destinasi', 'Makanan', 'Budaya', 'Tips Travel', 'Events', 'Hotel', 'Outdoor', 'Nightlife'];
const REGIONS = ['Bali & Nusa', 'Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Papua', 'East Nusa Tenggara'];

const AUTHORS = ['Ahmad Rizki', 'Dewi Santoso', 'Budi Prasetyo', 'Rina Wulandari', 'Fajar Nugroho', 'Anisa Putri', 'Hendra Wijaya'];

const UNSPLASH_IDS = [
    'photo-1537996194471-e657df975ab4',  // bali
    'photo-1544551763-46a013bb70d5',       // beach
    'photo-1573790387438-4da905039392',   // komodo
    'photo-1558642452-9d2a7deb7f62',       // sumatera
    'photo-1595856619766-2b7f44b4d0e3',   // sulawesi
    'photo-1516026672322-bc52d61a55d5',   // papua
    'photo-1540541338287-41700207dee6',   // java
    'photo-1552733407-5d5c46c3bb3b',       // travel
    'photo-1527495331931-4b8b6cfe6b85',   // beach generic
];

const ARTICLE_TEMPLATES = {
    'Destinasi': [
        '5 Pantai Tersembunyi di {r} yang Belum Terkenal tapi Memukau',
        'Deretan Tempat Wisata Baru di {r} yang Wajib Dikunjungi Tahun Ini',
        'Rute Perjalanan 3 Hari Menjelajahi {r} — dari Gunung hingga Pantai',
        'Mengenal Desa Wisata Tersembunyi di {r} yang Patut Dicoba',
        'Spot Sunset Terbaik di {r} — Pemandangan yang Bikin Meleleh',
        'Wisata Alam {r} yang Bakal Tren di Kalangan Traveler',
        'Gunung Terkenal di {r} untuk Pendaki Pemula dan Profesional',
        '秘境 {r}: Tempat yang Belum Banyak Dikunjungin tapi Keren',
    ],
    'Makanan': [
        '7 Kuliner Legendaris {r} yang Wajib Dicoba Sebelum Meninggal',
        'Jalan-Jalan Rasa: 5 Makanan Street Food di {r} yang Murah Meriah',
        'Dari Warung till Fine Dining: Rekomendasi Tempat Makan di {r}',
        'Food Tour 2 Hari di {r} — Makan Enak Tanpa Bikin Kantong Jebol',
        ' cafe dan Restaurant Tersembunyi di {r} yang Akan Kamu Jatuh Cinta',
        'Resep Masakan Khas {r} yang Bisa Kamu Bikin di Rumah',
    ],
    'Budaya': [
        'Tradisi Unik {r} yang Tidak Mungkin Kamu Temukan di Tempat Lain',
        'Festival Budaya Tahunan di {r} yang Ramai Dikunjungi',
        'Kerajinan Tangan {r} yang Bisa Dibawa Pulang Sebagai Suvenir',
        'Upacara Adat {r} yang Masih Dilestarikan Hingga Sekarang',
        'Sejarah dan Cerita di Balik Tari Tradisional {r}',
    ],
    'Tips Travel': [
        'Guide Lengkap: Cara Hemat Keliling {r} dengan Budget 500 Ribu',
        'Rute Travel Budget dari Jakarta ke {r} — Tips dari Traveler',
        'Yang Perlu Kamu Tahu Sebelum Berkunjung ke {r} — Guide Praktis',
        'Musim Terbaik untuk Kunjungi {r} — Panduan Perencanaan Trip',
        '10 Kesalahan yang Sering Dilakukan Traveler di {r} — Jangan Ulangi!',
    ],
    'Events': [
        'Event dan Festival yang Akan Digelar di {r} Tahun Ini',
        'Agenda Kalender Events {r} — Jangan sampai Kelewatan!',
        'Festival Musik dan seni di {r} yang wajib masuk bucket list',
        'Event Olahraga di {r} yang Bisa Kamu Ikuti Langsung',
    ],
    'Hotel': [
        'Rekomendasi Hotel Murah tapi Nyaman di {r} — Under 300 Ribu',
        '10 Pilihan Homestay di {r} dengan View Spektakuler',
        'Staycation di {r}: Resort Mewah dengan Harga Terjangkau',
        'Tips Memilih Penginapan yang Tepat di {r} Sesuai Budget',
    ],
    'Outdoor': [
        'Panduan Hiking untuk Pemula di Gunung-Gunung {r}',
        'Spot Diving dan Snorkeling Terbaik di {r}',
        'Aktivitas Outdoor Seru di {r} — Dari Rafting sampai Paralayang',
        'Peta dan Rute Trail Pendakian di {r} yang Wajib Dicoba',
    ],
    'Nightlife': [
        'Kafe dan Bar Hidden Gem di {r} untuk Hangout Malam',
        'Rekomendasi Tempat Nongkrong di {r} yang Cocok untuk Remaja',
        'Sunset Bar dan Rooftop View Terbaik di {r}',
        'Life After Dark di {r} — Apa yang Bisa Kamu Lakukan Malam Hari',
    ],
};

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateArticle() {
    const category = random(CATEGORIES);
    const region = random(REGIONS);
    const templates = ARTICLE_TEMPLATES[category];
    const title = random(templates).replace('{r}', region);
    const id = 'art_' + Math.floor(Date.now() / 1000) + '_' + Math.random().toString(36).substr(2, 6);
    const imgId = random(UNSPLASH_IDS);
    const now = new Date();
    const publishedAt = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();

    const excerpts = {
        'Destinasi': `${region} punya banyak tempat wisata yang belum banyak diketahuin. Yuk kita jelajahi!`,
        'Makanan': `Kuliner ${region} terkenal dengan cita rasa yang autentik dan harga terjangkau. Ini rekomendasinya!`,
        'Budaya': `Warisan budaya ${region} sangat kaya dan wajib dilestarikan. Ini cerita lengkapnya.`,
        'Tips Travel': `Planning trip ke ${region}? Ini tips dan panduan praktis yang bisa kamu ikutin.`,
        'Events': `Banyak event seru di ${region} yang sayang untuk dilewatkan. Cek calendriernya di sini!`,
        'Hotel': `Lagi cari penginapan di ${region} yang nyaman tapi harganya bersahabat? Ini rekomendasinya!`,
        'Outdoor': `Aktivitas outdoor di ${region} menawarkan pengalaman yang unik dan seru.`,
        'Nightlife': `Malam di ${region} punya vibe yang unik. Ini rekomendasi tempat hangout terbaik.`,
    };

    const contentTemplates = {
        'Destinasi': `<h2>Kenapa ${region} Layak Dikunjungi?</h2><p>${region} adalah destinasi yang wajib masuk bucket list traveler Indonesia. Dengan kombinasi alam yang memukau, budaya yang kaya, dan keramahan warga lokal, pengalaman menjelajah ${region} akan jadi kenangan yang tak terlupakan.</p><h2>Hal yang Perlu Disiapkan</h2><p>Sebelum berangkat, pastikan kamu sudah riset tentang cuaca dan musim terbaik untuk berkunjung. Prepare budget yang cukup untuk transportasi lokal dan akomodasi. Jangan lupa bawa sunscreen dan obat-obatan pribadi.</p><h2>Rekomendasi Spot</h2><ul><li><strong>Spot Alam</strong> — Pemandangan yang spektakuler dan instagramable</li><li><strong>Pantai Tersembunyi</strong> — Masih sepi dari tourist, cocok untuk ketenangan</li><li><strong>Pasar Tradisional</strong> — Untuk merasakan suasana autentik lokal</li><li><strong>Gunung dan perbukitan</strong> — View sunrise yang luar biasa indah</li></ul><h2>Tips dari Traveler</h2><p>Jangan ragu untuk ngobrol dengan warga lokal — mereka sering kasih tips berharga yang nggak ada di guidebook. Golden hour adalah waktu terbaik untuk fotografi.</p><h2>Kesimpulan</h2><p>${region} adalah destinasi yang cocok untuk semua jenis traveler. Dengan perencanaan yang tepat, kamu bisa mendapatkan pengalaman yang increíble tanpa harus merogoh kocek yang terlalu dalam.</p>`,
        'Makanan': `<h2>Kuliner yang Wajib Dicoba</h2><p>${region} punya scene kuliner yang sangat vibrant. Dari street food sampai fine dining, semua bisa kamu temuin dengan harga yang terjangkau.</p><h2>Rekomendasi Tempat Makan</h2><ul><li><strong>Warung Lokal</strong> — Autentik dan harga terjangkau, mulai dari 15 ribu rupiah</li><li><strong>Seafood Joint</strong> — Fresh catch langsung dari laut, cocok untuk makan malam</li><li><strong>Cafe dengan View</strong> — Kombinasikan makanan enak dengan pemandangan indah</li><li><strong>Night Market</strong> — Beragam pilihan makanan dalam satu lokasi</li></ul><h2>Tips Food Hunting</h2><p>Waktu terbaik untuk food hunting adalah saat dinner time sekitar jam 6-8 malam. Jangan malu untuk bertanya sama warga lokal tentang rekomendasi tempat makan mereka.</p>`,
        'Budaya': `<h2>Warisan Budaya yang Masih Dilestarikan</h2><p>${region} punya warisan budaya yang sangat kaya dan unik. Banyak tradisi yang masih dijaga oleh masyarakat setempat.</p><h2>Upacara dan Tradisi Utama</h2><ul><li><strong>Upacara adat</strong> — Ritual tradisional yang sudah berlangsung selama berabad-abad</li><li><strong>Tari tradisional</strong> — Pertunjukan yang menceritakan kisah dan legenda lokal</li><li><strong>Festival tahunan</strong> — Perayaan yang commemorate events penting dalam sejarah lokal</li><li><strong>Kerajinan tradisional</strong> — Pembuatan kain dan barang khas dengan teknik kuno</li></ul><h2>Bagaimana Cara Mensupport?</h2><p>Sebagai traveler, kamu bisa berkontribusi dengan menghargai tradisi lokal, tidak mengambil foto tanpa izin saat upacara sacred, dan membeli kerajinan langsung dari pengrajin untuk mendukung ekonomi mereka.</p>`,
        'Tips Travel': `<h2>Persiapan Sebelum Berkunjung</h2><p>Berikut checklist penting yang harus kamu prepare sebelum berangkat ke ${region}:</p><ul><li>Booking akomodasi setidaknya 1 minggu sebelumnya untuk dapat harga terbaik</li><li>Download offline maps — sinyal di beberapa area masih sangat terbatas</li><li>Prepare cash dalam amount yang cukup — tidak semua tempat menerima kartu</li><li>Bawa obat-obatan pribadi dan first aid kit basic</li><li>Check kondisi cuaca dan forecast sebelum departure</li></ul><h2>Budget Guide</h2><p>Untuk backpacker style, kamu bisa keliling ${region} dengan budget sekitar 200-400 ribu per hari sudah termasuk transport lokal, makan, dan akomodasi sederhana.</p>`,
        'Events': `<h2>Event yang Akan Digelar</h2><p>${region} punya kalender event yang cukup padat sepanjang tahun. Berikut beberapa event yang sangat direkomendasikan untuk disaksikan langsung.</p><h2>Tips Menghadiri Event</h2><p>Untuk mendapat spots terbaik, arrive early minimal 1 jam sebelum start. Bawa juga sunscreen, topi, dan bottle air untuk menjaga hidrasi.</p>`,
        'Hotel': `<h2>Rekomendasi Penginapan</h2><ul><li><strong>Budget Homestay</strong> — Mulai dari 100-200 ribu per malam dengan fasilitas dasar yang clean</li><li><strong>Mid-range Hotel</strong> — 300-500 ribu per malam dengan pool dan breakfast included</li><li><strong>Resort</strong> — Untuk yang mau splurge, mulai dari 800 ribu per malam</li></ul><h2>Booking Tips</h2><p>Book langsung melalui website hotel biasanya lebih murah daripada lewat agen. Check juga untuk promo dan diskon last minute.</p>`,
        'Outdoor': `<h2>Activity Outdoor di ${region}</h2><p>${region} adalah surga untuk любителей outdoor activities. Dari mendaki gunung до snorkeling, semua bisa kamu nikmati.</p><h2>Persiapan Safety</h2><p>Selalu informasikan itinerary kamu ke pihak akomodasi. Sinyal telepon bisa terbatas di beberapa area. Check juga weather forecast перед departure.</p>`,
        'Nightlife': `<h2>Suasana Malam di ${region}</h2><p>Malam di ${region} punya energi yang unik. Dari cafe yang cozy до club yang lively, semua tersedia untuk berbagai mood.</p><h2>Rekomendasi Tempat</h2><p>Untuk yang mau casual hangout, coba café-kafé dengan live music. Untuk yang mau dancing, beberapa club lokal menawarkan регулярные events с lokal DJ.</p>`,
    };

    return {
        id,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
        excerpt: excerpts[category],
        content: contentTemplates[category],
        image: `https://images.unsplash.com/${imgId}?w=1200&q=80`,
        category,
        region,
        author: random(AUTHORS),
        author_image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
        tags: [category.toLowerCase(), region.toLowerCase().replace(/\s+/g, '-'), 'indonesia', 'travel'],
        views: Math.floor(Math.random() * 2000) + 100,
        likes: Math.floor(Math.random() * 150) + 10,
        read_time: Math.floor(Math.random() * 5) + 3,
        featured: Math.random() > 0.8,
        published_at: publishedAt,
        updated_at: publishedAt,
        status: 'published'
    };
}

async function api(method, endpoint, body = null) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(API_URL + endpoint, opts);
    return await res.json();
}

async function main() {
    try {
        const article = generateArticle();
        const result = await api('POST', '', article);
        if (result.success) {
            console.log(JSON.stringify({ success: true, id: article.id, title: article.title }));
        } else {
            console.log(JSON.stringify({ success: false, error: result.error || 'Unknown error' }));
            process.exit(1);
        }
    } catch (err) {
        console.log(JSON.stringify({ success: false, error: err.message }));
        process.exit(1);
    }
}

main();
