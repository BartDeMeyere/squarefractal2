var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

canvas.style.width = 100 + "%"
canvas.style.height = 100 + "%"

var size = 300
var blocks = []
var color = "rgba(255,255,255,.9)"
var order = 1
var animId = undefined

function renderContent(){

    c.clearRect(0 , 0 , canvas.width , canvas.height)

    blocks.forEach(box => {

        box.draw()
        box.update()

    })

    animId = requestAnimationFrame(renderContent)

}

function RenderFractal(){

    var newblocks = []

    if(order > 6){

        cancelAnimationFrame(animId)
        return
    }

    if(order === 1){

       var newblock = new Box(canvas.width/2 - size/2  , canvas.height/2 - size/2, size , color)
       newblock.targetx = canvas.width/2 - size/2
       newblock.targety = canvas.height/2 - size/2
       blocks.push(newblock)

    }

    if(order > 1){

        for(var i = 0 ; i < blocks.length ; i++){

            //for each block that is finished create 8 new blocks
            if(!blocks[i].finished){

                var newsize = blocks[i].size/3
                var sx = blocks[i].x + newsize
                var sy = blocks[i].y + newsize

                for(var row = -1 ; row < 2 ; row++){

                    for(var col = -1 ; col < 2 ; col++){

                        if(row !== 0 || col !== 0){

                            var newblock = new Box(blocks[i].x + newsize + col * newsize/3 , blocks[i].y + newsize + row * newsize/3 , newsize , color)
                            newblock.targetx = sx + col * blocks[i].size 
                            newblock.targety = sy + row * blocks[i].size 
                            newblocks.push(newblock)
                        }
                    }
                }
                 
            }

            blocks[i].finished = true

            //newblocks.push(blocks[i])
        }

        blocks = newblocks
    }

    order++

    setTimeout(RenderFractal,3000)


}

renderContent()
RenderFractal()









