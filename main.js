// Config
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
//ctx.fillRect(0,0,canvas.width,canvas.height)

// Globals
let images = {
    mario:"https://miro.medium.com/max/420/0*UnsiT5rG5W41Ymxt",
    bg:"https://bit.ly/2LA87TH",
    goomba:"https://miro.medium.com/max/100/0*hecYvvrb0V0xXxkm.png"
}
let interval // si queremos apagar
let frames = 0 // siempre queremos contar
let enemies = []

// Clases
class GameItem{
    constructor(config){
        this.x = config.x ? config.x : 0
        this.y = config.y ? config.y : 0
        this.width = config.width ? config.width : 60
        this.height = config.height ? config.height : 60
        this.img = new Image()
        this.img.src = config.image ? config.image : null
        this.img.onload = this.draw
    }

    draw = () => {
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }

}

class Mario extends GameItem{
    constructor(config){
        super(config) // papi dame mi herencia diunavez tengo una idea de negocio muy buena
    }
    moveLeft = () => {
 // tarea mario no debe salirse 
        this.x-=56
    }

    moveRight = () => {
        if (this.x>=canvas.width) return // TAREA 
        this.x+=56
    }
}

class Goomba extends GameItem{
    constructor(config){
        super(config)
        this.vy = config.vy ? config.vy : 1
    }

    draw = () => { // sobreescrim¡bimos el draw original
        this.y+=this.vy // <<================================================= WTF tengo 30 min explicandolo!!
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height) 
    }
}

// Instancias
let backg = new GameItem({ height:canvas.height, width:canvas.width, image:images.bg })
let mario = new Mario({x:0,y:450,image:images.mario})
// si tengo 200 goombas ? o llego 10,000 ?? ---> Array!
// enemies.push(new Goomba({x:100,y:20,image:images.goomba})) // <<--- esto se puede repetir y no necesitamos recordar los nombres

// Main functions
function start() {
    interval = setInterval(update, 1000/60)
}

function update() { // esta mierda se repite infinitamente
    // también contamo
    frames++
    console.log(frames)
    // aquí dibujamo
    // antes borramo
    ctx.clearRect(0,0,canvas.width, canvas.height)
    // redibujamo cada uno de los elementos del videjuego (instancias) <-- regla
    backg.draw()
    mario.draw()
    // si lo quiero en mi videojuego lo tengo que meter a update
    drawGoombas()
    // generate stuff:
    if(frames%10 === 0) generateGoomba() // cual es el tiempo optimo para que no se encimen ...
}

function stop() {
    clearInterval(interval)
} 

// aux functions
// <3 de tu juego
function generateGoomba () { 
    // queremos: enemies.push(new Goomba({x:100,y:20,image:images.goomba}))
    let x = Math.floor((Math.random() * (canvas.width-5)) + 5)
    //generate random vy
    let goomba = new Goomba({x,image:images.goomba, vy:2})
    enemies.push(goomba)
}

function drawGoombas () {  // ya podemos dibujarlos a todos
    enemies.forEach(goomba=>{ // porque es un ciclo 
        goomba.draw()
    })
}

// listeners
addEventListener('keydown', e=>{
    if(e.keyCode === 37) mario.moveLeft() // esto es un atributo publico
    if(e.keyCode===39) mario.moveRight() // deberíamos usar setters y getters...
})

start()