function init () {

  
  
  // class Pacman extends Character {
  //   constructor(charName, startingPos, up, down, left, right) {
  //     super(charName, startingPos)
  //     this.up = up
  //     this.down = down
  //     this.left = left
  //     this.right = right
  //   }
  // }
  // const pacman = new Pacman('Pacman', 55, 38, 40, 37, 39)
  // const ghost1 = new Character(41, 'ghostPink')
  // const ghost2 = new Character(45)
  
  

  
  // Elements
  const grid = document.querySelector('.grid')
  const scoreSpan = document.querySelector('#currentScore')
  const highScoreSpan = document.querySelector('#highScore')
  const pinkGhost = document.querySelector('.ghostPink')
  const width = 19
  const height = 21
  const cellCount = width * height
  const cells = []
  const startingPositionPac = 294
  const audio = document.getElementById('audio')
  const audioBoi = document.getElementById('audio-boi')
  const foodCells = document.getElementsByClassName('food')
  const startingPositionGhostPink = 142
  const up = 38
  const down = 40
  const left = 37 
  const right = 39
  const walls = [0, 1, 2, 3, 4, 5, 6,	7, 8,	9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 28, 37, 38, 40, 41, 43, 44, 45, 47, 49, 50, 51, 53, 54, 56, 57, 75, 76, 78, 79,	81,	83,	84,	85,	86,	87,	89,	91,	92,	94, 95,	100, 104,	108, 113, 114, 115, 116, 117, 119, 120, 121, 123, 125, 126, 127, 129, 130, 131, 132, 133, 134, 135, 136, 138, 146, 148, 149, 150, 151, 152, 153, 154, 155, 157, 159, 160, 162, 163, 165, 167, 168, 169, 170,178, 182, 190, 191, 192, 193, 195, 197, 198, 199, 200, 201, 203, 205, 206, 207, 208, 209, 210, 211, 212, 214, 222, 224, 225, 226, 227, 228, 229, 230, 231, 233, 235, 236, 237, 238, 239, 241, 243, 244, 245, 246, 247, 256, 265, 266, 268, 269, 271, 272, 273, 275, 277, 278, 279, 281, 282, 284, 285, 288, 300, 303, 304, 305, 307, 309, 311, 312, 313, 314, 315, 317, 319, 321, 322, 323, 328, 332, 336, 341, 342, 344, 345, 346, 347, 348, 349, 351, 353, 354, 355, 356, 357, 358, 360, 361, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398]
  const ghostSpawnBox = [161, 179, 180, 181]
  const cookieCells = [39, 55, 286, 302]


  

  // Variables
  let currentPositionPac = startingPositionPac
  let timer
  let scaredTimer
  let score = 0
  
  

  class Character {
    constructor(startingPosition, CSSclass) {
      this.startingPosition = startingPosition
      this.speed = 400
      this.counter = 5
      this.CSSclass = CSSclass
      this.scaredClass = 'ghostScared'
      this.currentPosition = this.startingPosition
      this.directions = [-width, width, -1, 1]
    }  
    addGhost() {
      cells[this.currentPosition].classList.add(this.CSSclass)
    }
    addScaredGhost() {
      cells[this.currentPosition].classList.add(this.scaredClass)
    }
    removeGhost() {
      cells[this.currentPosition].classList.remove(this.CSSclass)
    }
    removeScaredGhost() {
      cells[this.currentPosition].classList.remove(this.scaredClass)
    }

    moveGhost(){
      let ranDirection = this.randomDirection()
      timer = setInterval(() => {
        const newPosition = this.currentPosition + ranDirection
        if (!doesContainWall(newPosition)) {
          removeScaredGhost(this.currentPosition)
          removeGhost(this.currentPosition)
          this.currentPosition = newPosition
          addGhost(this.currentPosition)
        } else {
          ranDirection = this.randomDirection()
        } 
        ghostKillPacman()
      }, this.speed)
    }
    randomDirection() {
      return this.directions[Math.floor(Math.random() * 4)]
    }
  }

  








  // Execution
 



  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.classList.add(i)
      cell.classList.add('food')
      grid.appendChild(cell)
      cells.push(cell)
    }
    addPacman(startingPositionPac)
    // addGhost(startingPositionGhostPink,)
  }  



  // //! would it makes sense to create a dynamic function here?
  // function createEnvironment(location, addItem, removeItem) {
  //   location.forEach(wall => cells[wall].classList.add(`${addItem}`))
  //   location.forEach(wall => cells[wall].classList.remove(`${removeItem}`))
  // }


  //   createEnvironment(walls, 'wall', 'food')


  function createWalls(){
    walls.forEach(wall => cells[wall].classList.add('wall'))
    walls.forEach(wall => cells[wall].classList.remove('food'))
  }
  function createGhostSpawnBox(){
    ghostSpawnBox.forEach(wall => cells[wall].classList.add('ghostSpawnBox'))
    ghostSpawnBox.forEach(wall => cells[wall].classList.remove('food'))
  }
  function createCookies(){
    cookieCells.forEach(cook => cells[cook].classList.add('cookie'))
    cookieCells.forEach(cook => cells[cook].classList.remove('food'))
  }
  function eatCookie(position){
    cells[position].classList.remove('cookie')
  }
  function randomDirection() {
    return directions[Math.floor(Math.random() * 4)]
  }
  function removePacman(position){
    cells[position].classList.remove('pacman')
  }
  

  function addPacman(position) {
    cells[position].classList.add('pacman')
    if (cells[currentPositionPac].classList.contains('food')) {
      score = score + 100
      scoreSpan.innerHTML = score
      cells[position].classList.remove('food')
      audio.src = 'assets/quick-jump.wav'
      audio.play()
    } else if (cells[currentPositionPac].classList.contains('cookie')){
      score = score + 200
      scoreSpan.innerHTML = score
      // moveScaredGhost()
      cells[position].classList.remove('cookie')
      audioBoi.src = 'assets/yeah-boy.mp3'
      audioBoi.play()
    }
  }

  createGrid()
  createWalls()
  createGhostSpawnBox()
  createCookies()


  const ghost1 = new Character(145, 'ghostPink')
  ghost1.speed = 1000
  ghost1.moveGhost()
  console.log(ghost1)
  
  function movePacman(event){
    const key = event.keyCode
    removePacman(currentPositionPac)
    eatCookie(currentPositionPac)
    if (key === up && currentPositionPac >= width && !doesContainWall(currentPositionPac - width)) {
      currentPositionPac -= width
      ghostKillPacman()
    } else if (key === down && currentPositionPac < cellCount - width && !doesContainWall(currentPositionPac + width)){
      currentPositionPac += width
      ghostKillPacman()
    } else if (key === left && currentPositionPac % width !== 0 && !doesContainWall(currentPositionPac - 1)) {
      currentPositionPac--
      ghostKillPacman()
    } else if (key === right && currentPositionPac % width !== width - 1 && !doesContainWall(currentPositionPac + 1)) {
      currentPositionPac++
      ghostKillPacman()
    }
    addPacman(currentPositionPac)
  }


  
  // wall collision detection

  function doesContainWall(nextPosition) {
    if (cells[nextPosition].classList.contains('wall')) {
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




  // ! Ghost 

  function ghostKillPacman() {
    if (currentPositionGhostPink === currentPositionPac){
      console.log('gotcha')
      newCurrentPositionPac()
    }
  }


  // function addGhost(position, name) {
  //   cells[position].classList.add(`${name}`)
  // }

  // function addScaredGhost(position) {
  //   cells[position].classList.add('ghostScared')
  // }
  // function removeGhost(position) {
  //   cells[position].classList.remove('ghostPink')
  // }
  // function removeScaredGhost(position) {
  //   cells[position].classList.remove('ghostScared')
  // }

  // let pinkDirection = randomDirection()


  
  function addGhost(position) {
    cells[position].classList.add('ghostPink')
  }
  function addScaredGhost(position) {
    cells[position].classList.add('ghostScared')
  }
  function removeGhost(position) {
    cells[position].classList.remove('ghostPink')
  }
  function removeScaredGhost(position) {
    cells[position].classList.remove('ghostScared')
  }





  
  
  // function moveGhostPink(){
  //   timer = setInterval(() => {
  //     const newPosition = currentPositionGhostPink + pinkDirection
  //     if (!doesContainWall(newPosition)) {
  //       removeScaredGhost(currentPositionGhostPink)
  //       removeGhost(currentPositionGhostPink)
  //       currentPositionGhostPink = newPosition
  //       addGhost(currentPositionGhostPink)
  //     } else {
  //       pinkDirection = randomDirection()
  //     } 
  //     ghostKillPacman()
  //   }, speed)
  // }
  // moveGhostPink()

  
  // function moveScaredGhost() {
  //   clearInterval(timer)
  //   scaredTimer = setInterval(() => {
  //     const newPosition = currentPositionGhostPink + pinkDirection
  //     if (!doesContainWall(newPosition)) {
  //       removeGhost(currentPositionGhostPink)
  //       removeScaredGhost(currentPositionGhostPink)
  //       currentPositionGhostPink = newPosition
  //       addScaredGhost(currentPositionGhostPink)
  //     } else {
  //       pinkDirection = randomDirection()
  //     }
  //   }, speed)
  //   countdown(counter, scaredTimer, moveGhostPink)
  // }


  function countdown(counter, timer, move){
    const countdownTimer = setInterval(() => {
      if (counter > 0) {
        counter--
      } else {
        clearInterval(countdownTimer)
        clearInterval(timer)
        move()
      }
    }, 1000)
  }






















  // Events
  document.addEventListener('keydown', movePacman)
















}
window.addEventListener('DOMContentLoaded', init)