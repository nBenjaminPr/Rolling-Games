//? PROTECCIÓN DE RUTA
const userLogged = JSON.parse(localStorage.getItem('userInfo'));
if(!userLogged){
  window.location.assign(window.location.origin + '/html/login.html')
}else if(!userLogged.admin){
  window.location.assign(window.location.origin+ '/html/main.html')
}

class Game{
  constructor(code, name, category,description, published, fav,image){
    this.name = name;
    this.code = code;
    this.category = category;
    this.description = description;
    this.published = published;
    this.fav = fav;
    this.image = image;
  }
}
class Category{
  constructor(id, name){
    this.id = id;
    this.name = name;
  }
}
//* Traemos los games de LS
let games = [];
if(JSON.parse(localStorage.getItem('games'))){
  games = JSON.parse(localStorage.getItem('games')).sort(function(a, b) {
    return a.code-b.code; 
});
}

//! Adaptamos footer a la dinámica
const body = document.querySelector('body')
const footer = document.querySelector('footer')
if(games.length < 2){
  body.setAttribute('style','height: 80vh;')
  footer.setAttribute('style','height: 45vh;')
}else {
  body.setAttribute('style','height: 100%;')
  footer.setAttribute('style','height: none;')
}

//* Traemos las categories de LS

let categories = [];
if(JSON.parse(localStorage.getItem('categories'))){
  categories = JSON.parse(localStorage.getItem('categories'))
}

const inputSelected =  document.getElementById('game-category')
const inputSelectedEdit =  document.getElementById('game-category-edit')
  const catArray = categories;
  for (let i = 0; i < catArray.length; i++) {
    let optionValue = document.createElement('option');
    let optionValueEdit = document.createElement('option');
    optionValueEdit.classList.add('optionEdit')
    optionValue.innerText = `${catArray[i].name}`;
    optionValueEdit.innerText = `${catArray[i].name}`;
    optionValueEdit.setAttribute('value',catArray[i].name)
    inputSelected.appendChild(optionValue);
    inputSelectedEdit.appendChild(optionValueEdit)
  }
//! cRud : Lectura de datos

games.forEach(game=>{
  const gameRow = document.createElement('tr');
  gameRow.classList.add('rowTable')
  let inputCheck = ''
  if(game.published){
     inputCheck = 'checked'
  }
  let favIcon = '🤍';
  if(game.fav){
    favIcon = '❤';
  }
  gameRow.innerHTML=`
  <th scope="row">${game.code}</th>
  <td>${game.name}</td>
  <td>${game.category}</td>
  <td>${game.description}</td>
  <td><img src=${game.image} class="imgGame"></td>
  <td class="text-center"><input class="inputCheck" type="checkbox" id="" ${inputCheck} onclick="changePublished('${game.code}')"></input></td>
  <td class="text-center">

  <button class="btn" data-bs-toggle="modal" data-bs-target="#edit-modal" onclick="fillFields('${game.code}')">✏️</button>
    <button class="btn" onclick="deleteGame('${game.code}')">🗑️</button>
    <button class="btn" onclick="favsGame('${game.code}')">${favIcon}</button>
  </td>
  `
  document.querySelector('tbody').appendChild(gameRow);
  // <form onsubmit="fillFields('${game.code}',${event})"></form> COMO HACER PARA RECIBIR 2 PARAMETROS, CODIGO + EVENTO
})

//! Crud: Creación de datos
const addGame = (e)=>{

  const name = document.getElementById('game-name').value;
  const description = document.getElementById('game-description').value;
  const category = document.getElementById('game-category').value;
 const published = document.getElementById('game-published').checked;
  const image = document.getElementById('game-image').value;
  //!Valcodear con JS
  if(validateFieldsGame(name,description,category,image,published)){
  let lastCode = 0;
  if(localStorage.getItem('games')){
    lastCode = ((JSON.parse(localStorage.getItem('games'))).pop()).code
  }
  
  const newgame = new Game(parseInt(lastCode) + 1,name,category,description,published,false,image);
  games.push(newgame);
  localStorage.setItem('games', JSON.stringify(games));
}else{
  e.preventDefault()
  alertMessage('El formato es inválido','#register-game')
}
}

//! cruD: Borrado de datos

const deleteGame = (codeToRemove)=>{
  const gamesUpdated = games.filter(game=>game.code!=codeToRemove);
  localStorage.setItem('games',JSON.stringify(gamesUpdated));
  window.location.reload();
}

//! crUd: Modificación de datos

const fillFields = (codeToEdit)=>{
  const game = games.find(game=>game.code == codeToEdit);
  document.getElementById('game-name-edit').value = game.name;
  document.getElementById('game-image-edit').value = game.image;
  let cats = document.querySelectorAll('.optionEdit')

  for (let i = 0; i < cats.length; i++) {
    if(cats[i].getAttribute('value')==game.category){
      cats[i].setAttribute('selected',true)
    }
  }
  document.getElementById('game-description-edit').value = game.description;
  document.getElementById('edit-form').setAttribute('onsubmit',`editGame('${game.code}',event)`);
}

const editGame = (codeToEdit,e)=>{
  const name = document.getElementById('game-name-edit').value;
  const image = document.getElementById('game-image-edit').value;
  const category = document.getElementById('game-category-edit').value;
  const description = document.getElementById('game-description-edit').value;
  const gameCheck = games.find(game => game.code == codeToEdit)
  if(validateFieldsGame(name,description,category,image,gameCheck.published)){
  const gamesUpdated = games.filter(game=>game.code != codeToEdit);
  const gameUpdated = new Game(codeToEdit,name,category, description,gameCheck.published,gameCheck.fav,image);
  gamesUpdated.push(gameUpdated);
  localStorage.setItem('games',JSON.stringify(gamesUpdated));
  }else{
    e.preventDefault()
    alertMessage('El formato es inválido','#edit-game')
  }
}

const favsGame = (code)=>{
  const gamesUpdated = games.filter(game=>game.code != code);
  const gameUpdated = games.find(game=>game.code == code )
  if(gameUpdated.fav){
    gameUpdated.fav = false;
    window.location.reload();
  }else{
    gameUpdated.fav = true;
    window.location.reload();
  }
  gamesUpdated.push(gameUpdated);
  localStorage.setItem('games',JSON.stringify(gamesUpdated));  
}

function addCategory(e){
  let lastId = 0;
  if(localStorage.getItem('categories')){
    lastId = ((JSON.parse(localStorage.getItem('categories'))).pop()).id
  }
  const name = document.getElementById('game-category-add').value;
  if(/^[a-zA-Z]*$/.test(name)){
  const newCat = new Category(parseInt(lastId) + 1,name)
  categories.push(newCat);
  localStorage.setItem('categories',JSON.stringify(categories))
  }else{
    e.preventDefault()
    alertMessage('El formato es inválido','#add-cat')
  }
}

function changePublished(code){
  const gameUpdated = games.find(game=>game.code == code)
  if(gameUpdated.published){
    gameUpdated.published = false;
  }else gameUpdated.published = true;
  const gamesUpdated = games.filter(game=>game.code != code);
  gamesUpdated.push(gameUpdated)
  localStorage.setItem('games',JSON.stringify(gamesUpdated))
}

const validateFieldsGame = (name, description, category, image, published)=>{
  const expNameDescription = new RegExp(/[a-zA-Z ]/);
  const expUrl = new RegExp(/^(ht|f)tps?:\/\/\w+([\.\-\w]+)?\.[a-z]{2,10}(:\d{2,5})?(\/.*)?$/i);
  const nameOk = expNameDescription.test(name); 
  const descriptionOk = expNameDescription.test(description);
  const categoryOk = /^[a-zA-Z]*$/.test(category); 
  const imageOk = expUrl.test(image);
  const publishedOk = (typeof published == "boolean");
  console.log(descriptionOk);
  console.log(categoryOk);
  console.log(nameOk);
  console.log(imageOk);
  console.log(publishedOk);
  if(nameOk && descriptionOk && categoryOk && imageOk && publishedOk) return true
  else return false
}

const alertMessage = (message,queryContainer)=>{
  let alertMessage = document.createElement('div'); 
  alertMessage.classList.add('alert','alert-danger','mt-3');
  alertMessage.setAttribute('role','alert');
  alertMessage.innerText = message;
  let container= document.querySelector(queryContainer);
  container.appendChild(alertMessage);
  setTimeout(()=>{
    alertMessage.remove()
  },1000)
}

function logout(){
  localStorage.removeItem('userInfo')
}