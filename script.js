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
            // Creates a list item to represent a show
            const show = document.createElement("li")
            show.setAttribute("class", "show")

            // Adds the show's image
            const showImage = document.createElement("img")
            showImage.setAttribute("class", "show-image")
            showImage.setAttribute("src", a.images.jpg.image_url)
            show.append(showImage)

            // Adds the show's title in English and Japanese
            const showTitleContainer = document.createElement("div")
            showTitleContainer.setAttribute("class", "show-title")
            const showTitleEnglish = document.createElement("p")
            showTitleEnglish.innerText = a.title_english || a.title
            const showTitleJapanese = document.createElement("p")
            showTitleJapanese.innerText = a.title_japanese
            showTitleContainer.append(showTitleEnglish)
            showTitleContainer.append(showTitleJapanese)
            show.append(showTitleContainer)



            animeList.append(show)
        })
    }
}

const airingAnime = getAiringAnime()