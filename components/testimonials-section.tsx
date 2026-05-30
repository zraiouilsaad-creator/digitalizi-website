"use client";
import { motion } from "motion/react";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";

const testimonials: Testimonial[] = [
  {
    text: "Digitalizi a transformé notre infrastructure cloud en 3 mois. Résultats immédiats sur la performance et la sécurité de nos systèmes.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Thomas Mercier",
    role: "DSI, Kairos Énergie",
  },
  {
    text: "Une équipe réactive et experte. Notre projet de conformité PCI-DSS a été mené avec une rigueur et une transparence exemplaires.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sophie Laborde",
    role: "Directrice Technique, Maison Briand",
  },
  {
    text: "L'automatisation de nos processus nous a fait gagner 30 % de productivité. Retour sur investissement atteint en moins de 6 mois.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    name: "Karim Benali",
    role: "CEO, FLUX/Industrie",
  },
  {
    text: "Digitalizi parle notre langage métier. Pas de jargon inutile, des solutions concrètes qui s'intègrent parfaitement à notre organisation.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Marie Fontaine",
    role: "COO, Atelier Loriot",
  },
  {
    text: "Migration de notre ERP réalisée sans interruption de service. Un professionnalisme remarquable à chaque étape du projet.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    name: "Pierre Dupont",
    role: "Responsable SI, NOVAR·X",
  },
  {
    text: "Le dashboard temps réel livré par Digitalizi a révolutionné notre pilotage opérationnel. Un outil devenu indispensable en quelques semaines.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Isabelle Moreau",
    role: "Directrice Opérations, OlmiGroup",
  },
  {
    text: "Accompagnement de qualité, de l'audit initial jusqu'au déploiement en production. Un partenaire de confiance sur le long terme.",
    image: "https://randomuser.me/api/portraits/men/88.jpg",
    name: "Alexis Bernard",
    role: "CTO, Kairos Énergie",
  },
  {
    text: "Notre plateforme SaaS développée en 4 mois avec une qualité de code irréprochable. L'équipe a su s'adapter à nos contraintes métier.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Claire Petit",
    role: "Product Manager, Maison Briand",
  },
  {
    text: "Cybersécurité renforcée, zéro incident depuis 18 mois. L'investissement avec Digitalizi en vaut largement la peine.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "Nicolas Lambert",
    role: "RSSI, FLUX/Industrie",
  },
];

const firstColumn  = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn  = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  return (
    <section id="temoignages" className="section" style={{ background: "var(--bg)", overflow: "hidden" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center max-w-[540px] mx-auto mb-14"
        >
          <span className="kicker" style={{ justifyContent: "center" }}>Témoignages</span>
          <h2 className="h-section" style={{ textAlign: "center", marginTop: "12px" }}>
            Ce que disent nos <em style={{ color: "var(--blue-2)", fontStyle: "normal" }}>clients.</em>
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "16px", marginTop: "16px", lineHeight: 1.6 }}>
            Des entreprises de toutes tailles nous font confiance pour leurs projets critiques.
          </p>
        </motion.div>
      </div>

      <div
        className="flex justify-center gap-6"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          maxHeight: "740px",
          overflow: "hidden",
        }}
      >
        <TestimonialsColumn testimonials={firstColumn}  duration={18} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={22} />
        <TestimonialsColumn testimonials={thirdColumn}  className="hidden lg:block" duration={20} />
      </div>
    </section>
  );
}
