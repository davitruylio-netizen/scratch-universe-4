
/* ==========================================
   SCRATCH UNIVERSE
   SISTEMA DE EXIBIÇÃO DOS JOGOS
========================================== */

const Games = {

    container: null,

    init() {

        this.container = document.getElementById("gamesGrid");

    },

    render(projects) {

        if (!this.container) {
            this.init();
        }

        if (!projects || projects.length === 0) {

            this.container.innerHTML = `
                <div class="empty-state">
                    Nenhum jogo encontrado.
                </div>
            `;

            return;

        }

        this.container.innerHTML = projects.map(game => `

            <article class="game-card">

                <a href="${game.url}" target="_blank" rel="noopener noreferrer">

                    <img
                        src="${game.image}"
                        alt="${this.escapeHTML(game.title)}"
                        loading="lazy"
                        onerror="this.src='https://placehold.co/480x360/111629/ffffff?text=Scratch+Game'"
                    >

                    <div class="game-info">

                        <h3>${this.escapeHTML(game.title)}</h3>

                        <p>
                            Criado por ${this.escapeHTML(game.author)}
                        </p>

                        <p>
                            ❤️ ${game.loves} 
                            &nbsp; ⭐ ${game.favorites}
                        </p>

                    </div>

                </a>

            </article>

        `).join("");

    },

    escapeHTML(value) {

        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[char]);

    }

};

