var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

canvas.style.width = 100 + "%"
canvas.style.height = 100 + "%"

var size = 600 
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

        console.log("done")
        return
    }

    if(order === 1){

       var sx = canvas.width/2 
       var sy = canvas.height/2 

       for(var i = -1 ; i < 2 ; i++){

            for(var j = -1 ; j < 2 ; j++){

                if(i !== 0 || j !== 0){

                    var newblock = new Box(sx + j * size/3   , sy + i * size/3 , size/3 , color)
                    newblock.targetx = sx + j * size
                    newblock.targety = sy + i * size
                    blocks.push(newblock)
                }
            }
       }

    }


    if(order > 1){

        for(var i = 0 ; i < blocks.length ; i++){

                var newsize = blocks[i].size/3
                var sx = blocks[i].x + newsize
                var sy = blocks[i].y + newsize

                for(var row = -1 ; row < 2 ; row++){

                    for(var col = -1 ; col < 2 ; col++){

                        if(row !== 0 || col !== 0){

                            var newblock = new Box(sx + col * newsize/3 , sy + row * newsize/3 , newsize , color)
                            newblock.targetx = sx + col * blocks[i].size 
                            newblock.targety = sy + row * blocks[i].size 
                            newblocks.push(newblock)
                        }
                    }
                }
                 

        }

        blocks = newblocks
    }

    order++

    setTimeout(RenderFractal,3000)


}

renderContent()
RenderFractal()









