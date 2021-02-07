console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    main()
})

function main(){
    loadImages()
    loadBreeds()
    addBreedListener()
    addFilterListener()
}

function loadImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 

    fetch(imgUrl)
    .then(resp => resp.json())
    .then(images => images.message.forEach(image => renderImage(image)))
}

function renderImage(image){
    const imgNode = document.createElement('img')
    const divNode = document.getElementById('dog-image-container')

    imgNode.src = image

    divNode.append(imgNode)
}

let allBreedData = []

function loadBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => {
        allBreedData = breeds.message;
        renderBreeds(breeds.message)
    })
}

function renderBreeds(breeds){
    for (const key in breeds){
        
        if (breeds[key].length > 0){
            breeds[key].forEach(dog => renderBreed(dog + " " + key))
        }
        else {
            renderBreed(key)
        }

    }
}

function renderBreed(breed){
    const ulNode = document.getElementById('dog-breeds')
    const liNode = document.createElement('li')

    liNode.innerText = breed
    ulNode.append(liNode)
}

function addBreedListener(){

    const breedUl = document.getElementById('dog-breeds')

    breedUl.addEventListener('click', function(e){
        if (e.target.nodeName === "LI"){
            e.target.style.color="indianRed"
        }
    })
}

function addFilterListener(){
    const select = document.getElementById('breed-dropdown')

    select.addEventListener('change', function(e){
        e.preventDefault
        const ul = document.getElementById('dog-breeds')
        ul.innerHTML=""
        
        const filterLetter = e.target.value
        if (filterLetter === "View All Dogs"){
            renderBreeds(allBreedData)
        } else {
            for(const key in allBreedData){
                
                if (allBreedData[key].length > 0){
                    allBreedData[key].forEach(dog => {
                        // debugger
                        if (dog.startsWith(filterLetter))
                            renderBreed(dog + " " + key)
                        })
                }
                else {
                    // debugger
                    if (key.startsWith(filterLetter)){
                        renderBreed(key)
                    }
                }
            }
        }
    })
}