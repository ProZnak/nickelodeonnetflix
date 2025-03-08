document.addEventListener("DOMContentLoaded", function () {
    loadMovies();
    loadFavorites();
});

// 📌 Lista filmów i seriali
const movies = [
    { 
        id: "1", 
        title: "SpongeBob Kanciastoporty", 
        img: "Seriale/spongebob.png", 
        category: "kidsMovies", 
        seasons: 1, 
        driveLink: "https://drive.google.com/drive/folders/1wMu9qbG4DkZXZ8_7Gl17vNbOtDNqudds"
    },
    { 
        id: "2", 
        title: "iCarly", 
        img: "Seriale/ICarly.jpg", 
        category: "teenNick", 
        seasons: 6, 
        viderBase: {
            "1": "https://vider.info/embed/video/ns18e8",
            "2": "https://vider.info/embed/video/nscxxx",
            "3": "https://vider.info/embed/video/nsve11"
        },
        episodeSuffixes: {
            "1": ["x", "y", "z"], 
            "2": ["a", "b", "c"],
            "3": ["z", "y", "x"]
        }
    },
    {
        id: "3", 
        title: "Grzmotomocni", 
        img: "Seriale/grzmoty.jpg", 
        category: "teenNick", 
        seasons: 4, 
        viderBase: {
            "1": "https://vider.info/embed/video/eenc5s",
            "2": "https://vider.info/embed/video/eesx58",
            "3": "https://vider.info/embed/video/ee15cx",
            "4": "https://vider.info/embed/video/eevv5x"
        }
    },
    { 
        id: "4", 
        title: "Jestem Franky", 
        img: "Seriale/jestemfranky.jfif", 
        category: "teenNick", 
        seasons: 1, 
        viderBase: {
            "1": "https://vider.info/embed/video/svm8mv"
        }
    },
    {
        id: "5", 
        title: "Powrót Grzmotomocnych (Film)", 
        img: "Seriale/GrzmotyFilm.webp", 
        category: "liveAction",
        seasons: 1, 
        viderBase: {
            "1": "https://vider.info/embed/video/e8ne8c"
        }
    },
    { 
        id: "6", 
        title: "Sam i Cat", 
        img: "Seriale/samicat.jpg", 
        category: "teenNick", 
        seasons: 1, 
        viderBase: {
            "1": "https://vider.info/embed/video/x5n58"
        }
    },
    { 
        id: "7", 
        title: "Game Shakers, Jak Wydać Grę", 
        img: "Seriale/gameshakers.jpg", 
        category: "teenNick", 
        seasons: 2, 
        viderBase: {
            "1": "https://vider.info/embed/video/e1n8nv",
            "3": "https://vider.info/embed/video/e1x5mm"
        }
    },
    { 
        id: "8", 
        title: "Niebezpieczny Oddział", 
        img: "Seriale/oddzial.jpg", 
        category: "teenNick", 
        seasons: 2, 
        viderBase: {
            "1": "https://vider.info/embed/video/emx8ne",
            "2": "https://vider.info/embed/video/emsm15"
        }
    },
    { 
        id: "9", 
        title: "Drake i Josh", 
        img: "Seriale/drakeijosh.jpg", 
        category: "nickClassics", 
        seasons: 4, 
        viderBase: {
            "1": "https://vider.info/embed/video/e8xe81",
            "2": "https://vider.info/embed/video/e8xv85",
            "3": "https://vider.info/embed/video/e8esc8",
            "4": "https://vider.info/embed/video/e8svsm"
        }
    },
    { 
        id: "10", 
        title: "Psi Patrol", 
        img: "Seriale/PsiPatrol.webp", 
        category: "kidsMovies", 
        seasons: 1, 
        viderBase: {
            "1": "https://vider.info/embed/video/exmmsv"
        }
    },
    { 
        id: "11", 
        title: "Pingwiny z Madagaskaru", 
        img: "Seriale/Pingwiny.jpg", 
        category: "kidsMovies", 
        seasons: 3, 
        viderBase: {
            "1": "https://vider.info/embed/video/1cmss",
            "2": "https://vider.info/embed/video/sv5en1",
            "3": "https://vider.info/embed/video/svvxxx"
        }
    },
    { 
        id: "12", 
        title: "Kung Fu Panda: Legenda o Niezwykłości", 
        img: "Seriale/kungfupanda.jpg", 
        category: "kidsMovies", 
        seasons: 3, 
        viderBase: {
            "1": "https://vider.info/embed/video/ssnn5e",
            "2": "https://vider.info/embed/video/ssxxvs",
            "3": "https://vider.info/embed/video/sssem1"
        }
    },
    { 
        id: "13", 
        title: "Harmidom w Realu", 
        img: "Seriale/harmidomwrealu.jpg", 
        category: "kidsMovies", 
        seasons: 2, 
        viderBase: {
            "1": "https://vider.info/embed/video/emc8ee",
            "2": "https://vider.info/embed/video/e8c5sn",
        }
    },
    { 
        id: "14", 
        title: "Zagadki Rodziny Hunterów", 
        img: "Seriale/zagatki.jpg", 
        category: "teenNick", 
        seasons: 1, 
        viderBase: {
            "1": "https://vider.info/embed/video/e8mxxn",
        }
    },
];

// 📌 Ładowanie filmów na stronę
function loadMovies() {
    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `
            <img src="${movie.img}" alt="${movie.title}" onclick="handleMovieClick('${movie.id}')">
            <div class="favorite-btn" onclick="toggleFavorite(event, '${movie.id}')">❤️</div>
        `;

        document.getElementById(movie.category).appendChild(movieElement);
    });

    markFavorites();
}

// 📌 Obsługa kliknięcia w film
function handleMovieClick(movieId) {
    const movie = movies.find(m => m.id === movieId);
    
    if (!movie) {
        console.error("Nie znaleziono filmu o ID:", movieId);
        return;
    }

    if (movie.driveLink) {
        window.open(movie.driveLink, "_blank");
    } else {
        showSeasonModal(movie.id, movie.title, movie.seasons, movie.viderBase, movie.episodeSuffixes);
    }
}

// 📌 Modal wyboru sezonu i odcinka
function showSeasonModal(movieId, title, seasons, viderBase, episodeSuffixes) {
    document.getElementById("modalTitle").innerText = title;
    const seasonSelect = document.getElementById("seasonSelect");
    const episodeSelect = document.getElementById("episodeSelect");

    seasonSelect.innerHTML = "";
    episodeSelect.innerHTML = "";

    if (!viderBase || Object.keys(viderBase).length === 0) {
        alert("Brak dostępnych sezonów!");
        return;
    }

    Object.keys(viderBase).forEach(season => {
        let option = document.createElement("option");
        option.textContent = `Sezon ${season}`;
        option.value = season;
        seasonSelect.appendChild(option);
    });

    seasonSelect.onchange = function () {
        updateEpisodes();
    };

    document.getElementById("seasonModal").dataset.viderBase = JSON.stringify(viderBase);
    document.getElementById("seasonModal").dataset.episodeSuffixes = JSON.stringify(episodeSuffixes);
    document.getElementById("seasonModal").style.display = "flex";

    updateEpisodes();
}

// 📌 Aktualizacja listy odcinków
function updateEpisodes() {
    const seasonNumber = document.getElementById("seasonSelect").value;
    const episodeSelect = document.getElementById("episodeSelect");

    episodeSelect.innerHTML = "";

    const episodeSuffixes = JSON.parse(document.getElementById("seasonModal").dataset.episodeSuffixes || "{}");

    if (!episodeSuffixes[seasonNumber] || episodeSuffixes[seasonNumber].length === 0) {
        let option = document.createElement("option");
        option.textContent = "Brak odcinków";
        option.disabled = true;
        episodeSelect.appendChild(option);
        return;
    }

    episodeSuffixes[seasonNumber].forEach((suffix, index) => {
        let option = document.createElement("option");
        option.textContent = `Odcinek ${index + 1}`;
        option.value = suffix;
        episodeSelect.appendChild(option);
    });
}

// 📌 Oglądanie odcinka
function watchEpisode() {
    const seasonNumber = document.getElementById("seasonSelect").value;
    const episodeSuffix = document.getElementById("episodeSelect").value;
    const viderBase = JSON.parse(document.getElementById("seasonModal").dataset.viderBase || "{}");

    if (!viderBase[seasonNumber]) return alert("Brak linku do sezonu!");

    document.getElementById("videoFrame").src = `${viderBase[seasonNumber]}${episodeSuffix}`;
    document.getElementById("videoPlayer").style.display = "flex";
    closeSeasonModal();
}
