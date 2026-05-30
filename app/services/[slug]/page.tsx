import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { services, getServiceBySlug } from "@/lib/services-data";

export function generateStaticParams() {
  return services.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service introuvable" };
  return {
    title: `${service.title} — Digitalizi`,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const currentIndex = services.findIndex(s => s.slug === slug);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font-manrope, system-ui)" }}>

      {/* ── MINI NAVBAR ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(246,248,253,.88)",
        backdropFilter: "saturate(160%) blur(14px)",
        borderBottom: "1px solid var(--line)",
        padding: "16px 0",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>
            <img src="/logo-black.png" alt="Digitalizi" style={{ height: 20, width: "auto" }} />
          </Link>
          <Link
            href="/#services"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 14, fontWeight: 600, color: "var(--ink-2)",
              padding: "8px 16px", borderRadius: 999,
              border: "1px solid var(--line)",
              background: "#fff",
              transition: "all .2s",
            }}
          >
            <ArrowLeft size={14} /> Tous les services
          </Link>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        padding: "80px 0 64px",
        background: `radial-gradient(900px 400px at 70% 0%, ${service.color}18, transparent 70%), var(--bg)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Floating shape */}
        <div style={{
          position: "absolute", right: "-4%", top: "10%",
          width: 320, height: 320, borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, ${service.color}20, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div className="container">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28,
            padding: "6px 14px 6px 8px", borderRadius: 999, background: "#fff",
            border: "1px solid var(--line)", fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>
            <span style={{ background: service.color, color: "#fff", padding: "3px 10px", borderRadius: 999, fontSize: 11, letterSpacing: ".04em" }}>
              SERVICE
            </span>
            {String(service.id).padStart(2, "0")} / 07
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "flex-start" }}>
            <div>
              <div style={{
                width: 64, height: 64, borderRadius: 20, marginBottom: 24,
                background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 12px 32px -8px ${service.color}66`,
              }}>
                <Icon size={28} color="#fff" strokeWidth={1.6} />
              </div>
              <h1 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-.025em", lineHeight: 1.02, margin: "0 0 16px", color: "var(--ink)" }}>
                {service.title}
              </h1>
              <p style={{ fontSize: 22, color: "var(--ink-2)", fontWeight: 500, margin: "0 0 28px", maxWidth: 540 }}>
                {service.tagline}
              </p>
              <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.7, maxWidth: 620, margin: 0 }}>
                {service.description}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 180 }}>
              {service.stats.map((stat, i) => (
                <div key={i} style={{
                  background: "#fff", border: "1px solid var(--line)", borderRadius: 20,
                  padding: "20px 24px", boxShadow: "var(--shadow-sm)",
                }}>
                  <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-.02em", color: service.color }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".07em", marginTop: 4 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: "80px 0", background: "#fff", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12.5, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: service.color }}>
              <span style={{ width: 28, height: 2, background: service.color, borderRadius: 2, display: "inline-block" }} />
              Ce que vous gagnez
            </span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.07, margin: "14px 0 0", color: "var(--ink)" }}>
              Des résultats concrets, pas des promesses.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {service.benefits.map((b, i) => (
              <div key={i} style={{
                background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 20,
                padding: "28px 24px",
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: service.color, marginBottom: 18,
                  boxShadow: `0 0 0 4px ${service.color}22`,
                }} />
                <h3 style={{ margin: "0 0 10px", fontSize: 17, fontWeight: 700, letterSpacing: "-.01em", color: "var(--ink)" }}>
                  {b.title}
                </h3>
                <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6 }}>
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section style={{ padding: "80px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12.5, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: service.color }}>
              <span style={{ width: 28, height: 2, background: service.color, borderRadius: 2, display: "inline-block" }} />
              Notre méthode
            </span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.07, margin: "14px 0 0", color: "var(--ink)" }}>
              Comment nous travaillons.
            </h2>
          </div>
          <div style={{ display: "grid", gap: 16 }}>
            {service.steps.map((step, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "80px 1fr", gap: 24, alignItems: "center",
                background: "#fff", border: "1px solid var(--line)", borderRadius: 20,
                padding: "28px 32px",
                transition: "box-shadow .25s",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: `${service.color}15`,
                  border: `2px solid ${service.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-jetbrains-mono, monospace)", fontWeight: 700,
                  fontSize: 17, color: service.color,
                }}>
                  {step.number}
                </div>
                <div>
                  <h4 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, letterSpacing: "-.01em", color: "var(--ink)" }}>
                    {step.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: 14.5, color: "var(--muted)", lineHeight: 1.55 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 0 100px", background: "#fff", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div style={{
            background: `linear-gradient(135deg, var(--navy) 0%, oklch(0.28 0.10 262) 60%, ${service.color} 140%)`,
            borderRadius: 32, padding: "64px 60px",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center",
            boxShadow: `0 0 0 1px ${service.color}44, 0 0 40px ${service.color}18, 0 32px 64px -20px rgba(11,21,48,.55)`,
          }}>
            <div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-.025em", color: "#fff", lineHeight: 1.1 }}>
                Prêt à démarrer ?
              </h2>
              <p style={{ margin: 0, fontSize: 17, color: "#b9c4e6", lineHeight: 1.6, maxWidth: 480 }}>
                Un appel de 30 minutes pour valider si nous sommes le bon partenaire pour votre projet.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
              <Link href="/#contact" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "16px 28px", borderRadius: 999,
                background: "#fff", color: "var(--ink)",
                fontWeight: 700, fontSize: 15, textDecoration: "none",
              }}>
                {service.cta}
                <ArrowRight size={16} />
              </Link>
              <a href="tel:+33146724193" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                color: "#fff", fontSize: 15, fontWeight: 500, textDecoration: "none",
              }}>
                <Phone size={14} />
                01 46 72 41 93
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT SERVICE ── */}
      <div style={{ background: "var(--bg)", borderTop: "1px solid var(--line)", padding: "32px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
            Service suivant
          </span>
          <Link href={`/services/${nextService.slug}`} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 22px", borderRadius: 999, background: "#fff",
            border: "1px solid var(--line)", color: "var(--ink)",
            fontWeight: 600, fontSize: 15, textDecoration: "none",
          }}>
            {nextService.title} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
