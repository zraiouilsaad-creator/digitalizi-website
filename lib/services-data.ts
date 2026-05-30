import { Code2, Layers, Database, ShieldCheck, Globe, RefreshCw, Settings, type LucideIcon } from "lucide-react";

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface Service {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  benefits: ServiceBenefit[];
  steps: ServiceStep[];
  stats: ServiceStat[];
  cta: string;
}

export const services: Service[] = [
  {
    id: 1,
    slug: "dev-logiciel",
    title: "Développement logiciel",
    tagline: "Des applications métier qui tiennent la charge.",
    description:
      "Nous concevons et développons des logiciels sur mesure adaptés à vos processus internes, vos contraintes techniques et vos objectifs de croissance. De l'architecture initiale au déploiement en production, chaque étape est documentée, testée et livrée avec un code maintenable sur le long terme.",
    icon: Code2,
    color: "oklch(0.58 0.18 258)",
    benefits: [
      { title: "Architecture évolutive", description: "Conception modulaire qui s'adapte à votre croissance sans refonte complète." },
      { title: "Code de qualité", description: "Tests automatisés, revues de code et documentation technique à chaque livraison." },
      { title: "Intégration continue", description: "Pipelines CI/CD pour des déploiements fiables, fréquents et sans stress." },
      { title: "Maintenance incluse", description: "Support post-livraison et évolutions inclus pendant 3 mois minimum." },
    ],
    steps: [
      { number: "01", title: "Cadrage", description: "Analyse de vos besoins, contraintes et objectifs. Rédaction du cahier des charges fonctionnel." },
      { number: "02", title: "Architecture", description: "Choix des technologies, conception de la base de données et des API." },
      { number: "03", title: "Développement itératif", description: "Sprints de 2 semaines avec démos régulières. Vous voyez l'avancement en continu." },
      { number: "04", title: "Déploiement & transfert", description: "Mise en production, formation de vos équipes et documentation complète." },
    ],
    stats: [
      { value: "+120", label: "Applications livrées" },
      { value: "98%", label: "Clients satisfaits" },
      { value: "< 6 mois", label: "Time-to-market moyen" },
    ],
    cta: "Décrire votre projet",
  },
  {
    id: 2,
    slug: "integration-systemes",
    title: "Intégration de systèmes",
    tagline: "Vos outils connectés, enfin.",
    description:
      "ERP, CRM, plateformes e-commerce, IoT, logiciels métier — votre écosystème applicatif doit fonctionner comme un tout cohérent. Nous concevons les connecteurs, API et middleware qui font communiquer vos systèmes sans friction, en temps réel ou en batch selon vos contraintes.",
    icon: Layers,
    color: "oklch(0.55 0.16 240)",
    benefits: [
      { title: "Zéro ressaisie manuelle", description: "Les données circulent automatiquement entre vos systèmes." },
      { title: "API robustes", description: "Interfaces RESTful ou GraphQL documentées, versionnées et sécurisées." },
      { title: "Monitoring temps réel", description: "Tableau de bord d'état des flux avec alertes en cas d'anomalie." },
      { title: "Rétrocompatibilité", description: "Intégration sans rupture avec vos systèmes existants, legacy inclus." },
    ],
    steps: [
      { number: "01", title: "Cartographie", description: "Audit de votre SI existant, recensement des flux de données et des points de connexion." },
      { number: "02", title: "Conception", description: "Design des API, choix des protocoles et modélisation des flux." },
      { number: "03", title: "Développement", description: "Création des connecteurs et tests unitaires, d'intégration et de charge." },
      { number: "04", title: "Mise en production", description: "Bascule progressive, monitoring et formation de vos équipes." },
    ],
    stats: [
      { value: "48h", label: "Délai de diagnostic" },
      { value: "99.5%", label: "Disponibilité des flux" },
      { value: "−60%", label: "Erreurs de saisie" },
    ],
    cta: "Analyser votre SI",
  },
  {
    id: 3,
    slug: "bases-de-donnees",
    title: "Gestion de bases de données",
    tagline: "Vos données accessibles, performantes et sécurisées.",
    description:
      "Une base de données mal conçue est le premier frein à la croissance d'une entreprise. Nous intervenons sur la modélisation, l'optimisation des requêtes, les migrations complexes et la mise en place de stratégies de sauvegarde et de haute disponibilité.",
    icon: Database,
    color: "oklch(0.52 0.14 270)",
    benefits: [
      { title: "Modélisation rigoureuse", description: "Schémas normalisés adaptés à vos cas d'usage réels." },
      { title: "Optimisation des performances", description: "Indexation, réécriture de requêtes, partitionnement — jusqu'à ×10 de gain." },
      { title: "Migrations sans risque", description: "Procédures de migration testées avec rollback automatique." },
      { title: "Haute disponibilité", description: "Réplication, failover et sauvegardes automatisées testées régulièrement." },
    ],
    steps: [
      { number: "01", title: "Audit", description: "Analyse des requêtes lentes, du schéma et de la stratégie de sauvegarde actuelle." },
      { number: "02", title: "Plan d'optimisation", description: "Priorisation des actions par impact sur vos métriques métier." },
      { number: "03", title: "Mise en œuvre", description: "Modifications progressives avec tests de non-régression à chaque étape." },
      { number: "04", title: "Monitoring continu", description: "Mise en place d'alertes et tableau de bord de santé de votre base." },
    ],
    stats: [
      { value: "×10", label: "Gain de performance moyen" },
      { value: "0", label: "Perte de données depuis 2018" },
      { value: "99.99%", label: "Disponibilité garantie" },
    ],
    cta: "Auditer ma base de données",
  },
  {
    id: 4,
    slug: "cybersecurite",
    title: "Cybersécurité",
    tagline: "Anticipez les menaces. Protégez vos actifs.",
    description:
      "330 000 cyberattaques réussies contre des PME françaises en 2024. Votre entreprise est une cible. Nous réalisons des audits de sécurité complets, mettons en place les mesures de durcissement adaptées à votre contexte et assurons une supervision continue de vos systèmes.",
    icon: ShieldCheck,
    color: "oklch(0.50 0.18 15)",
    benefits: [
      { title: "Audit de vulnérabilités", description: "Tests d'intrusion, analyse de code et revue d'architecture." },
      { title: "Conformité réglementaire", description: "RGPD, NIS2, PCI-DSS, ISO 27001 — nous connaissons les référentiels." },
      { title: "Supervision SIEM", description: "Détection d'intrusion en temps réel et réponse aux incidents." },
      { title: "Formation des équipes", description: "Sensibilisation au phishing et aux bonnes pratiques pour vos collaborateurs." },
    ],
    steps: [
      { number: "01", title: "Audit initial", description: "Cartographie de vos actifs, identification des vulnérabilités critiques." },
      { number: "02", title: "Plan de remédiation", description: "Priorisation des corrections par risque et impact business." },
      { number: "03", title: "Durcissement", description: "Mise en place des mesures techniques et organisationnelles." },
      { number: "04", title: "Supervision continue", description: "Monitoring 24/7, alertes et rapport mensuel de sécurité." },
    ],
    stats: [
      { value: "0", label: "Incident majeur chez nos clients" },
      { value: "< 2h", label: "Temps de réponse incident" },
      { value: "100%", label: "Clients conformes post-audit" },
    ],
    cta: "Demander un audit de sécurité",
  },
  {
    id: 5,
    slug: "dev-web",
    title: "Développement web",
    tagline: "Sites et plateformes qui convertissent.",
    description:
      "Du site vitrine au portail client en passant par les plateformes SaaS, nous développons des interfaces web performantes, accessibles et optimisées pour le référencement. Design soigné, code propre, scores Core Web Vitals au vert.",
    icon: Globe,
    color: "oklch(0.55 0.16 165)",
    benefits: [
      { title: "Performance native", description: "Score Lighthouse 90+ garanti. Temps de chargement < 2s." },
      { title: "Accessibilité WCAG", description: "Conformité WCAG 2.1 AA pour toucher l'ensemble de vos utilisateurs." },
      { title: "SEO technique", description: "Structure sémantique, métadonnées et performance au service de votre visibilité." },
      { title: "CMS sur mesure", description: "Interface d'administration intuitive pour que vos équipes gèrent le contenu." },
    ],
    steps: [
      { number: "01", title: "Design & UX", description: "Maquettes Figma validées avec vous avant le premier composant développé." },
      { number: "02", title: "Développement", description: "Next.js / React pour le front, API headless ou CMS selon vos besoins." },
      { number: "03", title: "Tests & optimisation", description: "Tests cross-browser, audit d'accessibilité et optimisation des performances." },
      { number: "04", title: "Lancement & SEO", description: "Mise en ligne, soumission aux moteurs et suivi des performances." },
    ],
    stats: [
      { value: "90+", label: "Score Lighthouse moyen" },
      { value: "< 2s", label: "Temps de chargement" },
      { value: "+35%", label: "Conversion moyenne post-refonte" },
    ],
    cta: "Discuter de mon projet web",
  },
  {
    id: 6,
    slug: "automatisation",
    title: "Automatisation",
    tagline: "Libérez vos équipes des tâches répétitives.",
    description:
      "Saisie manuelle, rapports hebdomadaires, relances clients, synchronisation de données — toutes ces tâches chronophages peuvent être automatisées. Nous identifions les processus à fort potentiel et construisons les robots et workflows qui les remplacent.",
    icon: RefreshCw,
    color: "oklch(0.55 0.16 130)",
    benefits: [
      { title: "ROI rapide", description: "La plupart des automatisations s'amortissent en moins de 3 mois." },
      { title: "Zéro erreur humaine", description: "Processus standardisés et reproductibles à l'infini." },
      { title: "Scalabilité immédiate", description: "Gérez 10x plus de volume sans recruter." },
      { title: "Intégration avec l'existant", description: "Compatible avec vos outils actuels — pas besoin de tout changer." },
    ],
    steps: [
      { number: "01", title: "Cartographie des processus", description: "Identification des tâches répétitives et calcul du gain potentiel." },
      { number: "02", title: "Priorisation", description: "Sélection des automatisations au meilleur ratio impact/effort." },
      { number: "03", title: "Développement", description: "RPA, scripts Python, workflows n8n ou Make selon le cas." },
      { number: "04", title: "Formation & transfert", description: "Vos équipes reprennent la main sur leurs nouveaux outils." },
    ],
    stats: [
      { value: "−30%", label: "Temps opérationnel libéré" },
      { value: "3 mois", label: "ROI moyen" },
      { value: "×5", label: "Volume traité sans recrutement" },
    ],
    cta: "Identifier mes automatisations",
  },
  {
    id: 7,
    slug: "conseil-it",
    title: "Conseil IT & stratégie",
    tagline: "La feuille de route qui aligne tech et business.",
    description:
      "Avant d'investir dans la technologie, il faut savoir où aller. Nous auditons votre système d'information, identifions les points de friction et les risques, puis co-construisons avec vous une feuille de route IT sur 18 mois — réaliste, priorisée et alignée sur vos objectifs métier.",
    icon: Settings,
    color: "oklch(0.50 0.14 290)",
    benefits: [
      { title: "Vision 360° de votre SI", description: "Cartographie complète de vos systèmes, flux et dépendances." },
      { title: "Priorisation par valeur", description: "Chaque recommandation est associée à un ROI estimé et un niveau de risque." },
      { title: "Accompagnement décisionnel", description: "Nous éclairons vos choix techniques — vous gardez la main sur les décisions." },
      { title: "Plan d'action concret", description: "Pas de rapport de 200 pages. Un plan actionnable, quartier par quartier." },
    ],
    steps: [
      { number: "01", title: "Immersion", description: "Entretiens avec vos équipes, revue de l'existant, identification des irritants." },
      { number: "02", title: "Diagnostic", description: "Analyse des risques, des coûts cachés et des opportunités manquées." },
      { number: "03", title: "Feuille de route", description: "Plan à 18 mois avec jalons, budget estimé et indicateurs de succès." },
      { number: "04", title: "Suivi trimestriel", description: "Revues régulières pour ajuster le cap selon l'évolution de votre activité." },
    ],
    stats: [
      { value: "18 mois", label: "Horizon de planification" },
      { value: "4.9/5", label: "Satisfaction client" },
      { value: "−40%", label: "Coûts IT évités en moyenne" },
    ],
    cta: "Réserver un audit stratégique",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
