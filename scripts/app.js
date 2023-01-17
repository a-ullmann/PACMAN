function init() {

  const grid = document.querySelector('.grid')
  const foodLeft = document.querySelector('#foodLeftSpan')
  const volumeBtn = document.querySelector('.volume')
  const scoreSpan = document.querySelector('#currentScore')
  const finalScoreSpan = document.querySelector('#finalScoreSpan')
  const overlayText = document.querySelector('.overlayText')
  const overlay = document.querySelector('.overlay')
  const overlayStart = document.querySelector('.overlayStart')
  const restartButton = document.querySelector('.startBtn2')
  const endButton = document.querySelector('.endBtn')
  const startButton = document.querySelector('.startBtn1')
  const livesDiv = document.querySelector('.lives')
  const life1 = document.querySelector('#life1')
  const life2 = document.querySelector('#life2')
  const life3 = document.querySelector('#life3')
  const width = 19
  const height = 21
  const cellCount = width * height
  const cells = []
  const audio = document.getElementById('audio')
  const audioBoi = document.getElementById('audio-boi')
  const eatTheGhosts = document.getElementById('eatTheGhosts')
  const pacgroundMusic = document.getElementById('pacgroundMusic')
  const pacDie = document.getElementById('pacDie')
  const walls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 28, 37, 38, 40, 41, 43, 44, 45, 47, 49, 50, 51, 53, 54, 56, 57, 75, 76, 78, 79, 81, 83, 84, 85, 86, 87, 89, 91, 92, 94, 95, 100, 104, 108, 113, 114, 115, 116, 117, 119, 120, 121, 123, 125, 126, 127, 129, 130, 131, 132, 133, 134, 135, 136, 138, 146, 148, 149, 150, 151, 152, 153, 154, 155, 157, 159, 160, 162, 163, 165, 167, 168, 169, 178, 182, 191, 192, 193, 195, 197, 198, 199, 200, 201, 203, 205, 206, 207, 208, 209, 210, 211, 212, 214, 222, 224, 225, 226, 227, 228, 229, 230, 231, 233, 235, 236, 237, 238, 239, 241, 243, 244, 245, 246, 247, 256, 265, 266, 268, 269, 271, 272, 273, 275, 277, 278, 279, 281, 282, 284, 285, 288, 300, 303, 304, 305, 307, 309, 311, 312, 313, 314, 315, 317, 319, 321, 322, 323, 328, 332, 336, 341, 342, 344, 345, 346, 347, 348, 349, 351, 353, 354, 355, 356, 357, 358, 360, 361, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398]
  const fakeWalls = [170, 190]
  const path = [20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 42, 46, 48, 52, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 77, 80, 82, 88, 90, 93, 96, 97, 98, 99, 101, 102, 103, 105, 106, 107, 109, 110, 111, 112, 118, 122, 124, 128, 137, 139, 140, 141, 142, 143, 144, 145, 147, 156, 158, 164, 166, 171, 172, 173, 174, 175, 176, 177, 183, 184, 185, 186, 187, 188, 189, 194, 196, 202, 204, 213, 215, 216, 217, 218, 219, 220, 221, 223, 232, 234, 240, 242, 248, 249, 250, 251, 252, 253, 254, 255, 257, 258, 259, 260, 261, 262, 263, 264, 267, 270, 274, 276, 280, 283, 287, 289, 290, 291, 292, 293, 295, 296, 297, 298, 299, 301, 306, 308, 310, 316, 318, 320, 324, 325, 326, 327, 329, 330, 331, 333, 334, 335, 337, 338, 339, 340, 343, 350, 352, 359, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378]
  const ghostSpawnBox = [161, 179, 180, 181]
  const pacmanSpawn = [294]
  const cookieCells = [39, 55, 286, 302]
  const intersections = [180]
  const ghosts = []

  let score = 0
  let lives = [life1, life2, life3]
  let foodCount = 180


  class Character {
    constructor(startingPosition, CSSclass) {
      this.startingPosition = startingPosition
      this.speed = 200
      this.counter = 5
      this.CSSclass = CSSclass
      this.scaredClass = 'ghostScared'
      this.currentPosition = this.startingPosition
      this.directions = [-width, width, -1, 1]
      this.ranDirection = this.randomDirection()
      this.timer
      this.scaredTimer
      this.isScared = false
    }
    gotScared() {
      this.isScared = true
      setTimeout(() => this.isScared = false, 8000)
    }
    addGhost() {
      cells[this.currentPosition].classList.add(this.CSSclass, 'ghost')
    }
    addScaredGhost() {
      cells[this.currentPosition].classList.add(this.scaredClass)
    }
    removeGhost() {
      cells[this.currentPosition].classList.remove(this.CSSclass, 'ghost', this.scaredClass)
    }
    randomDirection() {
      return this.directions[Math.floor(Math.random() * 4)]
    }
    moveGhost() {
      let ranDirection = this.randomDirection()
      this.timer = setInterval(() => {
        const newPosition = this.currentPosition + ranDirection
        const goUp = this.currentPosition - width
        if (cells[this.currentPosition] === cells[180] && !doesContainWall(newPosition)) {
          this.removeGhost()
          this.currentPosition = goUp
          this.isScared ? this.addScaredGhost() : this.addGhost()
        } else if (!doesContainWall(newPosition) && !doesContainGhost(newPosition)) {
          this.removeGhost()
          this.currentPosition = newPosition
          this.isScared ? this.addScaredGhost() : this.addGhost()
        } else {
          ranDirection = this.randomDirection()
        }
        this.ghostKillPacmanAgain()
      }, this.speed)
    }
    ghostKillPacmanAgain() {
      if (cells[pacman.currentPosition].classList.contains('ghost')) {
        pacDie.src = 'assets/pacDie.mp4'
        pacDie.volume = 0.1
        pacDie.play()
        pacman.pacmanDies()
      }
    }
    resetGhosts() {
      this.removeGhost()
      this.currentPosition = this.startingPosition
      this.addGhost()
    }
    pacmanKillGhost() {
      if (cells[pacman.currentPosition] === cells[this.currentPosition] && this.isScared) {
        score = score + 500
        this.removeGhost()
        this.currentPosition = this.startingPosition
        this.isScared = false
        this.addGhost()
        audioBoi.src = 'assets/yeah-boy.mp3'
        audioBoi.play()
      }
    }
  }


  class Pacman extends Character {
    constructor(startingPosition) {
      super(startingPosition)
      this.up = 38
      this.down = 40
      this.left = 37
      this.right = 39
      this.startingPosition = 294
      this.currentPosition = startingPosition
      this.pacClass = 'pacman'
    }
    addPacman() {
      cells[this.currentPosition].classList.add(this.pacClass)
      if (foodCount !== 0) {
        if (cells[this.currentPosition].classList.contains('food')) {
          score = score + 100
          scoreSpan.innerHTML = score
          foodCount--
          foodLeft.innerHTML = foodCount
          cells[this.currentPosition].classList.remove('food')
          audio.src = 'assets/quick-jump.wav'
          audio.play()
        } else if (cells[this.currentPosition].classList.contains('cookie')) {
          score = score + 200
          scoreSpan.innerHTML = score
          ghosts.forEach(ghost => ghost.gotScared())
          this.eatCookie()
          eatTheGhosts.src = 'assets/scaredGhosts.mp4'
          eatTheGhosts.volume = 0.2
          eatTheGhosts.play()
        }
      } else {
        gameOver()
      }
    }
    removePacman() {
      cells[this.currentPosition].classList.remove(this.pacClass)
      cells[this.currentPosition].style.transform = 'initial'
    }
    movePacman(event, target) {
      const key = event.keyCode
      target.eatCookie()
      this.removePacman()
      if (key === target.up && !doesContainWall(target.currentPosition - width)) {
        target.currentPosition -= width
        cells[this.currentPosition].style.transform = 'rotate(270deg)'
        this.ghostKillPacmanAgain()
        ghosts.forEach(ghost => ghost.pacmanKillGhost())
      } else if (key === target.down && !doesContainWall(target.currentPosition + width)) {
        target.currentPosition += width
        cells[this.currentPosition].style.transform = 'rotate(90deg)'
        this.ghostKillPacmanAgain()
        ghosts.forEach(ghost => ghost.pacmanKillGhost())
      } else if (key === target.left && !doesContainWall(target.currentPosition - 1)) {
        if (cells[this.currentPosition] === cells[171]) {
          target.currentPosition = target.currentPosition + 18
        } else {
          target.currentPosition--
          cells[this.currentPosition].style.transform = 'scaleX(-1)'
          this.ghostKillPacmanAgain()
          ghosts.forEach(ghost => ghost.pacmanKillGhost())
        }
      } else if (key === target.right && !doesContainWall(target.currentPosition + 1)) {
        if (cells[this.currentPosition] === cells[189]) {
          target.currentPosition = target.currentPosition - 19
        }
        target.currentPosition++
        this.ghostKillPacmanAgain()
        ghosts.forEach(ghost => ghost.pacmanKillGhost())
      }
      target.addPacman()
    }
    eatCookie() {
      cells[this.currentPosition].classList.remove('cookie')
    }
    pacmanDies() {
      this.removePacman()
      this.currentPosition = this.startingPosition
      loseLife()
      this.addPacman()
    }
  }

  const pacman = new Pacman(294)
  const ghost1 = new Character(161, 'yellow')
  const ghost2 = new Character(179, 'pink')
  const ghost3 = new Character(180, 'blue')
  const ghost4 = new Character(181, 'yellow')
  ghosts.push(ghost1)
  ghosts.push(ghost2)
  ghosts.push(ghost3)
  ghosts.push(ghost4)


  createGrid()
  createEnvironment()
  ghosts.forEach(ghost => ghost.moveGhost())


  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add(i)
      grid.appendChild(cell)
      cells.push(cell)
    }
    pacman.addPacman()
  }
  function createEnvironment() {
    walls.forEach(wall => cells[wall].classList.add('wall'))
    fakeWalls.forEach(wall => cells[wall].classList.add('fakeWall'))
    path.forEach(path => cells[path].classList.add('food'))
    ghostSpawnBox.forEach(wall => cells[wall].classList.add('ghostSpawnBox'))
    cookieCells.forEach(cook => cells[cook].classList.add('cookie'))
    pacmanSpawn.forEach(pac => cells[pac].classList.add('pacmanSpawn'))
  }
  function loseLife() {
    if (lives.length > 1) {
      lives[lives.length - 1].remove()
      lives.pop()
    } else {
      gameOver()
    }
  }
  function doesContainWall(nextPosition) {
    if (cells[nextPosition].classList.contains('wall')) {
      return true
    } else {
      return false
    }
  }
  function doesContainGhost(nextPosition) {
    if (cells[nextPosition].classList.contains('ghost')) {
      return true
    } else {
      return false
    }
  }
  function resetGame() {
    overlayStart.style.display = 'none'
    overlay.style.display = 'none'
    pacman.removePacman()
    pacman.currentPosition = pacman.startingPosition
    pacman.addPacman()
    ghosts.forEach(ghost => ghost.resetGhosts())
    createEnvironment()
    foodCount = 180
    foodLeft.innerHTML = foodCount
    score = 0
    scoreSpan.innerHTML = score
    lives = [life1, life2, life3]
    lives.forEach(life => livesDiv.appendChild(life))
    audioStart()
  }
  function gameOver() {
    overlay.style.display = 'flex'
    finalScoreSpan.innerHTML = score
    if (foodCount === 0) {
      overlayText.innerHTML = 'YOU WIN!!!'
      overlayText.style.color = 'yellow'
      overlayText.style.textShadow = '3px 3px blue'
    } else {
      overlayText.innerHTML = 'GAME OVER'
      overlayText.style.color = 'blue'
      overlayText.style.textShadow = '4px 4px yellow'
    }
  }
  function audioStart() {
    pacgroundMusic.src = 'assets/pacgroundmusic.wav'
    pacgroundMusic.volume = 0.04
    pacgroundMusic.play()
  }
  function toggleAudio() {
    if (pacgroundMusic.paused) {
      pacgroundMusic.play()
    } else {
      pacgroundMusic.pause()
    }
  }
  function executeMovePacman(event) {
    pacman.movePacman(event, pacman)
  }




  volumeBtn.addEventListener('click', toggleAudio)
  startButton.addEventListener('click', resetGame)
  endButton.addEventListener('click', gameOver)
  restartButton.addEventListener('click', resetGame)
  document.addEventListener('keydown', executeMovePacman)




}

window.addEventListener('keydown', function (event) {
  if ([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
    event.preventDefault()
  }
}, false)
window.addEventListener('DOMContentLoaded', init)