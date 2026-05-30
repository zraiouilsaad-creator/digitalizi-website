'use client';

import { useEffect, useState } from 'react';
import { useScroll, useSpring, motion } from 'motion/react';
import Image from 'next/image';
import TestimonialsSection from '@/components/testimonials-section';
import { AnimatedSlogans } from '@/components/ui/animated-hero';
import ServicesOrbital from '@/components/services-orbital';
import { CountUp } from '@/components/ui/count-up';

export default function DigitaliziPage() {
  const [activeRow, setActiveRow] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Scroll / reveal / parallax (runs once)
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const nav = document.getElementById('nav');
    const navWrap = document.getElementById('navWrap');
    const onScroll = () => {
      const y = window.scrollY;
      nav?.classList.toggle('scrolled', y > 24);
      if (navWrap) navWrap.style.top = y > 24 ? '10px' : '18px';
      const sections = ['hero', 'services', 'projets', 'temoignages', 'contact'];
      let current = 'hero';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 120) current = id;
      }
      document.querySelectorAll('.nav__links a').forEach(a =>
        a.classList.toggle('active', a.getAttribute('href') === '#' + current)
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const floats = document.querySelectorAll('.hero .float');
    const onParallax = () => {
      const y = Math.min(window.scrollY, 600);
      floats.forEach((f, i) => {
        (f as HTMLElement).style.transform = `translateY(${y * ((i % 3 + 1) * 0.04)}px)`;
      });
    };
    window.addEventListener('scroll', onParallax, { passive: true });

    const handleAnchor = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return;
      const t = document.querySelector(href);
      if (!t) return;
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 40, behavior: 'smooth' });
    };
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(a => a.addEventListener('click', handleAnchor));

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onParallax);
      anchors.forEach(a => a.removeEventListener('click', handleAnchor));
      io.disconnect();
    };
  }, []);

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, var(--blue), var(--blue-glow))',
          transformOrigin: '0%',
          zIndex: 200,
        }}
      />

      {/* NAVBAR */}
      <div className="nav-wrap" id="navWrap">
        <nav className="nav" id="nav">
          <a href="#hero" className="nav__logo">
            <Image src="/logo-black.png" alt="Digitalizi" width={90} height={20} priority style={{ width: 'auto', height: '20px' }} />
          </a>
          <div className="nav__links">
            <a href="#hero" className="active">Accueil</a>
            <a href="#services">Services</a>
            <a href="#projets">Projets</a>
            <a href="#temoignages">Témoignages</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#contact" className="nav__cta">
            Échanger
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M9 7h8v8"/></svg>
          </a>
          <button className="nav__burger" aria-label="Menu">Menu</button>
        </nav>
      </div>

      {/* HERO */}
      <section className="hero" id="hero">
        <span className="float float--circle anim-drift1" style={{ left: '6%', top: '18%', width: 64, height: 64, color: 'var(--blue)' }} />
        <span className="float float--diamond anim-drift3" style={{ left: '12%', bottom: '14%', width: 46, height: 46, color: 'var(--blue-2)' }} />
        <span className="float float--dots anim-drift2" style={{ left: '2%', top: '55%', width: 120, height: 80, color: 'var(--blue)' }} />
        <span className="float float--cross anim-drift1" style={{ left: '46%', top: '14%' }} />
        <span className="float float--glow" style={{ left: '-6%', top: '35%', width: 280, height: 280, color: 'var(--blue)' }} />
        <span className="float float--circle anim-drift2" style={{ right: '7%', top: '8%', width: 38, height: 38, color: 'var(--blue-2)' }} />
        <span className="float float--dots anim-drift3" style={{ right: '0%', bottom: '18%', width: 140, height: 90, color: 'var(--blue-2)', transform: 'rotate(12deg)' }} />
        <span className="float float--glow" style={{ right: '-8%', bottom: '-10%', width: 340, height: 340, color: 'var(--blue)' }} />

        <div className="container">
          <div className="hero__grid">
            <div>
              <span className="eyebrow reveal"><span className="pill">DIGITALIZI</span>Agence IT · France · 2018</span>
              <h1 className="h-display h-display--logo reveal" data-delay="1">
                DIGITALIZI
              </h1>
              <AnimatedSlogans
                slogans={[
                  <>La tech compliquée ? On la rend <em>izi.</em></>,
                  "Votre infrastructure, entre de bonnes mains.",
                  "Transformez votre infrastructure en avantage concurrentiel.",
                  "L'infrastructure derrière les entreprises qui gagnent.",
                ]}
                className="lede reveal"
                data-delay="2"
              />
              <div className="hero__cta reveal" data-delay="3">
                <a href="#contact" className="btn btn--primary">
                  Démarrer un projet
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
                </a>
                <a href="#services" className="btn btn--ghost">Voir nos services</a>
              </div>
              <div className="hero__stats reveal" data-delay="4">
                <div className="hero__stat">
                  <div className="n"><CountUp end={330000} duration={2200} /></div>
                  <div className="l">cyberattaques PME en 2024</div>
                  <div className="hero__stat-src">ANSSI · 2025</div>
                </div>
                <div className="hero__stat">
                  <div className="n"><CountUp end={47} duration={1600} suffix="%" /></div>
                  <div className="l">entreprises FR attaquées en 2024</div>
                  <div className="hero__stat-src">CESIN × OpinionWay · 2025</div>
                </div>
                <div className="hero__stat">
                  <div className="n"><CountUp end={43} duration={1400} prefix="+" suffix="%" /></div>
                  <div className="l">TPE-PME victimes de phishing</div>
                  <div className="hero__stat-src">Cybermalveillance.gouv · 2025</div>
                </div>
              </div>
            </div>

            <div className="hero__visual reveal" data-delay="2">
              <div className="hero__card hero__card--main">
                <div className="hero__card-inner">
                  <div className="term">
                    <div className="term__head"><span /><span /><span /></div>
                    <div className="ln"><span className="c">// déploiement · production</span></div>
                    <div className="ln"><span className="k">$</span> digitalizi deploy <span className="v">--env=prod</span></div>
                    <div className="ln"><span className="c">✓ build successful · 2.4s</span></div>
                    <div className="ln"><span className="c">✓ tests passés · 248/248</span></div>
                    <div className="ln"><span className="c">✓ scan sécurité · 0 vulnérabilité</span></div>
                    <div className="ln"><span className="k">→</span> <span className="v">api.digitalizi.fr</span> en ligne <span className="cur" /></div>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 28 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Disponibilité</div>
                      <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1, marginTop: 6 }}>
                        99.98<span style={{ fontSize: 18, color: 'var(--blue-2)' }}>%</span>
                      </div>
                    </div>
                    <svg viewBox="0 0 120 50" style={{ width: 140, height: 50 }}>
                      <defs>
                        <linearGradient id="hg" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="oklch(0.58 0.18 258)" stopOpacity=".25" />
                          <stop offset="100%" stopColor="oklch(0.58 0.18 258)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,38 L15,30 L30,34 L45,22 L60,26 L75,14 L90,18 L105,8 L120,12 L120,50 L0,50 Z" fill="url(#hg)" />
                      <path d="M0,38 L15,30 L30,34 L45,22 L60,26 L75,14 L90,18 L105,8 L120,12" fill="none" stroke="oklch(0.58 0.18 258)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="hero__card hero__card--metric">
                <div className="label">Tickets résolus</div>
                <div className="num">1 248 <span className="up">▲ +18%</span></div>
                <div className="spark">
                  {[40,55,48,72,62,80,68,90,78,96].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
                </div>
              </div>
              <div className="hero__card hero__card--mini">
                <div className="row">
                  <div className="dot-ok">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <div className="t">Migration cloud</div>
                    <div className="s">Phase 3 — en cours</div>
                  </div>
                </div>
                <div className="bar"><i /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
      <div className="strip">
        <div className="container">
          <div className="strip__row">
            <div className="strip__label">Ils nous font confiance</div>
            <div className="logos">
              <b>NOVAR<i>·</i>X</b>
              <b>Atelier Loriot</b>
              <b>FLUX<i>/</i>Industrie</b>
              <b>Maison Briand</b>
              <b>Kairos Énergie</b>
              <b>Olm<i>i</i>Group</b>
              <b>EQ<i>S</i>OM</b>
              <b>IQA<i>T</i>EN</b>
            </div>
          </div>
        </div>
      </div>

      {/* PRÉSENTATION */}
      <section className="section intro" id="apropos">
        <span className="float float--circle anim-drift2" style={{ right: '8%', top: '14%', width: 80, height: 80, color: 'var(--blue)' }} />
        <span className="float float--dots anim-drift1" style={{ left: '46%', top: '6%', width: 90, height: 60, color: 'var(--blue-2)', transform: 'rotate(-8deg)' }} />
        <span className="float float--cross anim-drift3" style={{ left: '6%', bottom: '18%', color: 'var(--blue-2)' }} />
        <div className="container">
          <div className="intro__grid">
            <div>
              <span className="kicker reveal">À propos</span>
              <h2 className="h-section reveal" data-delay="1">
                Une équipe technique <em style={{ color: 'var(--blue-2)', fontStyle: 'normal' }}>au service de votre activité.</em>
              </h2>
              <p className="lede reveal" data-delay="2" style={{ marginTop: 22, maxWidth: 560 }}>
                Digitalizi réunit développeurs, architectes systèmes et experts cybersécurité autour d&apos;une conviction simple : la technologie doit servir des objectifs business clairs. Pas de complexité inutile, pas de surcouches — des solutions concrètes qui s&apos;intègrent à votre organisation.
              </p>
              <div className="intro__points">
                {[
                  { icon: <path d="M12 2L3 7v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V7l-9-5z"/>, t: 'Pragmatisme avant tout', p: 'Nous partons de votre métier, pas de la technologie. Chaque choix est justifié par un impact mesurable.' },
                  { icon: <><path d="M12 8v8"/><path d="M8 12h8"/><circle cx="12" cy="12" r="10"/></>, t: 'Engagement long terme', p: 'Nos clients restent en moyenne 4 ans avec nous. Nous construisons des partenariats, pas des prestations.' },
                  { icon: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 010 18"/><path d="M12 3a14 14 0 000 18"/></>, t: 'Standards européens', p: 'Hébergement souverain, conformité RGPD native, équipes basées en France et au Maroc.' },
                ].map((pt, i) => (
                  <div key={i} className="ipoint reveal" data-delay={String(3 + i)}>
                    <div className="ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{pt.icon}</svg>
                    </div>
                    <div><h4>{pt.t}</h4><p>{pt.p}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="intro__visual reveal" data-delay="2">
              <div className="intro__photo"><span>// photo équipe — atelier R&amp;D</span></div>
              <div className="intro__photo intro__photo--alt"><span>// salle serveurs — site Paris</span></div>
              <div className="intro__badge">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>
                </div>
                <div>
                  <div className="n">42 experts</div>
                  <div className="l">Certifiés AWS · Azure · ISO 27001</div>
                </div>
              </div>
              <span className="float float--circle" style={{ right: '-2%', top: '6%', width: 52, height: 52, color: 'var(--blue)' }} />
              <span className="float float--diamond" style={{ left: '-3%', bottom: '6%', width: 36, height: 36, color: 'var(--blue-2)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <ServicesOrbital />

      {/* POURQUOI NOUS */}
      <section className="section why" id="pourquoi">
        <span className="float float--circle anim-drift1" style={{ left: '4%', top: '18%', width: 54, height: 54, color: 'var(--blue)' }} />
        <span className="float float--dots anim-drift2" style={{ right: '4%', bottom: '14%', width: 120, height: 80, color: 'var(--blue-2)', transform: 'rotate(-6deg)' }} />
        <div className="container">
          <div className="why__layout">
            <div>
              <span className="kicker reveal">Pourquoi Digitalizi</span>
              <h2 className="h-section reveal" data-delay="1">Une méthode simple, <em style={{ color: 'var(--blue-2)', fontStyle: 'normal' }}>des résultats vérifiables.</em></h2>
              <p className="lede reveal" data-delay="2" style={{ marginTop: 18, maxWidth: 520, marginBottom: 36 }}>
                Nous ne vendons pas de promesses, nous livrons des solutions opérationnelles. Chaque mission s&apos;appuie sur des engagements mesurables et une transparence totale sur l&apos;avancement.
              </p>
              <div className="why__list">
                {[
                  { n: '01', t: 'Approche simple', s: 'Un langage clair, sans jargon. Vous comprenez ce qui est fait et pourquoi.' },
                  { n: '02', t: 'Solutions concrètes', s: 'Des livrables testés, documentés, transférables. Aucune dépendance imposée.' },
                  { n: '03', t: 'Résultats mesurables', s: 'Indicateurs définis dès le cadrage. Reporting hebdomadaire, sans surprise.' },
                  { n: '04', t: 'Accompagnement moderne', s: 'Outils collaboratifs partagés, dashboards en temps réel, équipe joignable en continu.' },
                ].map((row, i) => (
                  <div key={i} className={`wrow reveal${activeRow === i ? ' active' : ''}`} data-delay={String(3 + i)} onClick={() => setActiveRow(i)}>
                    <span className="wrow__num">{row.n}</span>
                    <div><h4 className="wrow__t">{row.t}</h4><p className="wrow__sub">{row.s}</p></div>
                    <span className="wrow__arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="why__panel reveal" data-delay="3">
              <div className="why__panel__chart">
                <div className="head">
                  <div><div className="t">Délai moyen de mise en production</div><div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>12 derniers mois</div></div>
                  <span className="pill">−38%</span>
                </div>
                <svg viewBox="0 0 320 140" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="wg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.58 0.18 258)" stopOpacity=".25" />
                      <stop offset="100%" stopColor="oklch(0.58 0.18 258)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g stroke="#eef2fa" strokeWidth="1"><line x1="0" y1="30" x2="320" y2="30" /><line x1="0" y1="70" x2="320" y2="70" /><line x1="0" y1="110" x2="320" y2="110" /></g>
                  <path d="M0,40 C40,55 60,30 100,50 C140,72 160,90 200,80 C240,70 270,108 320,100 L320,140 L0,140 Z" fill="url(#wg)" />
                  <path d="M0,40 C40,55 60,30 100,50 C140,72 160,90 200,80 C240,70 270,108 320,100" fill="none" stroke="oklch(0.58 0.18 258)" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="320" cy="100" r="5" fill="#fff" stroke="oklch(0.58 0.18 258)" strokeWidth="2.4" />
                </svg>
              </div>
              <div className="why__panel__stats">
                <div><div className="v">4.9<span style={{ fontSize: 14, color: 'var(--muted)' }}>/5</span></div><div className="l">Satisfaction client</div></div>
                <div><div className="v">&lt; 2h</div><div className="l">Délai de réponse</div></div>
              </div>
              <span className="float float--circle anim-drift1" style={{ right: '-4%', top: '-4%', width: 60, height: 60, color: 'var(--blue)' }} />
              <span className="float float--cross anim-drift2" style={{ left: '14%', top: '50%', color: 'var(--blue-2)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section className="section projets" id="projets">
        <span className="float float--dots anim-drift1" style={{ left: '4%', top: '6%', width: 140, height: 90, color: 'var(--blue-2)', transform: 'rotate(10deg)' }} />
        <span className="float float--diamond anim-drift3" style={{ right: '4%', top: '18%', width: 42, height: 42, color: 'var(--blue)' }} />
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker reveal">Études de cas</span>
              <h2 className="h-section reveal" data-delay="1">Trois projets, <em style={{ color: 'var(--blue-2)', fontStyle: 'normal' }}>trois impacts mesurés.</em></h2>
            </div>
            <p className="section-head__lede reveal" data-delay="2">Nos clients viennent avec un problème, repartent avec un système qui tourne. Voici comment.</p>
          </div>
          <div className="pcards">
            <article className="pcard reveal">
              <div className="pcard__cover pcard__cover--a">
                <span className="pcard__tag">Industrie</span>
                <div className="pcard__cover-art">
                  <svg className="cov-art-graph" viewBox="0 0 200 120">
                    <g stroke="oklch(0.58 0.18 258)" strokeWidth="2" fill="none" strokeLinecap="round">
                      <path d="M10,90 L40,70 L70,80 L100,40 L130,55 L160,30 L190,40" />
                      <path d="M10,100 L40,95 L70,85 L100,75 L130,72 L160,62 L190,58" opacity=".4" />
                    </g>
                    <g fill="var(--blue-2)">
                      {[[10,90],[40,70],[70,80],[100,40],[130,55],[160,30],[190,40]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r={i===6?4:3} />)}
                    </g>
                  </svg>
                </div>
              </div>
              <div className="pcard__body">
                <h3>Supervision usine 4.0</h3>
                <div className="pcard__client">Kairos Énergie · Tours</div>
                <dl className="pcard__rows">
                  <div className="pcard__row"><dt>Contexte</dt><dd>3 sites de production, données dispersées sur 14 systèmes hétérogènes.</dd></div>
                  <div className="pcard__row"><dt>Problème</dt><dd>Aucune vision unifiée des arrêts machines, rapports manuels chronophages.</dd></div>
                  <div className="pcard__row"><dt>Solution</dt><dd>Plateforme temps réel avec connecteurs OPC-UA, dashboards opérateur sur tablettes.</dd></div>
                  <div className="pcard__row"><dt>Résultat</dt><dd><b>−27% d&apos;arrêts non planifiés</b> en 6 mois, retour sur investissement en 14 mois.</dd></div>
                </dl>
              </div>
            </article>
            <article className="pcard reveal" data-delay="1">
              <div className="pcard__cover pcard__cover--b">
                <span className="pcard__tag" style={{ background: 'rgba(255,255,255,.18)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}>Finance</span>
                <div className="pcard__cover-art"><div className="cov-art-shield" /></div>
              </div>
              <div className="pcard__body">
                <h3>Mise en conformité PCI-DSS</h3>
                <div className="pcard__client">Maison Briand · Paris</div>
                <dl className="pcard__rows">
                  <div className="pcard__row"><dt>Contexte</dt><dd>Expansion e-commerce et obligation de certification sous 9 mois.</dd></div>
                  <div className="pcard__row"><dt>Problème</dt><dd>Architecture legacy, dette technique, audit interne révélant 38 écarts.</dd></div>
                  <div className="pcard__row"><dt>Solution</dt><dd>Refonte de la zone paiement, segmentation réseau, supervision SIEM 24/7.</dd></div>
                  <div className="pcard__row"><dt>Résultat</dt><dd><b>Certification obtenue en 7 mois</b>, zéro incident depuis 18 mois.</dd></div>
                </dl>
              </div>
            </article>
            <article className="pcard reveal" data-delay="2">
              <div className="pcard__cover pcard__cover--c">
                <span className="pcard__tag">Logistique</span>
                <div className="pcard__cover-art"><div className="cov-art-rings"><i /></div></div>
              </div>
              <div className="pcard__body">
                <h3>Plateforme logistique unifiée</h3>
                <div className="pcard__client">FLUX/Industrie · Lyon</div>
                <dl className="pcard__rows">
                  <div className="pcard__row"><dt>Contexte</dt><dd>4 entrepôts, 120 chauffeurs, planification réalisée sur tableurs partagés.</dd></div>
                  <div className="pcard__row"><dt>Problème</dt><dd>Tournées sous-optimisées, retards client en hausse, coût km en dérive.</dd></div>
                  <div className="pcard__row"><dt>Solution</dt><dd>Application mobile chauffeur + moteur d&apos;optimisation, API transporteurs.</dd></div>
                  <div className="pcard__row"><dt>Résultat</dt><dd><b>+22% de tournées réalisées</b> à effectif constant, NPS client +31 points.</dd></div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA FINAL */}
      <section className="cta" id="contact">
        <div className="container">
          <div className="cta__inner reveal">
            <span className="float float--circle anim-drift1" style={{ right: '8%', top: '14%', width: 90, height: 90, color: '#fff', opacity: .2 }} />
            <span className="float float--dots anim-drift2" style={{ left: '6%', bottom: '8%', width: 120, height: 80, color: '#fff', opacity: .18 }} />
            <span className="float float--diamond anim-drift3" style={{ right: '18%', bottom: '12%', width: 46, height: 46, color: '#fff', opacity: .25 }} />
            <span className="float float--glow" style={{ right: '-10%', top: '-20%', width: 380, height: 380, color: 'oklch(0.78 0.14 255)' }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="kicker" style={{ color: 'oklch(0.85 0.14 255)' }}>Démarrons</span>
              <h2>Un projet en tête ? <em>Parlons-en.</em></h2>
              <p>Un appel de 30 minutes pour comprendre votre besoin, sans engagement. On vous propose ensuite une approche concrète et chiffrée — ou on vous oriente ailleurs si ce n&apos;est pas notre métier.</p>
            </div>
            <div className="cta__right">
              <a href="tel:+33146724193" className="btn btn--primary">
                Nous contacter
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
              </a>
              <a href="tel:+33146724193" className="cta__phone">
                <span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.93.37 1.84.72 2.71a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.37-1.37a2 2 0 012.11-.45c.87.35 1.78.59 2.71.72A2 2 0 0122 16.92z"/></svg></span>
                <span><div className="l">Téléphone</div><div className="n">01 46 72 41 93</div></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot">
        <div className="container">
          <div className="foot__row">
            <div className="foot__brand">
              <Image src="/logo-black.png" alt="Digitalizi" width={90} height={22} style={{ width: 'auto', height: '22px' }} />
            </div>
            <div className="foot__contact">
              <a href="tel:+33146724193">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.93.37 1.84.72 2.71a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.37-1.37a2 2 0 012.11-.45c.87.35 1.78.59 2.71.72A2 2 0 0122 16.92z"/></svg>
                01 46 72 41 93
              </a>
              <a href="mailto:contact@digitalizi.fr">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                contact@digitalizi.fr
              </a>
            </div>
          </div>
          <div className="foot__copy">
            <span>© 2026 Digitalizi — Tous droits réservés.</span>
            <span>SIRET 894 217 503 00018 · Paris &amp; Casablanca</span>
          </div>
        </div>
      </footer>

    </>
  );
}
