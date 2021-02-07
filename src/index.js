console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", () => {
    main()
})

function main(){
    loadImages()
    loadBreeds()
    addBreedListener()
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

function loadBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breeds => renderBreeds(breeds.message))
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