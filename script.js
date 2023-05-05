const animeList = document.querySelector("#airing-list")

async function getAiringAnime() {
    let response = await fetch("https://api.jikan.moe/v4/seasons/now")
    let jsonResponse = await response.json()
    console.log(jsonResponse)
    const lastPage = jsonResponse.pagination.last_visible_page

    for (let i = 1; i <= lastPage; i++) {
        response = await fetch(`https://api.jikan.moe/v4/seasons/now?page=${i}`)
        jsonResponse = await response.json()
        jsonResponse.data.forEach(a => {
            animeItem = document.createElement("li")
            animeItem.setAttribute("class", "show")
            animeItem.innerText = a.title_english || a.title

            itemImage = document.createElement("img")
            itemImage.setAttribute("class", "show-image")
            itemImage.setAttribute("src", a.images.jpg.image_url)
            animeItem.append(itemImage)

            animeList.append(animeItem)
        })
    }
}

const airingAnime = getAiringAnime()