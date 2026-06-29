const grid = document.getElementById('matches-grid');
const loader = document.getElementById('loader');
const searchInput = document.getElementById('search');
const filterSelect = document.getElementById('filter');

let allMatches = [];

async function fetchMatches() {
    try {
        const response = await fetch(`https://noneserv.pages.dev/api/matches.json?${Date.now()}`, { cache: 'no-store' });
        const data = await response.json();
        
        allMatches = data.sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
        
        populateFilters();
        filterMatches();
    } catch (error) {
        console.error('Failed to fetch matches:', error);
        loader.innerText = 'Failed to load matches. Please try again later.';
    }
}

function populateFilters() {
    const comps = new Set(allMatches.map(m => m.competition));
    comps.forEach(c => {
        const option = document.createElement('option');
        option.value = c;
        option.innerText = c;
        filterSelect.appendChild(option);
    });
}

function renderMatches(matches) {
    loader.style.display = 'none';
    grid.innerHTML = '';

    if (matches.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 2rem;">No matches found.</div>';
        return;
    }

    matches.forEach((match, index) => {
        const card = document.createElement('a');
        
        const matchSlug = `${match.home.name}-vs-${match.away.name}`.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        card.href = `stream.html?match=${matchSlug}`;
        card.target = '_self';
        card.className = 'card';
        card.style.animationDelay = `${index * 0.05}s`;

        const matchDate = new Date(match.dateISO);
        const showStart = new Date(match.showStart);
        const showEnd = new Date(match.showEnd);
        const now = new Date();

        let statusText = '';
        let isLive = false;

        if (now >= showStart && now <= showEnd) {
            statusText = 'Live Now';
            isLive = true;
        } else if (now < showStart) {
            statusText = formatTimeLeft(matchDate - now);
        } else {
            statusText = 'Ended';
        }

        const dateStr = matchDate.toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = matchDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: false });

        card.innerHTML = `
            <div class="card-header">
                <span class="competition">${match.competition}</span>
                <span class="status ${isLive ? 'live' : ''}">${isLive ? '🔴 ' : '⏱️ '}${statusText}</span>
            </div>
            <div class="teams">
                <div class="team">
                    <img src="${match.home.logo}" alt="${match.home.name}">
                    <div class="team-name">${match.home.name}</div>
                </div>
                <div class="vs">VS</div>
                <div class="team">
                    <img src="${match.away.logo}" alt="${match.away.name}">
                    <div class="team-name">${match.away.name}</div>
                </div>
            </div>
            <div class="card-footer">
                📅 ${dateStr} • ${timeStr} WIB
            </div>
        `;

        grid.appendChild(card);
    });
}

function formatTimeLeft(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 24) {
        return `${Math.floor(hours / 24)}d left`;
    }
    return `In ${hours}h ${mins}m`;
}

function filterMatches() {
    const term = searchInput.value.toLowerCase();
    const comp = filterSelect.value;
    
    const filtered = allMatches.filter(m => {
        const matchesSearch = m.home.name.toLowerCase().includes(term) || 
                              m.away.name.toLowerCase().includes(term) ||
                              m.competition.toLowerCase().includes(term);
        const matchesComp = comp === 'all' || m.competition === comp;
        
        const now = new Date();
        const showStart = new Date(m.showStart);
        const showEnd = new Date(m.showEnd);
        const isLive = now >= showStart && now <= showEnd;

        return matchesSearch && matchesComp && isLive;
    });
    
    renderMatches(filtered);
}

searchInput.addEventListener('input', filterMatches);
filterSelect.addEventListener('change', filterMatches);

fetchMatches();

setInterval(() => {
    filterMatches();
}, 60000);
