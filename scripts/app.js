function init () {
  
  // Elements
  const grid = document.querySelector('.grid')
  const width = 20
  const height = 22
  const cellCount = width * height
  const cells = []
  const startingPositionPac = 115
  const startingPositionGhostY = 45
  const startingPositionGhostB = 46
  
  // Variables
  let currentPositionPac = startingPositionPac
  let currentPositionGhostY = startingPositionGhostY
  let currentPositionGhostB = startingPositionGhostB
  let timer
  
  
  // Execution
  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerHTML = i
      cell.classList.add(i)
      grid.appendChild(cell)
      cells.push(cell)
    }
    
    addPacman(startingPositionPac)
    addGhost(startingPositionGhostY)
    addGhost(startingPositionGhostB)
  }
  createGrid()
  
  
  const walls = [cells[0], cells[1], cells[2], cells[3], cells[4], cells[5], cells[6], cells[7], cells[8], cells[9], cells[10], cells[11], cells[12], cells[13], cells[14], cells[15], cells[16], cells[17], cells[18], cells[19],
    cells[10], cells[20], cells[30], cells[40], cells[50], cells[60], cells[70], cells[80], cells[90], cells[100], cells[110], cells[120], cells[130], cells[140],
    cells[141], cells[142], cells[143], cells[144], cells[145], cells[146], cells[147], cells[148], cells[149], 
    cells[19], cells[29], cells[39], cells[49], cells[59], cells[69], cells[79], cells[89], cells[99], cells[109], cells[119], cells[129], cells[139],
    cells[122], cells[123], cells[124], cells[125], cells[126], cells[127]]
  
  function createWalls(){
    walls.forEach(wall => wall.classList.add('wall'))
  }
  createWalls()
    
  
  function addPacman(position) {
    cells[position].classList.add('pacman')
  }
  
  function removePacman(position){
    cells[position].classList.remove('pacman')
  }

  
  function movePacman(event){
    const key = event.keyCode
    const up = 38
    const down = 40
    const left = 37
    const right = 39
    removePacman(currentPositionPac)
    
    if (key === right && currentPositionPac % width !== width - 1 && doesContainWallRight() === false) {
      currentPositionPac++
      ghostKillPacman()
    } else if (key === left && currentPositionPac % width !== 0 && doesContainWallLeft() === false) {
      currentPositionPac--
      ghostKillPacman()
    } else if (key === up && currentPositionPac >= width && doesContainWallUp() === false) {
      currentPositionPac -= width
      ghostKillPacman()
    } else if (key === down && currentPositionPac < cellCount - width && doesContainWallDown() === false){
      currentPositionPac += width
      ghostKillPacman()
    }
    addPacman(currentPositionPac)
  }
  
  
  function doesContainWallRight() {
    const nextPositionRight = currentPositionPac + 1
    if (cells[nextPositionRight].classList.contains('wall')) {
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
    
  function newCurrentPositionPac() {
    removePacman(currentPositionPac)
    currentPositionPac = 170
    addPacman(currentPositionPac)
  }

  function ghostKillPacman() {
    if (currentPositionGhostY === currentPositionPac || currentPositionGhostB === currentPositionPac){
      console.log('hi')
      newCurrentPositionPac()
    }
  }


  function addGhost(position) {
    cells[position].classList.add('ghost')
  }
  
  function removeGhost(position) {
    cells[position].classList.remove('ghost')
  }

  function moveGhostY(){
    timer = setInterval(() => {
      if (currentPositionGhostY < cellCount - width){
        removeGhost(currentPositionGhostY)
        currentPositionGhostY += width
        addGhost(currentPositionGhostY)
      }
      ghostKillPacman()
    }, 400)
  }
  function moveGhostB(){
    timer = setInterval(() => {
      if (currentPositionGhostB < cellCount - width){
        removeGhost(currentPositionGhostB)
        currentPositionGhostB++
        addGhost(currentPositionGhostB)
      }
      ghostKillPacman()
    }, 400)
  }
  moveGhostY()
  moveGhostB()


  // Events
  document.addEventListener('keydown', movePacman)













  // Notes

  // 1 = wall
  // 0 = path


  const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1],
    [1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
    [1,1,0,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1],
    [1,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]





}
window.addEventListener('DOMContentLoaded', init)