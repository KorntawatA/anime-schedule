const animeList = document.querySelector("#airing-list")

async function getAiringAnime() {
    let response = await fetch("https://api.jikan.moe/v4/seasons/now")
    let jsonResponse = await response.json()
    jsonResponse.data.forEach(a => {
        animeItem = document.createElement("li")
        animeItem.innerText = a.title_english || a.title
        animeList.append(animeItem)
    })

    const lastPage = jsonResponse.pagination.last_visible_page
    for (let i = 1; i <= lastPage; i++) {
        response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${i}`)
        jsonResponse = await response.json()
        jsonResponse.data.forEach(a => {
            animeItem = document.createElement("li")
            animeItem.innerText = a.title_english || a.title
            animeList.append(animeItem)
        })
    }
}

const airingAnime = getAiringAnime()