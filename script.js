const animeList = document.querySelector("#airing-list")

let timeNow = new Date().toLocaleString("en-US", {hour12: false, timeZone: "Asia/Tokyo"})
let hourNow = timeNow.split(' ')[1].slice(0, 2)
let minNow = timeNow.split(' ')[1].slice(3, 5)
let dayNow = new Date().toLocaleString("en-US", {timeZone: "Asia/Tokyo", weekday: "long"})
// Array for storing numerical value corresponding to a day (i.e. Monday = 0, Tuesday = 1, ...)
const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

// Whenever user clicks on the refresh button, get current time
const refreshButton = document.querySelector("#refresh-btn")
refreshButton.addEventListener("click", () => {
    timeNow = new Date().toLocaleString("en-US", {hour12: false, timeZone: "Asia/Tokyo"})
    hourNow = timeNow.split(' ')[1].slice(0, 2)
    minNow = timeNow.split(' ')[1].slice(3, 5)
    dayOfWeek = new Date().toLocaleString("en-US", {timeZone: "Asia/Tokyo", weekday: "long"})
})

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

            // Adds countdown until the show airs
            const showCountDownContainer = document.createElement("div")
            showCountDownContainer.setAttribute("class", "show-countdown")
            const timer = document.createElement("p")
            let minDiff = a.broadcast.time.split(':')[1] - minNow
            let hourDiff = a.broadcast.time.split(':')[0] - hourNow
            let dayDiff = dayArray.indexOf(a.broadcast.day.slice(0, -1)) - dayArray.indexOf(dayNow)
            if (minDiff < 0) {
                minDiff += 60
                hourDiff -= 1
            }
            if (hourDiff < 0) {
                hourDiff += 24
                dayDiff -= 1
            }
            if (dayDiff < 0) {
                dayDiff += 7
            }
            timer.innerText = `${dayDiff}:${hourDiff}:${minDiff}`
            showCountDownContainer.append(timer)
            show.append(showCountDownContainer)

            animeList.append(show)
        })
    }
}

const airingAnime = getAiringAnime()