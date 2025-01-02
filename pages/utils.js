export function getBasePath() {
  if (import.meta.env.DEV) {
    return ''; // Tom sträng i utveckling
  }
  return '/Kino_Group_Project/'; // För GitHub Pages
}
