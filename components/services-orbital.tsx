"use client";
import RadialOrbitalTimeline, { type OrbitalItem } from "@/components/ui/radial-orbital-timeline";
import { Code2, Layers, Database, ShieldCheck, Globe, RefreshCw, Settings } from "lucide-react";

const services: OrbitalItem[] = [
  { id: 1, slug: "dev-logiciel",         title: "Dev logiciel",    description: "Applications métier sur mesure, conçues pour évoluer avec votre activité et tenir la charge.", icon: Code2,      relatedIds: [2, 7] },
  { id: 2, slug: "integration-systemes", title: "Intégration SI",  description: "Connectez vos outils existants — ERP, CRM, IoT — en un écosystème cohérent et fiable.", icon: Layers,      relatedIds: [1, 3] },
  { id: 3, slug: "bases-de-donnees",     title: "Bases de données",description: "Modélisation, performance et migrations — vos données accessibles et toujours sous contrôle.", icon: Database,    relatedIds: [2, 4] },
  { id: 4, slug: "cybersecurite",        title: "Cybersécurité",   description: "Audits, durcissement et supervision continue. Anticipez les menaces avant qu'elles n'arrivent.", icon: ShieldCheck, relatedIds: [3, 7] },
  { id: 5, slug: "dev-web",              title: "Dev web",         description: "Sites vitrines, plateformes SaaS, portails clients — performance, accessibilité, design soigné.", icon: Globe,       relatedIds: [1, 6] },
  { id: 6, slug: "automatisation",       title: "Automatisation",  description: "Robotisez vos processus répétitifs. Vos équipes se concentrent sur ce qui compte vraiment.", icon: RefreshCw,   relatedIds: [5, 7] },
  { id: 7, slug: "conseil-it",           title: "Conseil IT",      description: "Audit de votre SI, feuille de route à 18 mois, accompagnement décisionnel — vous gardez la main.", icon: Settings,    relatedIds: [1, 4, 6] },
];

export default function ServicesOrbital() {
  return (
    <section className="section services" id="services">
      <span className="float float--dots anim-drift1" style={{ left: "2%", top: "8%", width: 140, height: 90, color: "var(--blue)", transform: "rotate(8deg)" }} />
      <span className="float float--circle anim-drift2" style={{ right: "6%", top: "14%", width: 48, height: 48, color: "var(--blue-2)" }} />
      <span className="float float--glow" style={{ right: "-8%", top: "30%", width: 340, height: 340, color: "var(--blue)" }} />
      <span className="float float--diamond anim-drift3" style={{ left: "8%", bottom: "8%", width: 42, height: 42, color: "var(--blue)" }} />

      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker reveal">Services</span>
            <h2 className="h-section reveal" data-delay="1">
              Sept expertises pour{" "}
              <em style={{ color: "var(--blue-2)", fontStyle: "normal" }}>accélérer votre transformation.</em>
            </h2>
          </div>
          <p className="section-head__lede reveal" data-delay="2">
            Survolez un service pour en savoir plus. Un seul interlocuteur pour vos projets logiciels, données, infrastructure et sécurité.
          </p>
        </div>

        <RadialOrbitalTimeline items={services} />
      </div>
    </section>
  );
}
