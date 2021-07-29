const dogbar = document.querySelector('div#dog-bar')
function createDogBar(dog){
    const dogspan = document.createElement('span')
    dogspan.textContent = dog.name
    dogspan.dataset.id = dog.id
    dogbar.append(dogspan)

}

function renderAllDogs(filter=false) {
    
    fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then(dogs =>{
        const dogBar = document.querySelector("#dog-bar")
        dogBar.innerHTML = ""
    if (filter){
        const good=dogs.filter(dog=> dog.isGoodDog).forEach(createDogBar)

    }
    else
    dogs.forEach(createDogBar)
    })}

    function oneDog(dog){
    const doginfo = document.querySelector("#dog-info")
    doginfo.innerHTML = ''
    const outerDiv = document.createElement('div')
    const goodorbad= dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    outerDiv.dataset.id = dog.id
  
    outerDiv.innerHTML = `
    <h2>${dog.name}</h2>
    <img src=${dog.image} />
        <br>
    <button class="dog-btn">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"} </button>
    `
  
    doginfo.append(outerDiv)
  }

dogbar.addEventListener('click', e => {

    if (e.target.matches('span')) {
      
        const id = e.target.dataset.id

        fetch('http://localhost:3000/pups/' + id)
            .then(r => r.json())
            .then(dog => {
                oneDog(dog)
            })
    }
})


    const filter= document.querySelector('button#good-dog-filter')
    filter.addEventListener('click',e=>{
       if(e.target.innerText.includes('OFF')){
        renderAllDogs(true)
           e.target.textContent= "Filter good dogs: ON"
       }
       else{
           renderAllDogs()
           e.target.textContent= "Filter good dogs: OFF"
       }
    })

  renderAllDogs()