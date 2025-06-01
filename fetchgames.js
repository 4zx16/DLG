// gamefetcher.js
export async function fetchGames() {
  const grid = document.getElementById('game-grid');

  try {
    const res = await fetch('./games.json'); // <-- make sure path is relative to HTML location
    if (!res.ok) throw new Error(`Failed to fetch games.json: ${res.status}`);

    const games = await res.json();

    if (!Array.isArray(games) || games.length === 0) {
      grid.innerHTML = '<p>No games found.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();

    games.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('game-card');

      card.innerHTML = `
        ${game.image && game.image !== 'N/A' ? `<img src="${game.image}" alt="${game.name} Cover">` : ''}
        <div class="game-content">
          <h3 class="game-title">${game.name}</h3>
          <p class="game-desc">${game.desc || 'No description available.'}</p>
          ${game.link ? `<a href="${game.link}" target="_blank" rel="noopener noreferrer" class="btn-small">View Game</a>` : ''}
        </div>
      `;

      fragment.appendChild(card);
    });

    grid.innerHTML = ''; // Clear before appending new
    grid.appendChild(fragment);

  } catch (error) {
    console.error('Error loading games:', error);
    grid.innerHTML = '<p>Failed to load games.</p>';
  }
}
