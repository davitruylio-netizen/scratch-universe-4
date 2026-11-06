
/* ==========================================
   SCRATCH UNIVERSE
   CONEXÃO COM A API DO SCRATCH
========================================== */

const ScratchAPI = {

    BASE_URL: "https://api.scratch.mit.edu",

    async searchProjects(query, limit = 40, offset = 0) {

        if (!query || !query.trim()) {
            return [];
        }

        const url = new URL(
            `${this.BASE_URL}/search/projects`
        );

        url.searchParams.set("q", query.trim());
        url.searchParams.set("limit", limit);
        url.searchParams.set("offset", offset);
        url.searchParams.set("mode", "popular");

        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Erro na API do Scratch");
            }

            const data = await response.json();

            return data.map(project => ({

                id: project.id,

                title: project.title || "Jogo sem título",

                author: project.author?.username || "Criador desconhecido",

                image: `https://uploads.scratch.mit.edu/get_image/project/${project.id}_480x360.png`,

                views: project.stats?.views || 0,

                loves: project.stats?.loves || 0,

                favorites: project.stats?.favorites || 0,

                url: `https://scratch.mit.edu/projects/${project.id}/`

            }));

        } catch (error) {

            console.error("Scratch API:", error);

            throw error;

        }

    },

    async getTrending() {

        return this.searchProjects("game", 40);

    }

};

