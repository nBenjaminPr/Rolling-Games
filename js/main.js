//? PROTECCIÓN DE RUTA
const userLogged = JSON.parse(localStorage.getItem('userInfo'));
if(!userLogged){
  window.location.assign(window.location.origin + '/html/login.html')
}

let categories = JSON.parse(localStorage.getItem('categories'));
let games = JSON.parse(localStorage.getItem('games'));
console.log(categories);
console.log(games);

games.forEach(game=>{
    if(game.fav){
    const favGame = document.createElement('div');
    favGame.classList.add('carousel-item');
    favGame.classList.add('active');
    favGame.innerHTML = `
    <div class="card mb-3" style="max-width: 1800px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src=${game.image} class="img-fluid rounded-start imgFav" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h1 class="card-title">${game.name}</h1>
                    <h2 class="card-text">
                   ${game.description}
                    </h2>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
    
    `
    document.getElementById('destacados').appendChild(favGame);
    }
})


categories.forEach(cat=>{
    const catGameRow = document.createElement('div');
    catGameRow.classList.add('row');
    catGameRow.innerHTML= `
    <h1 class="title-categorie text-center my-5" style="color: red;">${cat.name}</h1>
    <div class="col">
        <div id="carousel${cat.id}" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
             <div class="carousel-item active">
                <div class="cards-wrapper">
                <div class="container-fluid d-inline-flex justify-content-center justify-content-between categorie-action" id='${cat.name}'>

                </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="cards-wrapper">
                <div class="container-fluid d-inline-flex justify-content-center justify-content-between categorie-action" id='${cat.name}1'>

                </div>
                </div>
            </div>
            <div class="carousel-item">
                <div class="cards-wrapper">
                <div class="container-fluid d-inline-flex justify-content-center justify-content-between categorie-action" id='${cat.name}2'>

                </div>
                </div>
            </div>
            </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel${cat.id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carousel${cat.id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
    </div>
    </div>
    
    `
    document.getElementById("juegosPorCategorias").appendChild(catGameRow);
  })


    games.forEach(game =>{
      if(game.published){
        const gameCard = document.createElement('div');
        gameCard.classList.add("card")
        gameCard.classList.add("card-categorie")
        gameCard.classList.add("mx-1")
        gameCard.setAttribute('style','width: 18rem;')
        gameCard.innerHTML=`
        <a onclick="irDetalle(${game.code})">
        <img src=${game.image} class="card-img-top imgCat" alt="..." />
        </a>
        <div class="card-body">
          <h5 class="card-title">${game.name}</h5>
        </div>
        `
   
        document.getElementById(`${game.category}`).appendChild(gameCard);
      }
    })

    games.forEach(game =>{
      if(game.published){
        const gameCard = document.createElement('div');
        gameCard.classList.add("card")
        gameCard.classList.add("card-categorie")
        gameCard.classList.add("mx-1")
        gameCard.setAttribute('style','width: 18rem;')
        gameCard.innerHTML=`
        <a onclick="irDetalle(${game.code})">
        <img src=${game.image} class="card-img-top imgCat" alt="..." />
        </a>
        <div class="card-body">
          <h5 class="card-title">${game.name}</h5>
        </div>
        `
   
        document.getElementById(`${game.category}1`).appendChild(gameCard);
      }
    })

    games.forEach(game =>{
      if(game.published){
        const gameCard = document.createElement('div');
        gameCard.classList.add("card")
        gameCard.classList.add("card-categorie")
        gameCard.classList.add("mx-1")
        gameCard.setAttribute('style','width: 18rem;')
        gameCard.innerHTML=`
        <a onclick="irDetalle(${game.code})">
        <img src=${game.image} class="card-img-top imgCat" alt="..." />
        </a>
        <div class="card-body">
          <h5 class="card-title">${game.name}</h5>
        </div>
        `
   
        document.getElementById(`${game.category}2`).appendChild(gameCard);
      }
    })
 
    function logout(){
      localStorage.removeItem('userInfo')
    }

    function irAdmin(){
      if(userLogged.admin){
        window.location.assign(window.location.origin+ '/html/admin.html')
      }
    }

   function irDetalle(code){
    window.location.assign(window.location.origin+ `/html/details.html#${code}`)
    }

  function esAdmin(){
    if(!userLogged.admin){
      const linkAdmin = document.querySelector('.adminLink')
      linkAdmin.setAttribute('hidden','false')
      console.log(linkAdmin);
    }
   
  }
  esAdmin();
  