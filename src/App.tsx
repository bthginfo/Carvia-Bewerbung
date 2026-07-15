import { useEffect, useRef, useState } from 'react'

const chapters = [
  { id: 'anfang', label: 'Anfang' },
  { id: 'warum', label: 'Warum' },
  { id: 'arbeiten', label: 'Arbeiten' },
  { id: 'idee', label: 'Formatidee' },
  { id: 'prozess', label: 'Arbeitsweise' },
  { id: 'vita', label: 'Vita' },
  { id: 'kontakt', label: 'Kontakt' },
]

const applicationUrl = 'https://carvia-bewerbung-mario-schubert.vercel.app'

type VideoReference = {
  title: string
  category: string
  thumbnail: string
  embed: string
  source: string
}

const videoReferences: VideoReference[] = [
  {
    title: 'Maserati · Grecale Barbie Event',
    category: 'Eventfilm · Automotive · Social',
    thumbnail: '/media/videos/maserati.jpg',
    embed: 'https://drive.google.com/file/d/1VTwYSxYSowiWhvQu3C_fpWoV9vgliYsk/preview',
    source: 'Google Drive',
  },
  {
    title: 'Aston Martin · DBX 707',
    category: 'Automotive Film · Launch / Experience',
    thumbnail: '/media/videos/aston-dbx.jpg',
    embed: 'https://drive.google.com/file/d/1rzRF8FGjO8SrPf7tegbeYW7VbBmpbYFn/preview',
    source: 'Google Drive',
  },
  {
    title: 'ADAC GT4 Germany · Red Bull Ring',
    category: 'Motorsport · Long-form / Live Content',
    thumbnail: '/media/videos/adac-gt4.jpg',
    embed: 'https://www.youtube-nocookie.com/embed/xQ6noPM0TS0',
    source: 'YouTube',
  },
  {
    title: 'The Honourables · Golf & Business Cup',
    category: 'Lifestyle · Eventfilm',
    thumbnail: '/media/videos/the-honourables.jpg',
    embed: 'https://drive.google.com/file/d/1LH989Q6MOTSidqQZzisju0qqdQDrAwig/preview',
    source: 'Google Drive',
  },
]

const timeline = [
  {
    date: '03/2023 — heute',
    title: 'Selbstständig · WYLDWORKS / marioschub.com',
    copy: 'Strategie, Foto- und Videoproduktion sowie digitale Produkte aus einer Hand. Über 30 Unternehmenskunden – von der ersten Idee bis zur Ausspielung.',
  },
  {
    date: 'seit 2023',
    title: 'Lehrbeauftragter · TH Ingolstadt',
    copy: 'User Experience Design und Digital Photography. Drei Semester, rund 100 Studierende und der Anspruch, Gestaltung verständlich und praktisch zu machen.',
  },
  {
    date: '06/2023 — 02/2024',
    title: 'PMO Coordinator · in-tech',
    copy: 'Prozesse, KPIs und Stakeholder-Reporting in einem Automotive-Großprojekt.',
  },
  {
    date: '04/2022 — 05/2023',
    title: 'Management Consultant · Achtzig20',
    copy: 'Strategische Beratung, Kampagnen und Workshops an der Schnittstelle von Marke, Produkt und Kommunikation.',
  },
  {
    date: '02/2020 — 04/2022',
    title: 'Junior Consultant & Co-Lead Media · Achtzig20',
    copy: 'Crossmediale Kampagnen und Storytelling. Das Kreativteam von 2 auf 10+ Menschen mitentwickelt.',
  },
  {
    date: '10/2018 — 2023',
    title: 'B.Sc. User Experience Design · TH Ingolstadt',
    copy: 'Fundament für nutzerzentrierte Gestaltung, visuelle Systeme und digitale Produkte.',
  },
]

const skills = [
  ['01', 'Denken', 'Idee, Format, Dramaturgie und Produktionsplan. Erst klären, was hängen bleiben soll – dann drehen.'],
  ['02', 'Machen', 'Foto und Video, Licht, Perspektive und Bewegung. Locker am Set, konzentriert im Ergebnis.'],
  ['03', 'Verdichten', 'Schnitt, Look, Motion und Soundgefühl. So viel Effekt wie nötig, so wenig wie möglich.'],
  ['04', 'Ausspielen', 'YouTube, Reels, Shorts, Website und Kampagne. Ein Dreh, ein System, viele starke Assets.'],
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 16 18 6M10 6h8v8" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m9 6 9 6-9 6z" />
    </svg>
  )
}

function SiteHeader({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <a className="wordmark" href="#anfang" aria-label="Zum Anfang">
        <span>MS</span><i /> <b>CV</b>
      </a>
      <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="chapter-nav">
        {open ? 'Schließen' : 'Kapitel'}
      </button>
      <nav id="chapter-nav" className={open ? 'chapter-nav is-open' : 'chapter-nav'} aria-label="Kapitel">
        {chapters.map((chapter, index) => (
          <a
            href={`#${chapter.id}`}
            key={chapter.id}
            className={active === chapter.id ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>{chapter.label}
          </a>
        ))}
      </nav>
      <a className="header-mail" href="mailto:servus@marioschub.com">Let’s talk <ArrowIcon /></a>
    </header>
  )
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotionInitially = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(reducedMotionInitially)
  const [motionOptIn, setMotionOptIn] = useState(() => !reducedMotionInitially())
  const [playing, setPlaying] = useState(() => !reducedMotionInitially())
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = (reduced: boolean) => {
      setPrefersReducedMotion(reduced)
      setMotionOptIn(!reduced)

      if (reduced) {
        videoRef.current?.pause()
        setPlaying(false)
      } else {
        void videoRef.current?.play().catch(() => setPlaying(false))
      }
    }
    const handleChange = (event: MediaQueryListEvent) => syncPreference(event.matches)

    syncPreference(preference.matches)
    preference.addEventListener('change', handleChange)
    return () => preference.removeEventListener('change', handleChange)
  }, [])

  const toggleVideo = async () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      setMotionOptIn(true)
      await video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  return (
    <section
      id="anfang"
      className={`hero ${ready && (!prefersReducedMotion || motionOptIn) ? 'video-ready' : ''} ${motionOptIn ? 'allow-motion' : ''}`}
      aria-labelledby="hero-title"
    >
      <div className="hero-media" aria-hidden="true">
        <img className="hero-poster" src="/media/motion-poster.jpg" alt="" />
        <video
          ref={videoRef}
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload={prefersReducedMotion && !motionOptIn ? 'metadata' : 'auto'}
          poster="/media/motion-poster.jpg"
          onCanPlay={() => setReady(true)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        >
          <source src="/media/motion-into-emotion.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" />
      <div className="hero-topline reveal reveal-1">
        <span>Bewerbung · Filmmaker / Content Creator</span>
        <span>Ingolstadt · München</span>
      </div>
      <div className="hero-copy">
        <p className="eyebrow reveal reveal-2">Servus CarVia.</p>
        <h1 id="hero-title" className="reveal reveal-3">Bilder, die Lust<br />aufs <em>Losfahren</em> machen.</h1>
        <div className="hero-intro reveal reveal-4">
          <p>Ich bin Mario – Filmemacher, Fotograf und Stratege aus Ingolstadt. Ich denke in Geschichten, drehe sie selbst und bringe sie so in Form, dass sie nicht nur gut aussehen, sondern hängen bleiben.</p>
          <a href="#arbeiten">Ausgewählte Arbeiten <ArrowIcon /></a>
        </div>
      </div>
      <div className="hero-footer reveal reveal-4">
        <button className="video-control" type="button" onClick={toggleVideo} aria-label={playing ? 'Hintergrundvideo pausieren' : 'Hintergrundvideo abspielen'}>
          <span className={playing ? 'pause-symbol' : 'play-symbol'} />
          {playing ? 'Pause' : 'Play'}
        </button>
        <span className="timecode">REC · 00:00:26:12</span>
        <span className="scroll-cue">Scroll to move <i /></span>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section id="warum" className="section why-section observe" aria-labelledby="why-title">
      <div className="section-index"><span>01</span>Warum jetzt</div>
      <div className="why-grid">
        <div className="why-kicker">
          <span>Seit 03/2023 selbstständig</span>
          <span>30+ Unternehmenskunden</span>
          <span>Basis Ingolstadt</span>
        </div>
        <div className="why-copy">
          <h2 id="why-title">Ich suche kein nächstes Projekt. <em>Sondern ein Team,</em> mit dem ich eine Bildwelt langfristig aufbauen kann.</h2>
          <div className="two-col-copy">
            <p>Selbstständigkeit heißt: vom ersten Gedanken bis zur finalen Datei Verantwortung übernehmen. Zuhören, planen, improvisieren, liefern. Das hat mich schnell und pragmatisch gemacht – ohne den Anspruch an ein gutes Bild zu verlieren.</p>
            <p>CarVia verbindet genau die Dinge, die mich reizen: Bewegung, starke Produkte, Orte mit Charakter und die Freiheit, aus einzelnen Drehs wiedererkennbare Formate zu machen. Strategie ohne Umsetzung bleibt Theorie.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="arbeiten" className="section work-section observe" aria-labelledby="work-title">
      <div className="section-index light"><span>02</span>Selected work</div>
      <div className="work-heading">
        <h2 id="work-title">Premium beginnt<br />im <em>Detail.</em></h2>
        <p>Drei Perspektiven auf ein gemeinsames Thema: Begehren entsteht nicht durch Lautstärke, sondern durch den richtigen Moment.</p>
      </div>
      <article className="case case-feature">
        <figure>
          <img src="/media/aston-vantage.jpg" alt="Grüner Aston Martin Vantage in atmosphärischem Licht und Nebel" loading="lazy" />
          <figcaption><span>01 / Aston Martin Vantage</span><span>Launch Event</span></figcaption>
        </figure>
        <div className="case-copy">
          <span className="case-type">Automotive · Event</span>
          <h3>Präsenz, bevor<br />der Motor läuft.</h3>
          <p>Licht, Rauch, Reflexion – und ein Auto, das keine Erklärung braucht. Meine Aufgabe: die Energie des Launch-Abends in eine Bildserie zu übersetzen.</p>
          <p className="role">Rolle: Eventfotografie · Bildauswahl · Postproduktion</p>
        </div>
      </article>
      <div className="work-pair">
        <article className="case case-portrait">
          <figure>
            <img src="/media/aston-ulm.jpg" alt="Aston-Martin-Emblem im Autohaus, gerahmt von dunklen Fahrzeugkonturen" loading="lazy" />
            <figcaption><span>02 / Aston Martin Ulm</span><span>Premium Experience</span></figcaption>
          </figure>
          <h3>Atmosphäre ist das, was zwischen den Motiven passiert.</h3>
          <p className="role">Eventfotografie · Bildauswahl · Postproduktion</p>
        </article>
        <article className="case case-landscape">
          <figure>
            <img src="/media/watchmaker.jpg" alt="Mechanische Luxusuhren in einer beleuchteten Vitrine" loading="lazy" />
            <figcaption><span>03 / Hollfelder Juwelier</span><span>Product & Detail</span></figcaption>
          </figure>
          <h3>Material, Mechanik, Moment.</h3>
          <p>Ein leiser Blick auf Produkte, bei denen Präzision sichtbar werden muss.</p>
        </article>
      </div>
      <VideoReel />
    </section>
  )
}

function VideoReel() {
  const [activeVideo, setActiveVideo] = useState<VideoReference | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!activeVideo || !dialog) return
    if (!dialog.open) dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
      if (dialog.open) dialog.close()
      lastTriggerRef.current?.focus()
    }
  }, [activeVideo])

  const openVideo = (video: VideoReference, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger
    setActiveVideo(video)
  }

  const closeVideo = () => setActiveVideo(null)

  return (
    <div className="reel" aria-labelledby="reel-title">
      <div className="reel-heading">
        <div>
          <span className="case-type">Moving image · 04 Arbeiten</span>
          <h3 id="reel-title">Ausgewählte<br /><em>Filme.</em></h3>
        </div>
        <p>Vier Produktionen, vier Tempi. Der Player lädt erst nach einem bewussten Klick.</p>
      </div>
      <div className="reel-wall">
        {videoReferences.map((video, index) => (
          <article className={`reel-item reel-item-${index + 1}`} key={video.title}>
            <button
              type="button"
              className="reel-poster"
              aria-label={`${video.title} abspielen`}
              onClick={(event) => openVideo(video, event.currentTarget)}
            >
              <img src={video.thumbnail} alt={`Filmstill: ${video.title}`} loading="lazy" />
              <span className="reel-play"><PlayIcon /><b>Play</b></span>
              <span className="reel-number">{String(index + 1).padStart(2, '0')}</span>
            </button>
            <div className="reel-meta"><h4>{video.title}</h4><p>{video.category}</p></div>
          </article>
        ))}
      </div>
      <dialog
        ref={dialogRef}
        className="video-dialog"
        aria-labelledby="video-dialog-title"
        onCancel={(event) => {
          event.preventDefault()
          closeVideo()
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeVideo()
        }}
      >
        {activeVideo && (
          <div className="video-dialog-panel">
            <header>
              <div><span>{activeVideo.category}</span><h2 id="video-dialog-title">{activeVideo.title}</h2></div>
              <button type="button" onClick={closeVideo} aria-label="Videoplayer schließen">Schließen ×</button>
            </header>
            <div className="video-frame">
              <iframe
                src={activeVideo.embed}
                title={`${activeVideo.title} – Videoplayer`}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <footer><span>Quelle · {activeVideo.source}</span><span>ESC zum Schließen</span></footer>
          </div>
        )}
      </dialog>
    </div>
  )
}

function FormatIdea() {
  const beats = [
    ['00:00', 'Cold Open', 'Ein Bild, ein Sound, eine offene Frage.'],
    ['00:25', 'Meet', 'Wer fährt – und warum heute genau dorthin?'],
    ['02:10', 'Move', 'Das Auto zeigt Charakter, die Route gibt Rhythmus.'],
    ['07:40', 'Moment', 'Kein Datenblatt. Ein ehrlicher Moment, der bleibt.'],
    ['11:30', 'Return', 'Was die Fahrt verändert hat – und der nächste Schlüssel.'],
  ]
  return (
    <section id="idee" className="format-section observe" aria-labelledby="format-title">
      <div className="format-image" role="img" aria-label="Filmstill eines Sportwagens in Bewegung">
        <img src="/media/motion-poster.jpg" alt="Sportwagen bei einer filmischen Fahrt in alpiner Landschaft" loading="lazy" />
      </div>
      <div className="format-content">
        <div className="section-index light"><span>03</span>Eine Idee für CarVia</div>
        <p className="proposal-label">Formatvorschlag · YouTube + Social</p>
        <h2 id="format-title"><span>One key.</span><span>One road.</span><span><em>One story.</em></span></h2>
        <p className="format-lead">Jede Folge verbindet ein konkretes Auto, einen Menschen mit einem echten Grund loszufahren und eine Route, die beides zusammenbringt.</p>
        <div className="route-strip" aria-label="Beispielrouten">
          <span>München → Alpen</span><span>Paris → After dark</span><span>Mallorca → First light</span>
        </div>
        <ol className="episode-steps">
          {beats.map(([time, title, copy]) => (
            <li key={title}>
              <time>{time}</time><strong>{title}</strong><p>{copy}</p>
            </li>
          ))}
        </ol>
        <div className="format-yield">
          <span>1 × 12 Min. Film</span><i />
          <span>4 × Shorts</span><i />
          <span>12 × Stills</span><i />
          <span>1 × Story</span>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="prozess" className="section process-section observe" aria-labelledby="process-title">
      <div className="section-index"><span>04</span>Arbeitsweise</div>
      <div className="process-head">
        <h2 id="process-title">Von der Idee<br />bis zur <em>Ausspielung.</em></h2>
        <p>Ich mag kurze Wege, klare Entscheidungen und Produktionen, bei denen alle wissen, welches Bild am Ende entstehen soll.</p>
      </div>
      <div className="process-list">
        {skills.map(([number, title, copy]) => (
          <article key={number}>
            <span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true" />
          </article>
        ))}
      </div>
      <div className="tool-line">
        <span>Im Werkzeugkasten</span>
        <p>Adobe Premiere Pro · After Effects · Final Cut Pro · Lightroom · Photoshop · Figma · CMS</p>
      </div>
    </section>
  )
}

function Vita() {
  return (
    <section id="vita" className="section vita-section observe" aria-labelledby="vita-title">
      <div className="section-index"><span>05</span>Vita in Bewegung</div>
      <div className="vita-intro">
        <h2 id="vita-title">Kreativ im Bild.<br /><em>Strukturiert</em> dahinter.</h2>
        <div className="vita-facts">
          <span>Jahrgang 1995</span><span>Ingolstadt</span><span>Deutsch · Englisch C1 · Französisch B1</span>
        </div>
      </div>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article key={item.title}>
            <span className="timeline-count">{String(index + 1).padStart(2, '0')}</span>
            <time>{item.date}</time>
            <div><h3>{item.title}</h3><p>{item.copy}</p></div>
          </article>
        ))}
      </div>
      <a className="cv-link" href="/cv">Vollständigen CV öffnen <ArrowIcon /></a>
    </section>
  )
}

function Contact() {
  return (
    <footer id="kontakt" className="contact-section observe" aria-labelledby="contact-title">
      <div className="contact-photo">
        <img src="/media/mario-contact.jpg" alt="Porträt von Mario Schubert am Fenster" loading="lazy" />
        <span>Mario Schubert · Ingolstadt · 2026</span>
      </div>
      <div className="contact-content">
        <div className="section-index light"><span>06</span>Kontakt</div>
        <p className="contact-kicker">Wenn ihr glaubt, dass das passen könnte:</p>
        <h2 id="contact-title">Lasst uns<br /><em>reden.</em></h2>
        <p>Gern bei einem Kaffee in München, einem Spaziergang in Ingolstadt oder direkt zwischen zwei Autos.</p>
        <div className="contact-actions">
          <a href="mailto:servus@marioschub.com">servus@marioschub.com <ArrowIcon /></a>
          <a href="tel:+4915155338029">+49 1515 5338029 <ArrowIcon /></a>
        </div>
        <div className="contact-links">
          <a href="https://www.wyldworks.de/" target="_blank" rel="noreferrer">WYLDWORKS <ExternalIcon /></a>
          <a href="https://marioschub.com/" target="_blank" rel="noreferrer">marioschub.com <ExternalIcon /></a>
          <a href="/cv">CV / Print <ArrowIcon /></a>
          <a href="/anschreiben">Anschreiben <ArrowIcon /></a>
        </div>
        <p className="contact-signoff">Bis bald,<br /><span>Mario</span></p>
      </div>
      <div className="contact-bottom"><span>© 2026 Mario Schubert</span><a href="#anfang">Zurück nach oben ↑</a></div>
    </footer>
  )
}

function MainPage() {
  const [active, setActive] = useState('anfang')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-25% 0px -65% 0px' },
    )
    chapters.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => {
      window.removeEventListener('scroll', updateProgress)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <SiteHeader active={active} />
      <main id="main">
        <Hero />
        <Why />
        <Work />
        <FormatIdea />
        <Process />
        <Vita />
      </main>
      <Contact />
    </>
  )
}

function CvPage() {
  return (
    <main id="main" className="cv-page">
      <div className="cv-toolbar">
        <a href="/">← Zur Bewerbung</a>
        <div>
          <a href="/anschreiben">Anschreiben</a>
          <a className="toolbar-download" href="/documents/Mario_Schubert_CV_CarVia.pdf" download>PDF herunterladen ↓</a>
          <button type="button" onClick={() => window.print()}>Drucken / als PDF sichern</button>
        </div>
      </div>
      <article className="cv-sheet">
        <header className="cv-header">
          <div>
            <p>Curriculum Vitae · 07/2026</p>
            <h1>Mario<br /><em>Schubert</em></h1>
          </div>
          <img src="/media/mario-contact.jpg" alt="Mario Schubert" />
        </header>
        <a className="cv-digital" href={applicationUrl}>
          <span>Digitale Bewerbung & ausgewählte Filme</span>
          <strong>carvia-bewerbung-mario-schubert.vercel.app</strong>
          <ExternalIcon />
        </a>
        <section className="cv-summary">
          <h2>Profil</h2>
          <div>
            <p>Filmemacher, Fotograf und Stratege mit UX-Hintergrund. Ich entwickle visuelle Geschichten von der Idee bis zur Ausspielung – pragmatisch in der Produktion, präzise im Ergebnis.</p>
            <dl>
              <div><dt>Standort</dt><dd>Ingolstadt</dd></div>
              <div><dt>Geboren</dt><dd>31.12.1995</dd></div>
              <div><dt>Kontakt</dt><dd><a href="mailto:servus@marioschub.com">servus@marioschub.com</a><br /><a href="tel:+4915155338029">+49 1515 5338029</a></dd></div>
            </dl>
          </div>
        </section>
        <section className="cv-experience">
          <h2>Erfahrung</h2>
          <div className="cv-timeline">
            {timeline.map((item) => (
              <article key={item.title}>
                <time>{item.date}</time><div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>
        <section className="cv-columns">
          <div>
            <h2>Kompetenzen</h2>
            <p>Konzeption & Storytelling · Pre-Production · Fotografie & Videoproduktion · Schnitt · Postproduktion · Content-Strategie · Plattformadaption · UX & digitale Produkte</p>
          </div>
          <div>
            <h2>Tools</h2>
            <p>Adobe Premiere Pro · After Effects · Final Cut Pro · Lightroom · Photoshop · Figma · CMS</p>
          </div>
          <div>
            <h2>Sprachen</h2>
            <p>Deutsch – Muttersprache<br />Englisch – C1<br />Französisch – B1</p>
          </div>
        </section>
        <footer className="cv-footer">
          <a href="https://marioschub.com/">marioschub.com</a><a href="https://www.wyldworks.de/">wyldworks.de</a><span>Mario Schubert · Ingolstadt</span>
        </footer>
      </article>
    </main>
  )
}

function CoverLetterPage() {
  return (
    <main id="main" className="letter-page">
      <div className="cv-toolbar letter-toolbar">
        <a href="/">← Zur Bewerbung</a>
        <div>
          <a href="/cv">CV ansehen</a>
          <a className="toolbar-download" href="/documents/Mario_Schubert_Anschreiben_CarVia.pdf" download>PDF herunterladen ↓</a>
          <button type="button" onClick={() => window.print()}>Drucken / als PDF sichern</button>
        </div>
      </div>
      <article className="letter-sheet">
        <header className="letter-head">
          <div className="wordmark letter-mark"><span>MS</span><i /><b>CV</b></div>
          <div className="letter-meta"><span>Mario Schubert</span><span>Ingolstadt</span><a href="mailto:servus@marioschub.com">servus@marioschub.com</a><a href="tel:+4915155338029">+49 1515 5338029</a></div>
        </header>
        <div className="letter-title">
          <p>Bewerbung · 07/2026</p>
          <h1>Bewerbung als Videograf / Filmmaker / <em>Content Creator Video</em></h1>
        </div>
        <div className="letter-body">
          <p>Liebes CarVia-Team,</p>
          <p>starke Autos sind leicht zu filmen. Schwieriger ist es, daraus Geschichten zu machen, die nach dem letzten Sounddesign nicht wieder verschwinden. Genau das reizt mich an der Rolle bei CarVia.</p>
          <p>Seit 2023 arbeite ich mit WYLDWORKS selbstständig für mehr als 30 Unternehmen. Ich entwickle Ideen, plane Produktionen, stehe hinter der Kamera und bringe das Material in Schnitt und Postproduktion zusammen. Davor habe ich bei Achtzig20 ein Kreativteam von zwei auf mehr als zehn Menschen mit aufgebaut. Dabei habe ich gelernt: Gute Bilder entstehen nicht nur am Set. Sie brauchen eine klare Idee, ehrliches Feedback und einen Prozess, der auch beim nächsten Dreh noch trägt.</p>
          <p>An CarVia interessiert mich deshalb nicht nur die Flotte. Mich reizt die Chance, aus einzelnen Produktionen eine wiedererkennbare Welt zu bauen – mit Formaten für YouTube, Social, Website und die besonderen Orte, an denen eure Marke stattfindet. Premium heißt für mich dabei nicht möglichst viel Hochglanz. Es heißt, das richtige Detail zu sehen und ihm Zeit zu geben.</p>
          <p>Die Selbstständigkeit hat mir viel gegeben: Verantwortung, Tempo und einen ziemlich direkten Blick darauf, was funktioniert. Jetzt möchte ich diese Erfahrung in ein Team einbringen und eine Bildsprache nicht nur für ein Projekt, sondern über Jahre weiterentwickeln. Meine Basis ist Ingolstadt; München und Produktionen unterwegs gehören für mich ganz selbstverständlich dazu.</p>
          <p>Meine Arbeiten, die Formatidee und den aktuellen CV findet ihr unter:<br /><a className="letter-site" href={applicationUrl}>{applicationUrl}</a></p>
          <p>Wenn ihr das Gefühl habt, dass das passen könnte, freue ich mich auf ein Gespräch – gern auch direkt über die erste Idee, die wir gemeinsam drehen würden.</p>
          <p className="letter-signoff">Servus<br /><strong>Mario Schubert</strong></p>
        </div>
        <footer className="letter-footer"><span>Mario Schubert · Ingolstadt</span><span>carvia-bewerbung-mario-schubert.vercel.app</span><span>01 / 01</span></footer>
      </article>
    </main>
  )
}

export function App() {
  if (window.location.pathname.startsWith('/anschreiben')) return <CoverLetterPage />
  if (window.location.pathname.startsWith('/cv')) return <CvPage />
  return <MainPage />
}
