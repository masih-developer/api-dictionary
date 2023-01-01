const $ = document;
const input = $.querySelector("#inp-word");
const searchBtn = $.querySelector("#search-btn");
const audio = $.querySelector("#sound");
const result = $.querySelector(".result");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const playAudio = () => {
    audio.play();
};

const getword = () => {
    let inputValue = input.value.trim();
    if (inputValue !== "") {
        async function getDatas() {
            try {
                const response = await fetch(`${url}${inputValue}`);
                const word = await response.json();
                return await word;
            } catch (err) {
                throw err;
            }
        }
        getDatas()
            .then((res) => res[0])
            .then((data) => {
                audio.src = data.phonetics[0].audio;
                result.innerHTML = "";
                result.insertAdjacentHTML(
                    "beforeend",
                    `
                    <div class="word">
                        <h3>${data.word}</h3>
                        <button onclick="playAudio()">
                        <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    <div class="details">
                        <p>${data.meanings[0].partOfSpeech}</p>
                        <p>${data.phonetic}/</p>
                    </div>
                    <p class="word-meaning">${data.meanings[0].definitions[0].definition}</p>
                    <p class="word-example">${data.meanings[0].definitions[0].example || ""}</p>
                    </div>
                    `
                );
            })
            .catch(() => {
                result.innerHTML = '<h3 class="error">Could\'t Find The World</h3>';
            });
    } else {
        alert("Please enter the desired values ​​correctly");
    }
};

searchBtn.addEventListener("click", getword);
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getword();
    }
});
