function init () {

  const grid = document.querySelector('.grid')

  const width = 10
  const height = 15
  const cellCount = width * height
  const cells = []
  
  const startingPositionPac = 125
  let currentPositionPac = startingPositionPac
  const startingPositionGhost = 45
  let currentPositionGhost = startingPositionGhost

  let timer

  function createGrid(){
    for (let i = 0; i < cellCount; i++){
      const cell = document.createElement('div')
      cell.innerHTML = i
      cell.dataset.index = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addPacman(startingPositionPac)
    addGhost(startingPositionGhost)
  }
  createGrid()
  
  // function createWalls(){
  // wall.classList.add('wall')
  //   cells.classList.add('wall')
  // }
  // createWalls()


  function addPacman(position) {
    cells[position].classList.add('pacman')
  }

  function removePacman(position){
    cells[position].classList.remove('pacman')
  }

  function movePacman(event){
    const key = event.keyCode
    console.log(key)
    const up = 38
    const down = 40
    const left = 37
    const right = 39
    removePacman(currentPositionPac)
    
    if (key === right && currentPositionPac % width !== width - 1) {
      console.log('right')
      currentPositionPac++
    } else if (key === left && currentPositionPac % width !== 0) {
      console.log('left')
      currentPositionPac--
    } else if (key === up && currentPositionPac >= width) {
      console.log('up')
      currentPositionPac -= width
    } else if (key === down && currentPositionPac < cellCount - width){
      console.log('down')
      currentPositionPac += width
    }
    addPacman(currentPositionPac)
  }

  document.addEventListener('keydown', movePacman)


  function addGhost(position) {
    cells[position].classList.add('ghost')
  }

  function removeGhost(position) {
    cells[position].classList.remove('ghost')
  }

  function moveGhost(){
    timer = setInterval(() => {
      if (currentPositionGhost < cellCount - width){
        removeGhost(currentPositionGhost)
        console.log('ghost is moving down')
        currentPositionGhost += width
        addGhost(currentPositionGhost)
      }
    }, 1000)
  }

  moveGhost()

































}
window.addEventListener('DOMContentLoaded', init)