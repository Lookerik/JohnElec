// ============================================
// PROJECTS DATA
// Pour ajouter un projet : copiez un bloc {...} et modifiez les valeurs.
// Pour ajouter/retirer des images : modifiez le tableau "images".
// Catégories possibles pour chaque image : "avant", "pendant", "apres" (ou omettez "category").
// ============================================

const PROJECTS = [
  {
    id: 1,
    title: "Mise aux normes électriques",
    date: "Mars 2026",
    description: "Remplacement complet du tableau électrique vétuste par une installation conforme aux normes en vigueur, avec mise à la terre et protections différentielles.",
    cover: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80", category: "avant" },
      { src: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80", category: "pendant" },
      { src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1400&q=80", category: "apres" }
    ]
  },
  {
    id: 2,
    title: "Rénovation appartement parisien",
    date: "Février 2026",
    description: "Rénovation complète du circuit électrique d'un appartement haussmannien, avec création de nouveaux points lumineux et prises.",
    cover: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=900&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?auto=format&fit=crop&w=1400&q=80", category: "avant" },
      { src: "https://images.unsplash.com/photo-1545259741521-9aedfca39cb0?auto=format&fit=crop&w=1400&q=80", category: "pendant" },
      { src: "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?auto=format&fit=crop&w=1400&q=80", category: "apres" },
      { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80", category: "apres" }
    ]
  },
  {
    id: 3,
    title: "Éclairage extérieur sur mesure",
    date: "Janvier 2026",
    description: "Conception et installation d'un éclairage extérieur design pour une terrasse, avec variateurs et détecteurs de présence.",
    cover: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80", category: "apres" },
      { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=80", category: "apres" }
    ]
  },
  {
    id: 4,
    title: "Recherche de panne et dépannage",
    date: "Décembre 2025",
    description: "Diagnostic d'une coupure récurrente, localisation du défaut d'isolement et remise en service rapide de l'installation.",
    cover: "https://images.unsplash.com/photo-1545259741521-9aedfca39cb0?auto=format&fit=crop&w=900&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1545259741521-9aedfca39cb0?auto=format&fit=crop&w=1400&q=80", category: "pendant" },
      { src: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?auto=format&fit=crop&w=1400&q=80", category: "apres" },
      { src: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1400&q=80", category: "apres" }
    ]
  },
  {
    id: 5,
    title: "Installation tableau neuf",
    date: "Novembre 2025",
    description: "Pose d'un tableau électrique neuf pour une extension de maison, dimensionné pour les besoins futurs du foyer.",
    cover: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?auto=format&fit=crop&w=900&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=80", category: "avant" },
      { src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1400&q=80", category: "pendant" },
      { src: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?auto=format&fit=crop&w=1400&q=80", category: "apres" }
    ]
  }
];
