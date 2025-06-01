document.addEventListener('DOMContentLoaded', () => {
  fetch('games.json')
    .then(res => res.json())
    .then(games => {
      const grid = document.getElementById('game-grid');
      games.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.innerHTML = `
          ${game.image ? `<img src="${game.image}" alt="${game.name} Cover">` : ''}
          <h3>${game.name}</h3>
          <p>${game.desc}</p>
          ${game.link ? `<a href="${game.link}" target="_blank" class="cta small">View Game</a>` : ''}
        `;
        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Could not load games:', err);
      document.getElementById('game-grid').innerHTML = "<p>Failed to load games. Check your JSON or file path.</p>";
    });
});
