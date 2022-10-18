function init () {

  // class Character {
  //   constructor(charName, startingPos) {
  //     this.name = charName
  //     this.startingPos = startingPos
  //   }
  // }
  
  // class Pacman extends Character {
  //   constructor(charName, startingPos, up, down, left, right) {
  //     super(charName, startingPos)
  //     this.up = up
  //     this.down = down
  //     this.left = left
  //     this.right = right
  //   }
  // }
  
  // const character1 = new Character('Ghost1', 41)
  // const character2 = new Character('Ghost2', 45)
  // const pacman = new Pacman('Pacman', 55, 38, 40, 37, 39)
  
  

  
  // Elements
  const grid = document.querySelector('.grid')
  const width = 19
  const height = 21
  const cellCount = width * height
  const cells = []
  const startingPositionPac = 294
  const startingPositionGhostPink = 142
  const directions = [-width, width, -1, 1]
  const audio = document.getElementById('audio')
  const foodCells = document.getElementsByClassName('food')

  
  // Variables
  let currentPositionPac = startingPositionPac
  let currentPositionGhostPink = startingPositionGhostPink
  let timer
  
  
  // Execution
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      // cell.innerHTML = i
      cell.classList.add(i)
      cell.classList.add('food')
      grid.appendChild(cell)
      cells.push(cell)
    }
    
    addPacman(startingPositionPac)
    addGhost(startingPositionGhostPink)
  }
  createGrid()
  
  const walls = [0, 1, 2, 3, 4, 5, 6,	7, 8,	9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 28, 37, 38, 40, 41, 43, 44, 45, 47, 49, 50, 51, 53, 54, 56, 57, 75, 76, 78, 79,	81,	83,	84,	85,	86,	87,	89,	91,	92,	94, 95,	100, 104,	108, 113, 114, 115, 116, 117, 119, 120, 121, 123, 125, 126, 127, 129, 130, 131, 132, 133, 134, 135, 136, 138, 146, 148, 149, 150, 151, 152, 153, 154, 155, 157, 159, 160, 162, 163, 165, 167, 168, 169, 170,178, 182, 190, 191, 192, 193, 195, 197, 198, 199, 200, 201, 203, 205, 206, 207, 208, 209, 210, 211, 212, 214, 222, 224, 225, 226, 227, 228, 229, 230, 231, 233, 235, 236, 237, 238, 239, 241, 243, 244, 245, 246, 247, 256, 265, 266, 268, 269, 271, 272, 273, 275, 277, 278, 279, 281, 282, 284, 285, 288, 300, 303, 304, 305, 307, 309, 311, 312, 313, 314, 315, 317, 319, 321, 322, 323, 328, 332, 336, 341, 342, 344, 345, 346, 347, 348, 349, 351, 353, 354, 355, 356, 357, 358, 360, 361, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398]
  
  const ghostSpawnBox = [161, 179, 180, 181]

  const cookieCells = [39, 55, 286, 302]

  function createWalls(){
    walls.forEach(wall => cells[wall].classList.add('wall'))
    walls.forEach(wall => cells[wall].classList.remove('food'))
  }
  createWalls()

  function createGhostSpawnBox(){
    ghostSpawnBox.forEach(wall => cells[wall].classList.add('ghostSpawnBox'))
    ghostSpawnBox.forEach(wall => cells[wall].classList.remove('food'))
  }
  createGhostSpawnBox()

  function createCookies(){
    cookieCells.forEach(cook => cells[cook].classList.add('cookie'))
    cookieCells.forEach(cook => cells[cook].classList.remove('food'))
  }
  createCookies()




  
  function addPacman(position) {
    cells[position].classList.add('pacman')
  }
  function removePacman(position){
    cells[position].classList.remove('pacman')
  }
  function eatFood(position){
    cells[position].classList.remove('food')
  } 
  function eatCookie(position){
    cells[position].classList.remove('cookie')
  } 


  function eatAudio() {
    if (cells[currentPositionPac].classList.contains('food')) {
      audio.src = 'assets/quick-jump.wav'
      audio.play()
    } else if (cells[currentPositionPac].classList.contains('cookie')) {
      audio.src = 'assets/yeah-boy.mp3'
      audio.play()
    }
  }
  
  
  const up = 38
  const down = 40
  const left = 37 
  const right = 39
  
  // const nextPositionUp = currentPositionPac - width
  // const nextPositionDown = currentPositionPac + width
  // const nextPositionLeft = currentPositionPac - 1
  // const nextPositionRight = currentPositionPac + 1
  
  
  function movePacman(event){
    const key = event.keyCode
    removePacman(currentPositionPac)
    eatFood(currentPositionPac)
    eatCookie(currentPositionPac)
    if (key === up && currentPositionPac >= width && doesContainWallUp() === false) {
      currentPositionPac -= width
      ghostKillPacman()
    } else if (key === down && currentPositionPac < cellCount - width && doesContainWallDown() === false){
      currentPositionPac += width
      ghostKillPacman()
    } else if (key === left && currentPositionPac % width !== 0 && doesContainWallLeft() === false) {
      currentPositionPac--
      ghostKillPacman()
    } else if (key === right && currentPositionPac % width !== width - 1 && doesContainWallRight() === false) {
      currentPositionPac++
      ghostKillPacman()
    }
    addPacman(currentPositionPac)
    eatAudio()
    console.log(cells[currentPositionPac].classList.contains('food'))
  }


  
  // wall collision detection

  function doesContainWall(nextPosition) {
    if (cells[nextPosition].classList.contains('wall')) {
      return true
    } else {
      return false
    } 
  }

  function doesContainWallUp() {
    const nextPositionUp = currentPositionPac - width
    if (cells[nextPositionUp].classList.contains('wall')) {
      return true
    } else {
      return false
    }
  }

  function doesContainWallDown() {
    const nextPositionDown = currentPositionPac + width
    if (cells[nextPositionDown].classList.contains('wall')) {
      return true
    } else {
      return false
    }
  }

  function doesContainWallLeft() {
    const nextPositionLeft = currentPositionPac - 1
    if (cells[nextPositionLeft].classList.contains('wall')) {
      return true
    } else {
      return false
    }
  } 
  
  function doesContainWallRight() {
    const nextPositionRight = currentPositionPac + 1
    if (cells[nextPositionRight].classList.contains('wall')) {
      return true
    } else {
      return false
    } 
  }
  
  function newCurrentPositionPac() {
    removePacman(currentPositionPac)
    currentPositionPac = 294
    addPacman(currentPositionPac)
  }




  // Ghost 

  function ghostKillPacman() {
    if (currentPositionGhostPink === currentPositionPac){
      console.log('gotcha')
      newCurrentPositionPac()
    }
  }


  function addGhost(position) {
    cells[position].classList.add('ghostPink')
  }
  
  function removeGhost(position) {
    cells[position].classList.remove('ghostPink')
  }




  let pinkDirection = randomDirection()
  
  
  function moveGhostPink(){
    timer = setInterval(() => {
      const newPosition = currentPositionGhostPink + pinkDirection
      if (!doesContainWall(newPosition)) {
        removeGhost(currentPositionGhostPink)
        currentPositionGhostPink = newPosition
        addGhost(currentPositionGhostPink)
      } else {
        pinkDirection = randomDirection()
      } 
      ghostKillPacman()
    }, 400)
  }
  moveGhostPink()


  function randomDirection() {
    return directions[Math.floor(Math.random() * 4)]
  }














  // const path = document.querySelectorAll('.grid div:not(.wall)')
  // console.log(path)
  // const pathArr = Array.from(path)
  // console.log(pathArr)



  // function createDotCell() {
  //   pathArr.forEach(cell => div[cell].classList.add('dotCell'))
  // }
  // createDotCell()








  // Events
  document.addEventListener('keydown', movePacman)
















}
window.addEventListener('DOMContentLoaded', init)