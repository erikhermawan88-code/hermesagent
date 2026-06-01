---
name: iran-us-news-monitor
description: Use when monitoring Iran-US ceasefire/truce/nuclear talks news for real-time updates. Checks Iran International, Al Jazeera, BBC, Reuters for new developments and reports only genuinely new information in Bahasa Indonesia.
version: 2.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [research, news, geopolitics, iran, monitoring]
    related_skills: [blogwatcher]
---

# Iran-US News Monitor

## Overview
Real-time monitoring Iran-US ceasefire/truce/nuclear talks. Cek multiple sumber, deduplicate vs summary sebelumnya, report only genuinely new info ke Erik dalam format concis + Bahasa Indonesia + kesimpulan implications.

## When to Use
- Erik request news monitoring Iran-US situation
- Cron job trigger untuk scheduled news check
- Tracking Trump approval status on MoU/truce

## Sources to Check (Priority Order)

| Priority | Source | URL | Notes |
|----------|--------|-----|-------|
| 1 | **Iran International** | https://www.iranintl.com/en | LIVE updates, most comprehensive |
| 2 | **Al Jazeera** | https://www.aljazeera.com | Middle East liveblog — use landing page, NOT date-article URLs (they 404) |
| 3 | **BBC News** | https://www.bbc.com/news/world/middle_east | UK perspective |
4. **ABC News** | https://abcnews.go.com/International | US perspective — live updates section shows video thumbnails; clicking the article title/heading may not navigate to a readable page. Treat listing headlines + timestamps as the signal. Video thumbnails with "13 hours ago" etc. are live update entries — note the headline and time, actual article content may be inaccessible.
| 5 | **Reuters** | https://www.reuters.com/world/middle-east | Bot detection wall — skip or use textise dot iitty |

## Task Steps

1. Navigate ke Iran International — check LIVE section for latest headlines
2. Navigate ke Al Jazeera — check Middle East liveblog newest updates
3. Navigate ke BBC — check Iran live coverage
4. Extract: headline, source, timestamp, key facts
5. Compare dengan previous summary — only report NEW developments
6. Format output ( Bahasa Indonesia + kesimpulan)
7. Deliver to origin (current topic/thread)

## Output Format (Bahasa Indonesia)

```
📡 Iran-US News Update | [TIMESTAMP]

📰 JUDUL BERITA: [judul — angle newssnya, bukan copy paste judul artikel. Contoh: "Trump Belum Setuju, Tapi Vance Bilang 'Very Close'" bukan "US and Iran very close to deal but not there yet Vance says"]
📍 SUMBER: [nama sumber + waktu lalu]

PERKEMBANGAN TERBARU:
- [poin baru 1 - hanya jika memang baru]
- [poin baru 2]

STATUS SAAT INI:
[Trump approved ✅ / Belum approve ❌ / Escalation 🔴 / Negotiating ⏳]

📌 KESIMPULAN:
[Jelaskan apa arti perkembangan ini — positif, negatif, atau netral.
Konteks singkat musti ada setiap kali.]

LINK: [URL sumber]
```

## RULES (Bahasa Indonesia)

- **Bahasa Indonesia** throughout — all output dalam Bahasa Indonesia
- **Kesimpulan WAJIB ada** setiap kali — even if brief. Erik perlu understand implications, bukan cuma facts
- Only report **genuinely NEW** information — tidak ulangi kecuali ada update nyata
- If no significant new developments → tetap laporkan status terkini + kesimpulan singkat
- Terse format — no fluff, Erik hates over-explaining
- **Headline angle** — headline harus menggambarkan sudut berita baru, bukan copy paste judul artikel verbatim. Contoh baik: "Trump Belum Setuju, Tapi Vance Bilang 'Very Close'" — contoh buruk: "US and Iran very close to deal but not there yet Vance says"

## Key Events to Track

- **Trump "final determination" phrasing** — when Trump uses specific phrasing like "will make a final determination" in a public statement (not just silent exit from Situation Room), this signals approach to decision time. Compare: silent exit without announcement = possible no; public "final determination" = decision imminent. Track the difference.
- **Trump approval** of MoU/truce extension
- **Trump Situation Room speed** — fast announcement = likely approved; slow/loud silence = possible rejection
- **Ceasefire breach / Iran missile strikes** — Iran fires Fateh-110 ballistic missile at Kuwaiti Ali Al Salem air base (30 Mei 2026) — 5 Americans injured minor, 1 MQ-9 Reaper destroyed, 1 seriously damaged. Ceasefire violation, add complexity to ongoing negotiations.
- **US depleted munitions stocks** (Bloomberg, 30 Mei 2026) — US war with Iran has depleted JASSM-ER, Tomahawk cruise missiles, THAAD, Patriot PAC-3, SM-3 Block IIA air defense missiles. 14 Americans killed, 409 injured in Operation Epic Fury. This explains US urgency to reach a deal — stocks running low.
- **Ceasefire breach** incidents (missile fired, attacks)
- **New negotiating progress** (draft deal, agreements reached)
- **Iran internal disputes** (Khamenei approval, parliamentary opposition)
- **IRGC Fars News rebuttals** — IRGC-affiliated outlet = distinct hardliner opposition signal, treat as new info
- **Iran state TV pundit insider rebuttals** — when a state TV commentator who accompanied the negotiating team (e.g. Mehdi Khanalizadeh) publicly contradicts Trump claims, this signals the deal violates Khamenei's terms. Distinct from IRGC Fars News (separate faction). Treat as new info.
- **Foreign Ministry spokesman statements** — Baghaei/Hamid=Reza => official government position, different from negotiating team or hardliners. Track separately.
- **FM Baghaei vs Ghalibaf internal gap** — Baghaei (official government/FM spokesman) regularly takes a harder public line than Ghalibaf (head of negotiating team). Baghaei's statements represent official government posture; Ghalibaf's represent the diplomatic negotiating channel. When they diverge, Iran is running layered pressure: negotiating team to media for deal progress signal, FM official for domestic/parliamentary consumption. Example (1 Juni 2026): Baghaei said Lebanon is "inseparable" from any final agreement and accused US of "constantly changing views" — harder than Ghalibaf's tone. Flag when Baghaei and Ghalibaf statements diverge in tone or substance.
- **FM Baghaei vs Trump "final determination" gap** — when Trump publicly signals imminent decision ("final determination") but Baghaei says "no final agreement" on the same day, this is a deliberate layered Iran signal. FM spokesman represents official government position, distinct from Ghalibaf's negotiating tone. The gap = Iran may be positioning for leverage before Trump finalizes.
- **Hegseth "more than capable" resuming war** — Pentagon chief Pete Hegseth, at Shangri-La Dialogue security summit in Singapore (29 Mei 2026), publicly stated US has "more than sufficient stockpiles" and is "more than capable" of resuming war with Iran if necessary. This is an escalation signal via military leverage, distinct from diplomatic messaging. Track when Hegseth or other senior military officials make capability statements — these serve as pressure leverage, not just posturing.
- **Trump "walking back" demands, "one step at a time"** (Al Jazeera, 31 Mei 2026) — Trump mulai turunkan retorika maksimalis soal timing dan sequence. Alih-alih insiste simultaneous lifting Hormuz + blockade removal, dia sekarang bilang approach secara bertahap. Ini bisa dibaca sebagai fleksibilitas genuine — atau sebagai weakness signal bahwa leverage AS menyusut. Track sebagai perubahan tone baru, bukan cuma spin.
- **Rubio/Vance public statements** — when senior US officials speak publicly on Iran, treat as new signal even without full article
- **Trump "end it a different way"** (NEW, 31 Mei 2026) — Trump threatens "If we don't get what we want, we'll end it a different way." Escalation language, ultimatum baru — bukan retorika deal-making biasa. Signals prep for failure atau escalate jika deal tidak sesuai keinginan Trump. Bandingkan dengan "final determination" phrasing yang signals decision imminent.
- **Trump "no hurry" to reach deal** (NEW, 31 Mei 2026) — Trump tells reporters dia tidak buru-buru. Perubahan tone signifikan dari "final determination" ke "no hurry" — bisa berarti leverage AS menyusut, atau dia sedang give diplomatic space, atau sinyal untuk Iran bahwa waktu tidak berpihak ke Tehran.
- **Trump rejects CNN report — denial ≠ rejection signal** (Iran International, 01:28 UTC 1 Juni 2026) — Trump publicly denied CNN claim that Iran deal was already reached. Key interpretive rule: **public rejection of a media claim is NOT the same as making an announcement of rejection.** If Trump were preparing to say no, he would issue his own announcement. Denial of a premature story = Trump still engaged and negotiating. This is a distinct signal from silent exit or announcement of no. Track when Trump explicitly rejects a claim vs. when he makes his own statement about the deal status.
- **Trump claims Iran agreed "not to develop OR purchase" nuclear weapons** (31 Mei 2026) — Trump said Iran agreed to a broader formulation: "not to develop OR in any way purchase a military nuclear weapon." Ini lebih dari sekadar tidak mengembangkan — mencakup juga tidak membeli. Iran belum merespons klaim ini secara langsung. Track sebagai potensi gerakan di nuclear terms, bukan klaim resmi Iran.
- **US military disable kapal lagi** — AP melaporkan militer AS sudah hentikan kapal lain yang coba masuk pelabuhan Iran apesar blockade. Total 6 kapal udah dihentikan. Tekanan militer berlanjut bersamaan dengan diplomasi.
- **Iran MP spox: "US faces our diplomats or our missiles"** (Iran International, 20:57 GMT+1 31 Mei) — Ebrahim Rezaei (parliament national security committee) stated Iran has not given "any commitment regarding the nuclear issue" to the US. Directly contradicts Trump's claim that Iran agreed "not to develop OR purchase" nuclear weapons. Signals Iran parliament position is harder than Ghalibaf's negotiating tone — track as separate layer.

- **Iran submit new amendments to draft MoU** (Tasnim/IRGC, 20:23 GMT+1 31 Mei) — "exchange of texts is continuing, Iran will naturally apply its own amendments. Nothing has been finalized yet." Tehran fully prepared if no agreement is reached. Tasnim = IRGC-affiliated → hardliner opposition signal, distinct from Ghalibaf's tone.

- **Trump seeks changes to deal — Hormuz + enriched uranium removal** (BBC, ~05:40 UTC 1 Juni) — Trump requesting changes related to Strait of Hormuz and removal of highly enriched uranium. Signals draft is NOT ready for his signature — re-negotiating, not just weighing approval. VP Vance: "very close but not there yet." Rubio: "hopefully we can pull it off."

- **Morgan Ortagus: military pressure boosted Iran talks leverage** (Fox News, 20:47 GMT+1 31 Mei) — Former deputy special presidential envoy says Trump's military action gave US negotiators "unprecedented leverage." Supports US military pressure as working, not just diplomatic.
- **IRGC says shot down US MQ-1 drone** (NEW, 31 Mei 2026) — IRGC klaim menembak jatuh drone MQ-1 di wilayah perairan Iran. Kedua kalinya IRGC tembak jatuh drone AS sejak gencatan senjata. Sinyal Iran tidak takut escalation meski negosiasi berjalan — military pressure continues alongside diplomacy.
- **Rubio announces Tom Barrack resigning from Syria post** — Trump envoy for Syria stepping down; US diplomatic reshuffle signal in the region as Iran deal negotiations continue. Signals US may be reallocating diplomatic attention/resources — affects deal timeline.
- **Hormuz strait status** (reopening, shipping updates)
- **US unverified Hormuz mine claims** — US has NOT confirmed Iran placed mines in Hormuz (NBC, 30 May 2026). The blockade may be based on unverified claims. Flag this when reporting US credibility.
- **Iran parliament legislating Hormuz control** — Iranian parliament moves to advance legislation fordomestic legitimacy over Strait of Hormuz management — new negotiating posture distinct from ceasefire terms; adds legal layer to Iran's negotiating position (observed 30 Mei 2026)
- **Hegseth contradicts Trump on blockade status** — Menhan AS states US blockade "still in place" even as Trump claims it will lift. This US internal narrative gap = pressure signal or coordination problem. Track whenever Hegseth or military officials contradict Trump's diplomatic claims.
- **Khamenei adviser direct blame** — Khamenei adviser publicly states Trump's blockade proves US does not want talks — direct, high-level signal from Khamenei's inner circle (distinct from IRGC Fars News, distinct from FM spokesman)
- **Ships turning off trackers to slip through Hormuz** (WSJ) — commercial vessels disabling AIS to avoid US/IRGC detection = smuggling lanes active, official shipping disrupted. Shows Hormuz situation is chaotic, not just diplomatic.
- **Iran Hormuz toll system targeting Saudi-China oil trade** — Iran implementing managed-access regime with exemptions for India/Iraq/Pakistan, tolls for Chinese-linked operators. Shows Iran is extracting economic value from Hormuz control independent of US blockade — negotiating leverage.
- **Hardline MP directly warns Ghalibaf** — MP Rasaee publicly tells Ghalibaf not to trust US talks, referencing Ghalibaf's earlier conditions (ceasefire Lebanon + frozen assets return). Parliamentary pressure on negotiating team escalating — watch for public break between Ghalibaf and parliament.
- **Hardline MP sparks backlash over post seen as swipe at Mojtaba Khamenei** (NEW, 31 Mei 2026) — Hamid Rasaee published a social media post many interpreted as an indirect swipe at Mojtaba Khamenei, drawing sharp criticism from supporters of the Islamic Republic. NEW internal Iranian political fracture signal — distinct from parliamentary pressure on Ghalibaf (Rasaee was already the MP warning Ghalibaf; this is a separate incident involving Mojtaba, Khamenei's son). Signals regime inner circle tension under negotiating pressure.
- **Pezeshkian resignation letter details** (UPDATED, 1 Juni 2026) — the letter explicitly states president and government "effectively excluded from major and vital decision-making processes" and that "vacuum created by this situation has enabled hardline factions within the IRGC to take control of affairs." This is not just political disagreement — it's an explicit claim of IRGC seizure of government functions. Decision on acceptance sits with **Mojtaba Khamenei** (not Khamenei senior) — power has shifted to Khamenei's son. If accepted: IRGC controls government; if rejected: constitutional crisis deepens. Either way, negotiating authority becomes more centralized. Track Mojtaba's decision as the key inflection point for Iran's governance structure.
- **BBC confirms: "US and Iran agreed framework of a deal"** (1 Juni 2026) — US officials confirmed to BBC that the framework has been agreed, pending Trump's approval. Confirms draft MoU exists; Trump hasn't signed. Different framing from "re-negociating" to "waiting for approval" — but Trump still hasn't approved and is simultaneously sending tougher terms. Track when officials confirm framework agreement vs Trump's actual approval.
- **Israel seizes Beaufort Castle (12th century) beyond Litani River** — IDF advance beyond Litani to the outskirts of Lebanon's southern cities, seized a historic castle. Netanyahu calls it a "decisive shift." Fresh development (BBC: "1 hr ago") — confirmed very recent. Adds another layer to Lebanon escalation, distinct from the initial Litani crossing announcement.
- **Israel crosses Litani River** — Netanyahu says Israeli forces have crossed Lebanon's Litani River (Al Jazeera, 29 Mei 2026) — escalation deepens Lebanon theater, complicates overall ceasefire architecture
- **Israel forces reach Nabatieh** — IDF has advanced beyond the Litani River to the outskirts of Lebanon's Nabatieh, one of southern Lebanon's biggest cities (Al Jazeera, 30 Mei 2026) — this is a distinct escalation from the initial Litani crossing announcement; signals Israel is consolidating control deeper in Lebanon, not just crossing a geographic line. Adds another layer to the multi-theater complexity.
- **Iran internal hardliner mobilization** — nightly rallies evolved from Khamenei mourning ceremonies into organized anti-negotiation political events; MPs directly warn Ghalibaf not to trust US; distinct from Fars News (media) and state TV (editorial) — this is street-level and parliamentary pressure on the negotiating team
- **Iran resumes hijab patrols post-ceasefire** — messages to Iran International point to renewed security/social pressure in several cities after ceasefire prospects improved; domestic repression signal post-deal
- **Iran executes / sentences more activists** — Benyamin Naqdi (kickboxing champion, Iranian martial arts champion) sentenced to death for protest-related charges ("corruption on earth") — his lawyer Mostafa Nili confirmed. At least 7 athletes/activists sentenced to death since January protests. Signals escalating domestic repression as ceasefire prospects improve — regime uses crackdown to maintain hardline leverage during negotiations.
- **Iran internet restoration internal rift** — partial restoration after ~3 months blackout opened fight inside ruling system; hardliners accusing Pezeshkian government of bypassing security institutions; signals internal instability under pressure
- **UN adds Israel to sexual violence blacklist** — UN first time adding Israel; also Russia added; signals international legal pressure on Israel, distinct from ceasefire violation tracking
- **Egypt warns Israel about Gaza escalation threatening ceasefire** (UPDATED) — Cairo publicly warned that dangerous escalations in Gaza threaten the ceasefire framework. Mediator regional stepped up concern — signals Israel destabilizing broader ceasefire architecture. This is a new concrete diplomatic signal from a key regional mediator.
- **US Congress advances American-Israeli military integration plan** (NEW, 30 Mei 2026) — provision in 2027 US defense bill could bind the two countries' weapons industries closer than ever. Not directly about Iran but about US-Israel military alignment and Israel's influence over US Middle East policy. Relevant to Trump's decisions on Iran deal given Israel's strong interest in outcome.
- **EU weighs freeze on Russian oil price cap amid Iran war (Bloomberg)** (NEW, 31 Mei 2026) — UE sedang mempertimbangkan freeze on Russian oil price cap sebagai bagian dari tekanan terkait perang Iran. Berimplikasi ke sanksi Rusia juga, bukan hanya Iran.
- **Blast near Iran's Qeshm Island (Mehr News)** (NEW, 31 Mei 2026) — Ledakan terdengar near Qeshm Island. Sumber belum jelas — bisa operasi militer, insiden分开, atau sabotase. Track untuk follow-up.
- **Iran restores output at three South Pars gas platforms** (NEW, 31 Mei 2026) — Iran berhasil restore output di tiga platform gas South Pars. Recovery ekonomi独立 dari negosiasi AS — sinyal Iran confident bisa survive tanpa deal.
- **Workers, retirees protest in southwest Iran over wages** (NEW, 31 Mei 2026) — Protes ekonomi domestic terus berlangsung di Iran southwestern. Perang depleting economy, rakyat suffer. Domestic pressure on regime bukan sinyal langsung ke nego tapi menunjukkan cost of war.
- **Iran steps up repression — seizure of assets75 people** (NEW, 31 Mei 2026) — otoritas Iran seize assets75 orang dengan tuduhan "working with hostile media" (Mizan News, Sunday). Represi domestic meningkat seiring negosiasi berlanjut — regime jaga leverage dalam nego dengan suppress dissent. Signals regime worried about popular opinion on deal.
- **Qatar says Hormuz temporary charges "negotiable"** (NEW, 30 Mei 2026) — Qatar现在开始 signaling flexibility on the temporary charges for Strait of Hormuz access. Unlike the earlier hard rejection of $12B cash, this new angle suggests an intermediate deal structure being built. Track as evidence of Qatar working as mediator toward a compromise framework, not just obstruction.
- **Economic bodies fuel warning** — World Bank/IMF/IEA joint warning about fuel security risks if Hormuz disruption continues — pressure from international economic institutions, signals global oil inventory depleting at record pace

## MoU Framework Terms (Known as of 29 May 2026)

When reporting on draft deal terms, include these key points if confirmed. NOTE: Iran and US give conflicting accounts — flag discrepancies:

**US claims (per Trump via Truth Social):**
- 60-day ceasefire extension
- Unrestricted passage through Strait of Hormuz (simultaneous with US lifting blockade)
- Iran has 30 days to remove mines from the strait
- US lifts naval blockade proportional to shipping restoration
- Sanction waivers to allow Iran to resume oil sales
- Iran agrees to never obtaining a nuclear weapon
- Iran will dismantle/remove its nuclear material
- US will "unearth and destroy" Iran's enriched uranium (latest Trump claim, 29 Mei 2026)

**Iran claims (per IRGC/Fars News — "mix of truth and lies" per Iranian sources):**
- $12 billion in frozen Iranian assets must be paid FIRST before any next phase
- Hormuz reopening comes AFTER US lifts blockade, based on Iran's own arrangements (monitoring, inspections, security) — NOT unconditional or simultaneous
- No clause for dismantling nuclear material exists in the memorandum
- Full ceasefire in Lebanon in line with Hezbollah's position is a key issue
- Nuclear terms remain unresolved — enrichment is the sticking point
- Trump still needs to approve — decision imminent

**Qatar $12 billion outcome (UPDATED 30 May 2026 — NEW):**
- Iran demanded unrestricted release of $12 billion in CASH upon signing MoU
- Qatar REJECTED the cash demand — offered only ~$6 billion as **credit for purchasing essential goods directly from Qatar only**, not liquid cash
- Iran CANNOT use the funds freely — cannot pay delayed salaries, buy military equipment, or transfer capital at its own discretion
- US opposed direct cash release — concerned it would give Iran "economic breathing room" for military spending
- All parties agreed to keep this financial dispute confidential to avoid derailing broader framework talks
- **This is a new concrete obstacle** — Iran came to the table expecting liquid cash, left with only a restricted credit line. Unless Iran accepts this condition, the financial issue remains a deal-breaker.

**US/NBC unconfirmed Hormuz mines (UPDATED 30 May 2026 — NEW):**
- US has NOT confirmed that Iran actually placed mines in the Strait of Hormuz (per NBC reporting)
- This contradicts earlier Pentagon/administration claims that Iran laid mines — possible US leverage/excuse for blockade
- When US claims about Iranian actions remain unverified, treat as potential overstated narrative — flag accordingly

**Iran state TV rebuttal (29 Mei 2026):**
- "Wishful thinking" — Trump said US will retrieve and destroy Iran's enriched uranium. Iran state TV says this reflects Trump's own wishful thinking, not any Tehran decision or commitment.

**Third-party nuclear storage (active diplomacy):**
- Kazakhstan signal willingness to hold Iran's enriched uranium (Rafael Grossi, IAEA chief, 29 Mei 2026) — this is a concrete diplomatic working track, not just US/Iran binary negotiation.

- **Iran missile hits Kurdish dissident base near Erbil** (Rudaw, BREAKING, 31 Mei 2026) — Tehran menembakkan rudal ke markas kelompok dissiden Kurdi di dekat Erbil, Irak utara. Insiden terpisah dari F-110 ke Kuwait (28 Mei) — ini target dissiden, bukan pangkalan AS. Menambahkan kompleksitas geografis baru ke pattern escalation Iran.
- **Iran tembak rudal ke markas Kurdish Irak utara — pattern escalation baru** (01:53 UTC 1 Juni, Iran International) — Iranian Kurdish groups melaporkan Iran menembakkan rudal ke dekat Erbil. Pattern Iran: Fateh-110 ke Kuwait (28 Mei) + Kurdish markas Irak utara. Bukan target AS langsung tapi shows Iran continues military operations outside direct US engagement even as negotiations continue. Setiap rudal = sinyal Iran prep for failure juga, bukan cuma prep for deal.
- **Trump rejects CNN report claiming Iran deal already reached** (01:28 UTC 1 Juni, Iran International LIVE) — Trump publicly denied CNN claimed deal was already done. Important distinction: public rejection of "deal done" narrative ≠ silent exit (which = possible no). Trump saying "that's not true" = still negotiating, holding position, not preparing to say no. Kalau Trump mau bilang tidak, dia akan buat announcement tegas — denial of a claim is different from making a claim yourself.
- **Iranian naval mine spotted near Oman in Hormuz** (19:50 GMT+1 31 Mei) — 300kg Maham-3 anti-shipping sea mine terlihat di southern Strait of Hormuz near Oman coast. IRGC-affiliated Sabereen News posted video. This is a visual confirmation of mines in the waterway, distinct from US unverified claims. New escalation indicator — mine could trigger accidental engagement even if neither side wants war.
- **Iran digs out underground missile sites after US/Israel strikes** (CNN, 31 Mei 2026) — Iran mulai gali kembali situs rudal bawah tanahnya yang kena strikes. Signal Tehran prep untuk conflict resumed — tidak percaya deal akan hold. Same day报道 BESENT enforce deal secara militer+ekonomi.
- **Bessent: Trump would enforce Iran deal militarily, economically** (Fox News, 31 Mei 2026) — Menkeu AS Scott Bessent bilang Trump akan enforce deal Iran secara militer dan ekonomi. Even if deal signed, US military presence di Gulf tetap jadi leverage enforcement.
- **Trump sends tougher terms to Iran for peace framework** (NYT, Iran International, 31 Mei 2026) — Trump mengirim terms yang lebih keras. Draft MoU yang ada dianggap belum cukup untuk signature. Confirm explicit: Trump sedang re-negociate, bukan sekadar menimbang approve.
- **28 vessels crossed Hormuz in 24 hours under IRGC permits** (IRGC Navy, 31 Mei 2026) — Including oil tankers, container ships, commercial vessels. Bukti corridor terbatas sudah beroperasi di bawah IRGC coordination, tapi volume masih sangat kecil dibanding sebelum perang.
- **France requests UN Security Council emergency meeting on Lebanon** (31 Mei 2026) — Paris response to Israel escalation beyond Litani River + seized Beaufort Castle. Eropa step up diplomatic pressure di tengah stalled Iran-US negotiations.
- **Israel seized Beaufort Castle (12th century) beyond Litani River** (Al Jazeera, 31 Mei 2026) — IDF advance beyond Litani ke wilayah Lebanon selatan, seized castle bersejarah. Menambah layer Lebanon escalation beyond initial Litani crossing.
- **Israel airstrikes devastate Lebanon's Tyre** (Al Jazeera, 31 Mei 2026) — Serangan udara Israel hancurkan Tyre, Lebanon selatan. Satellite imagery show southern Gaza erasure — Israel expand control beyond 70% already announced.

## Common Pitfalls

1. **Reporting old news as new** — always compare timestamps, only fresh developments
2. **Too many sources** — stick to priority 1-3, don't overwhelm
3. **Long explanations** — Erik wants terse, action-oriented output
4. **No kesimpulan** — kesimpulan is required every time
5. **No delivery** — always deliver to origin (current chat/topic)
6. **Al Jazeera 404s on dated article URLs** — even when a headline is visible in the live listing, `/news/2026/05/29/...` URLs return 404. Read the landing page live updates list; click article links from there. If a clicked link 404s, check the "Explore more" section on the 404 page — it often has working links to the same stories.
7. **BBC /live/ path 404s** — use `/news/world/middle_east` not the live path.
8. **BBC article links from listing pages can 404** — even when a headline appears in the listing, the article may return 404. Workaround: navigate back to the listing page and try a different article, or go direct to the section landing page.
9. **Reuters bot wall** — typically shows a device verification page. Skip Reuters or note it as unreadable.
10. **VP Vance statements are trackable signals** — when Vance or Rubio speaks publicly on Iran, include even if no full article exists yet.
- **Headline verbatim trap** — never copy article title as headline; rephrase with the key angle.
- **Shangri-La Dialogue venue signal** — when senior US military officials (Hegseth, Milley, etc.) speak at the Shangri-La Dialogue in Singapore, treat capability statements ("more than capable of resuming war") as deliberate public pressure signal, distinct from diplomatic channels. Note the venue context when reporting.
12. **Iran International Summary blocks** — the LIVE section "Summary" block click does NOT navigate to a new page. Clicking it was tested and the content stayed the same. Treat the visible summary text as the signal; do not rely on it as a navigation mechanism to reach a detail page. Workaround: note the summary content as shown, or navigate back to homepage and try a different article link.
- **Iran International LIVE article link navigation may not work as expected** — when clicking LIVE section article links (e.g. "Oman warns ships after suspected mine") from the listing page, the click may register but the page does not navigate to a new URL — it stays on the same page. Workaround: click the link, then use browser_snapshot to see if the content changed. If the content is the same, navigate back to the homepage with `browser_navigate("https://www.iranintl.com/en")` and try again. The LIVE section updates dynamically — "updated X minutes ago" vs "X minutes ago" indicates fresh content.
- **Click + snapshot is the only reliable navigation verification for Iran International** — do NOT trust that a clicked link navigated successfully. Always call browser_snapshot immediately after clicking any article link on Iran International. If the snapshot shows the same page state, the click did not navigate. This is how you detect navigation failure on this site.
- **Khatam al-Anbiya Central Headquarters** — this is Iran's central wartime command body, distinct from IRGC Navy or Fars News media. When Khatam al-Anbiya issues statements (e.g. Hormuz transit rules demanding IRGC Navy authorization for all commercial vessels), this represents the highest-level wartime military authority. Treat as significant escalation signal. Updated 31 Mei 2026: war command threatened vessels and foreign military interference over Hormuz rules.
14. **Hormuz framing gap (deal-breaker indicator)** — Iran says it will reopen Hormuz ONLY AFTER the US lifts blockade. Trump claims simultaneous lifting. When this discrepancy appears in reporting, flag it prominently — it's a material sticking point, not spin.
15. **State TV "wishful thinking" rebuttal pattern** — When Iran state TV (not just Fars/IRGC) explicitly calls Trump's claims "wishful thinking" (example: Trump said US will "unearth and destroy" Iran's enriched uranium — state TV said it's just Trump's wish, not Tehran's commitment), this is a government-level rebuttal distinct from hardliner Fars. Track both layers: negotiating team (Ghalibaf) vs FM spokesman (Baghaei) vs state TV editorial line.
16. **Insider-on-team contradictions** — When a state TV pundit who physically accompanied the negotiating team (Mehdi Khanalizadeh in Islamabad) publicly says the draft breaches Khamenei's 8 of 10 terms, this is an extraordinary public break from the official line. Treat as major new signal of internal Iran disagreement.
17. **BBC listing page article links frequently 404** — even when a headline appears in the listing and seems fresh (e.g. "13 hrs ago"), clicking often leads to a 404 page. The workaround is to note the headline from the listing but not rely on the linked article being accessible. The LIVE update items (like the Vance "very close" quote) may appear in the listing as cards that can't be deep-linked — treat the listing headline and timestamp as the signal, not the article URL.
18. **Iran parliament legislating Hormuz control** — when Iranian parliament advances legislation on Hormuz control, this is a NEW negotiating posture distinct from ceasefire terms. Iran's parliament is adding a domestic legal layer to its negotiating position. Track this as a deal-breaker indicator if the legislation mandates parliamentary approval for any Hormuz agreement.
19. **Hegseth contradicting Trump's diplomatic claims** — whenever senior US military officials (Hegseth, Milley, etc.) publicly state something that contradicts Trump's diplomatic narrative (e.g. "blockade still in place" vs "will lift"), this signals either a coordination problem within the US administration or a deliberate layered pressure signal. Treat Hegseth statements at Shangri-La Dialogue as military leverage, not just posturing.
22. **ABC News video article inaccessibility** — ABC News International section displays live updates as video thumbnails with timestamps (e.g. "Urgent meeting in Situation Room as Trump weighs Iran deal" — 13 hrs ago). Clicking the article heading does NOT navigate to a readable article page — the listing persists. Treat listing headlines + timestamps as the signal; actual article body content may be inaccessible via browser. Use BBC or Iran International for readable US-side reporting instead.

23. **Al Jazeera liveblog navigation — TWO-STEP process required** — The homepage (aljazeera.com) shows a liveblog card (e.g., "Top Iran adviser blames US for stalled deal, Israel bombs Lebanon") at the top of the featured content area with timestamped updates listed below it. Clicking the card from the homepage does NOT navigate to a new URL — the page stays at aljazeera.com and the same live updates list remains visible. Updates are timestamped entries in a scrollable list BELOW the main summary. To access the full liveblog separately: navigate to aljazeera.com/middle-east (section landing page), find the liveblog card there, and click through. If a clicked link 404s, check the "Explore more" section on the 404 page — it often has working links to the same stories. Liveblog listing on landing page (/live-blog/<slug>) 404s — use the section landing page (e.g. Middle East) and find the liveblog card there.

**IMPORTANT: Liveblog updates are visible directly on the section landing page** — the timestamped update entries (list items with "list 1 of 10", "list 2 of 10", etc.) are embedded in the page itself, NOT behind a clickable link. The link in the liveblog card header (e.g. "Top Iran adviser blames US on stalled deal, Israel pushes deeper in Lebanon") may 404 or not navigate to a new page. The actual updates appear as a scrollable list BELOW the card header on the same landing page. Do NOT try to click into the liveblog — scroll down on the landing page to see the timestamped update entries in the Content Feed region.

**DEEP NAVIGATION FAILURE (31 Mei 2026):** Even the individual update article links INSIDE the Content Feed (e.g. "The Iranians are right not to trust the Trump administration") do NOT navigate when clicked. The page stays at the Middle East landing page. Clicking any link in the liveblog's update list — including nested article links — does not navigate. Treat the listing headline and timestamp as the signal; do not rely on any clickable link in the Al Jazeera liveblog navigating anywhere readable.

**Confirmed 31 Mei 2026 — Content Feed inner links also non-navigable:** The liveblog's own internal update entries (numbered "list 1 of 10" items with article titles) do not navigate when clicked. The outer liveblog card header link also doesn't navigate. The only working strategy: note the headline from the Content Feed listing and treat it as the signal. Do NOT attempt to click into any article from the Al Jazeera liveblog. The section landing page (aljazeera.com/middle-east) is the reliable read surface; the liveblog card and its contents are display-only.

24. **BBC article click can fail with CDP error** — When clicking article links from the BBC Middle East listing page, the click may return a CDP error (`DOM.getBoxModel: Could not compute box model`) and fail to navigate. Recover by re-navigating to `https://www.bbc.com/news/world/middle_east` and treating the listing headline + timestamp as the signal. This is a browser interaction failure mode, not a 404 — the link exists but the browser cannot complete the click action. Re-navigate to the listing page and try a different article if this happens. After re-navigation, use `browser_console` to verify the page URL is correct before trying more clicks.

25. **Iran International curl scraping — regex pattern for timestamps** — Iran International is a Next.js app; article data lives in JavaScript payloads, NOT in HTML attributes. Standard `grep` or HTML parsing fails. The correct extraction pattern:
   ```bash
   curl -sL "https://www.iranintl.com/en/liveblog/<id>" | python3 -c "
   import sys, re
   html = sys.stdin.read()
   all_ts = re.findall(r'\\\"publishedAt\\\":\\\\\"(2026-[^\\\\\"]+)\\\\\"', html)
   all_hl = re.findall(r'\\\"headline\\\":\\\\\"([^\\\\\"]+)\\\\\"', html)
   "
   ```
   Key: double-escaped quotes (`\\\"`) in regex because the JS payload uses escaped quotes. `grep -oP` does NOT work reliably here — use Python's `re` module with the escaped pattern. Timestamps appear as `2026-06-01T00:05:52.375Z`. If you get 0 matches, the page may have loaded via client-side JS — verify curl got the full response body, not a cloudflare challenge page.

26. **BBC H2 headlines are the signal, not timestamps** — BBC's page has no `datetime` attributes or `time` elements. The article listing uses H2 tags for headlines. Extract via `re.findall(r'<h2[^>]*>([^<]+)<', html)` and ignore timestamps entirely. BBC headline listing shows both the Iran story and Lebanon escalation; treat the H2 text as the headline signal.

**Confirmed working: phrase-context extraction for BBC** — When BBC article links 404 (common failure mode), extract context around key phrases directly from the listing page HTML. Example:
```python
for phrase in ['very close', 'final determination', 'agreed framework']:
    idx = html.find(phrase)
    if idx > 0:
        snippet = html[max(0,idx-200):idx+400]
        clean = re.sub(r'<[^>]+>', ' ', snippet)
        # gives you the card metadata + description around the headline
```
This works even when the linked article 404s — the listing page card retains the headline and description. Use this instead of trying to navigate to individual articles on BBC.

27. **Al Jazeera JS-heavy — curl returns minimal parseable HTML** — Al Jazeera renders most content via JavaScript after page load. When scraping via curl, you get almost no timestamps, no structured data, no article titles in expected HTML patterns. Image `alt` attributes give descriptions, but not timestamps. Do NOT rely on curl for AJ — use browser tools OR treat the listing as mostly unreadable via terminal and prioritize Iran International + BBC for structured data.

28. **execute_code > terminal for HTML parsing** — When you need to extract structured data from a scraped HTML page (timestamps, headlines, article content), use `execute_code` with Python's `re` module rather than trying to construct clever shell pipeline. `execute_code` keeps state (imports, variables) across calls and you can do multi-step parsing without fighting shell quoting. Use `terminal` for quick one-liners and site navigation; `execute_code` for anything requiring regex with alternation or character class matching.

29. **Iran International JSON-LD schema — BEST extraction target** — The liveblog page has a `<script type="application/ld+json">` tag with a complete `LiveBlogPosting` object. This is the most reliable data source — contains `headline`, `datePublished` for every update, and a `description` field with the liveblog summary. Parse this instead of HTML or JS payloads. Confirmed working 1 Juni 2026 — the JSON-LD schema is the ONLY reliable way to get update timestamps and headlines; HTML parsing fails on this Next.js app.

   **Correct Python extraction (json.loads approach — preferred):**
   ```python
   import re, json
   html = sys.stdin.read()
   ld_match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
   if ld_match:
       data = json.loads(ld_match.group(1))
       # data.keys() → ['@context', '@type', 'headline', 'description', 'dateModified', 'liveBlogUpdate']
       for u in data.get('liveBlogUpdate', []):
           print(u['datePublished'], u['headline'])
   ```

   The JSON-LD `liveBlogUpdate` array contains items in REVERSE chronological order (newest first). Each item has at minimum: `datePublished`, `headline`, `@type`. **NOTE: Individual BlogPosting items in the liveBlogUpdate array typically have NO `description` field — only `headline` and `datePublished`. The outer object's `description` field contains the blog-level summary, not per-update content. Do not expect update-level descriptions from the JSON-LD; they are not present.**

   `dateModified` on the outer object is the last-updated timestamp for the entire blog.

   **Common failure modes:** If `ld_match` returns None or `data.get('liveBlogUpdate')` returns empty list, the page loaded via client-side JS — curl got a Cloudflare challenge or incomplete shell. Verify `len(html)` > 50000 before parsing. If page is shorter, try adding a user-agent header or retry.

30. **Browser tools unavailable fallback** — When `browser_navigate` returns `[Errno 2] No such file or directory: '.../agent-browser'` the browser stack is not available. Fall back to curl + Python extraction. For Iran International: always use the JSON-LD schema approach (pitfall 29) — it's the most reliable data source and works with curl. Do NOT attempt HTML-based article link extraction on Iran International without browser tools — article links don't navigate reliably.

31. **CNN articles inaccessible via curl** — CNN is extremely JS-heavy. A curl request to a CNN article returns an H1 of "Uh-oh!" and no parseable article body. Never try to extract CNN article text via curl/Python — it's a waste of time. The Iran International liveblog headline "Trump rejects CNN report on Iran deal" is the signal; the CNN article body is inaccessible without browser tools. If you need CNN details, use the Iran International liveblog as intermediary (it may have more context in the full blog post), or skip CNN entirely and rely on Iran International + BBC.

32. **Iran International JSON-LD: Homepage ≠ Liveblog pages** — The homepage (iranintl.com/en) has a `WebSite` JSON-LD schema with a `dateModified` field — this tells you the site's last global update time. The `LiveBlogPosting` schema with `liveBlogUpdate` array only exists on liveblog subpages. Do NOT look for `liveBlogUpdate` on the homepage — it won't be there. Homepage extraction approach: curl the homepage, look for the `WebSite` schema's `dateModified`, then look for article-level timestamps via regex pattern `(2026-06-0[12]T[0-9]{2}:[0-9]{2}:[0-9]{2})` in the raw HTML. The homepage contains embedded article content in JS payloads even when the JSON-LD is just `WebSite` type.

33. **Iran International homepage timestamps: use raw HTML regex** — When the homepage JSON-LD is `WebSite` type (not `LiveBlogPosting`), the most reliable timestamp extraction is: `re.findall(r'(2026-06-0[12]T[0-9]{2}:[0-9]{2}:[0-9]{2})', html)`. These timestamps appear in embedded article JS payloads. Verify `len(html) > 50000` before parsing to confirm curl got the full page (Cloudflare challenge pages are much shorter).

34. **Iran International liveblog URL discovery: no API, must brute-force** — There is no `/api/liveblog` endpoint. Liveblog IDs are not guessable from slug patterns like `/liveblog/iran-us-talks`. Confirmed non-working slugs: `iran-us-talks`, `iran-us-ceasefire`, `iran-us-deal`, `iran-us-negotiations`. The only reliable way to find the active liveblog is: (a) look for `/_data=1` internal API responses in the homepage HTML that contain `LiveBlogPosting` type, or (b) note that Iran International LIVE section on the homepage links to the liveblog — extract the URL from the homepage HTML by searching for `liveblog` in href attributes. Currently there is no reliable programmatic discovery of the liveblog ID without browser tools.

- **Oman suspected naval mine in Hormuz** — Oman Maritime Security Center warned ships after a floating object suspected to be a naval mine was sighted west of the inshore traffic zone in Omani territorial waters. External escalation pressure not directly from US or Iran — a mine incident could trigger accidental escalation even if neither side wants war. Could also push all parties toward compromise faster because global shipping insurance/risks spike immediately with any mine sighting. Treat as independent third-party escalation trigger, distinct from US-Iran direct conflict.

- **Iran pushes Hezbollah escalation for leverage** (Axios, 04:39 UTC 1 Juni 2026) — Tehran actively using Hezbollah escalation as negotiating leverage. Pattern baru — Iran extraction leverage dari Lebanon theater instead of direct military action. Distinct from earlier IRGC strikes pattern.
- **IRGC says Isfahan blasts tied to unexploded wartime munitions** (06:50 UTC 1 Juni 2026) — IRGC meredakan narasi soal Isfahan. Ledakan dari amunisi perang lama yang tidak meledak, BUKAN serangan baru. Sinyal Iran ingin de-escalate tanpa kalah face.
- **Jet sounds over Tehran, blasts in Bandar Abbas** (06:15 UTC 1 Juni 2026) — Suara jet di Tehran + ledakan di Bandar Abbas. Origin belum dikonfirmasi. WATCH untuk konfirmasi apakah Israeli operation atau aktivitas militer lain.
- **Trump says Iran "really wants" deal** (05:21 UTC 1 Juni 2026) — Trump publicly states Iran genuinely wants deal. Nada lebih soft dari "final determination" sebelumnya — sinyal Trump still engaged, bukan preparing to say no. Bandingkan dengan "no hurry" statement — keduanya indicate Trump masih dalam mode negosiasi.
- **Iran executes two protesters** (04:57 UTC 1 Juni 2026) — Iran gantung dua demonstran dari January protests. Represi domestic meningkat seiring negosiasi — regime jaga leverage dengan suppress dissent. Signals regime worried about popular opinion on deal.
- **Oman suspected naval mine in Hormuz** (UPDATED) — Oman Maritime Security Center warned ships after a floating object suspected to be a naval mine was sighted west of the inshore traffic zone in Omani territorial waters. External escalation pressure not directly from US or Iran — a mine incident could trigger accidental escalation even if neither side wants war. Could also push all parties toward compromise faster because global shipping insurance/risks spike immediately with any mine sighting.

## References

- `references/last-known-status.md` — previous session output for deduplication comparison. **MUST be updated at the end of every session** with current timestamp, Trump status, and all new developments found. This is the cron job runner's responsibility — do not skip this step.

## Key Signals to Track (Summary)

**Trump signals (most important):**
- "final determination" = decision imminent — public signal, not silent exit
- Silent exit from Situation Room without announcement = possible rejection (speed matters)
- "Iran really wants deal" = still engaged, NOT preparing to say no
- "no hurry" = either diplomatic space-giving OR leverage declining
- Public rejection of media claim ≠ own announcement of rejection — denial of premature story = still negotiating

**Iran internal signals:**
- IRGC strikes = military pressure alongside diplomacy (prep for failure OR prep for deal)
- Iran pushes Hezbollah escalation = leverage extraction from Lebanon theater
- Iran executes protesters = regime suppress dissent, worried about popular opinion
- Hardliner MPs warn Ghalibaf = parliamentary pressure escalating
- Pezeshkian resignation pending Mojtaba Khamenei decision = IRGC seizure of government functions

**Deal-breaker indicators:**
- Qatar cash vs credit gap ($12B cash vs ~$6B restricted credit)
- Hormuz sequencing gap (Iran: US lift blockade FIRST; Trump: simultaneous)
- Iran parliament legislating Hormuz control (domestic legal layer)
- Trump requesting edits = re-negotiating, not just waiting to approve

**Escalation patterns:**
- New mutual strike exchange (Sirik + CENTCOM) = escalation pattern baru
- Jet sounds Tehran + Bandar Abbas blasts = watch for Israeli ops confirmation
- Oman suspected mine = external trigger for accidental escalation
- Kuwait intercepting missiles = ceasefire more fragile than thought

As of 30 Mei 2026, ~14:45 WIB (updated during current session):

**TRUMP KELUAR SITUATION ROOM TANPA KEPUTUSAN — 30 MEI:**
- Trump keluar dari Situation Room (~2 jam) tanpa announcement keputusan. NYT: belum decide, tapi pejabat AS masih yakin agreement bisa dekat.
- Trump pakai phrasing "final determination" secara publik — sinyal decision time approach, bukan retorika biasa.
- Speed keluar tanpa announcement = masih menimbang, bukan reject. Kalau keluar cepat dengan approval = sinyal yes; kalau lama dan diam = sinyal no.
- **FM Baghaei langsung bantah di hari yang sama**: "pertukaran pesan terus berlanjut... tapi belum ada pemahaman yang difinalisasi" — kontradiksi langsung dari level pemerintah Iran, bukan tim negosiasi.
- **Ghalibaf: "Only actions are the measure, no action before the other side acts"** — posisi Iran unchanged, tidak akan bertindak duluan.
- **Hegseth: US "more than capable" resuming war** — di Shangri-La Dialogue, Singapura, Menhan AS kirim sinyal militer sebagai leverage tekanan.
- **Hegseth contradict Trump langsung**: tegaskan blockade AS "still in place" meskipun Trump klaim akan lift — gap internal AS atau sinyal pressure.
- Qatar cash vs credit gap masih jadi obstacle — $12B cash ditolak, hanya credit ~$6B untuk pembelian barang dari Qatar saja. Ghalibaf kembali dari Doha dengan "major diplomatic setback".
- US belum confirm Iran letakkan mines di Hormuz (NBC reporting) — klaim AS soal aksi Iran bisa overstated.
- World Bank/IMF/IEA warning: stok minyak global depleting at record pace kalau Hormuz tetap tertutup.
- **Iran parliament majukan legislasi kontrol Hormuz** — parliament gerak UU untuk legitimate domestic control atas Selat Hormuz; posisi tawar baru Iran, bisa jadideal-breaker jika mandate parliamentary approval.
- **Khamenei adviser langsung blame US**: "blockade Trump bukti dia tidak mau talks" — sinyal dari circle Khamenei, distinct dari IRGC Fars News.
- **Hardline MP warn Ghalibaf langsung**: MP Rasaee sebut Ghalibaf's earlier conditions (ceasefire Lebanon + frozen assets) dan bilang jangan trust US — parliamentary pressure escalating.
- Ships disabling AIS trackers to slip through Hormuz (WSJ) — komersial vessels hindari deteksi, situasi Hormuz chaotic.
- Iran implement Hormuz toll system targeting Saudi-China oil trade — Iran extract economic value dari kontrol Hormuz independent dari US blockade.
- **UPDATED 31 MEI 2026 — SESSION UPDATE:**
- Trump keluar Situation Room (~2 jam) tanpa keputusan — belum approve. Pejabat AS masih optimistic agreement "may be close."
- IRGC-linked outlets (Fars News) tetap bilang "no final text exists" — diverges sharply dari Trump claims.
- **Iran Khatam al-Anbiya (war command) ultimatum** — semua kapal harus dapat izin IRGC Navy, threaten vessels dan military interference. Highest-level military authority speak.
- **Kapal Lian Star diblacklist US** — Gambia-flagged bulk carrier ignore peringatan overnight, disabled by US aircraft di Gulf of Oman. Total 6 kapal udah dihentikan.
- Oman Maritime Security Center: suspected mine sighted di Hormuz — external escalation, bukan dari US atau Iran langsung.
- Hormuz: ~20 ships crossing daily di bawah koordinasi IRGC.

**Previously known (may be stale):**
- **Iran fire ballistic missile Fateh-110 ke Kuwait (28 Mei)** — ceasefire violation; 5 Americans injured minor, 1 MQ-9 Reaper hancur, 1 seriously damaged. Perang depleting US stockpiles: JASSM-ER, Tomahawk, THAAD, Patriot PAC-3, SM-3 Block IIA
- IRGC Fars News: "mix of truth and lies" tentang klaim Trump — hardliner opposition signal
- Netanyahu order IDF increase control of Gaza ke 70% — violates ceasefire terms dengan Hamas
- Israel crosses Litani River — Netanyahu says forces sudah cross; escalation Lebanon
- Israel strikes Beirut dan southern Lebanon, evacuation orders untuk 17% wilayah Lebanon
- **Israel forces reach Nabatieh** (30 Mei 2026) — IDF advanced beyond Litani River to outskirts of Lebanon's biggest cities. Distinct escalation from initial Litani crossing announcement.
- Kazakhstan bersedia tahan enriched uranium Iran (Grossi/IAEA, 29 Mei) — tracks diplomasi ketiga pihak
- Iran resumes hijab patrols after ceasefire prospects improve — domestic pressure signal
- Iran partial internet return expose internal rift — hardliners vs Pezeshkian government
- **Qatar cash vs credit gap** (known obstacle from 30 Mei) — Iran expected liquid $12B cash; Qatar offered restricted credit line ~$6B for Qatar-origin purchases only. This financial gap is a concrete deal-breaker obstacle.

**Key signals to watch:**
- If Trump enters Situation Room and does NOT emerge with approval announcement quickly → decision may be NO. Speed of post-Situation Room announcement matters.
- **Post-Situation Room silence without announcement = likely rejection signal**
- **Trump "final determination" public phrasing** = imminent decision signal — contrast with silent exit which = possible no
- IRGC Fars News rebuttal of Trump claims = hardliner internal opposition signal
- **Ghalibaf direct MP warning** = internal pressure on negotiating team escalating — watch for public break
- **Qatar cash vs credit gap** — Iran expected liquid $12B cash; Qatar offered restricted credit line only. This financial gap is a concrete obstacle that could collapse the deal even if Trump approves the MoU framework
- **Iran internal rallies intensifying** — nightly anti-negotiation gatherings = hardliners mobilizing street pressure, distinct from Fars News/media opposition
- Hormuz sequencing: Iran wants US blockade lifted FIRST, then Hormuz opens. Trump claims simultaneous. This gap can collapse a deal.
- **US unverified mine claims** — US has NOT confirmed Iran actually placed mines in Hormuz. If US claims about Iranian actions are unverified, the blockade justification may be overstated — flag when reporting.
- **World Bank/IMF/IEA joint warning** = escalate tekanan ekonomi global soal Hormuz, bisa dorong semua pihak ke kompromi
- **Netanyahu expands Gaza control + IDF cross Litani** = Israel tidak interested dalam deal panjang, threat ke seluruh Middle East equilibrium
- **Rubio says Tom Barrack stepping down from Syria post** — Trump envoy for Syria stepping down; signals US diplomatic reshuffle in the region as Iran deal negotiations continue