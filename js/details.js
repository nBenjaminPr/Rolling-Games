const code = window.location.hash.slice(1);
console.log(code);

const games = JSON.parse(localStorage.getItem('games'));

const game = games.find(g=> g.code == code);

const gameDetail = document.createElement('div');

gameDetail.id = game.code;

gameDetail.classList.add('row');
gameDetail.classList.add('resp');
gameDetail.innerHTML= `
<div class="col-12 d-flex flex-column align-items-center">
   
      <h1 class="text-light">${game.name}</h1>
    <img src="${game.image}" class="test-img my-3" alt="${game.name}">
        
    <h2 class="text-light">${game.category}</h2>
      <h4 class="text-light">${game.description}</h4>

    <a href="error-404.html"><button class="btn btn-dark my-2 btnUbic">BUY NOW</button></a>
</div>
`

let gameContainer = document.getElementById('game-container');

gameContainer.appendChild(gameDetail);
