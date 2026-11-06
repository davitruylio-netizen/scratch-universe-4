
/* ==========================================
   SCRATCH UNIVERSE
   PESQUISA INTELIGENTE
========================================== */

const Search = {

    input: null,

    timer: null,

    init() {

        this.input = document.getElementById("searchInput");

        if (!this.input) return;

        this.input.addEventListener("input", () => {

            clearTimeout(this.timer);

            const query = this.input.value.trim();

            if (query.length < 2) {
                return;
            }

            this.timer = setTimeout(() => {

                this.search(query);

            }, 500);

        });

    },

    async search(query) {

        const container = document.getElementById("gamesGrid");

        container.innerHTML = `
            <div class="loading">
                Procurando jogos no universo Scratch...
            </div>
        `;

        try {

            const projects = await ScratchAPI.searchProjects(query);

            Games.render(projects);

        } catch (error) {

            container.innerHTML = `
                <div class="empty-state">
                    Não foi possível carregar os jogos.
                    Tente novamente.
                </div>
            `;

        }

    }

};

