var canvas = document.querySelector("canvas")
var c = canvas.getContext("2d")

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

canvas.style.width = 100 + "%"
canvas.style.height = 100 + "%"

var currentsize = 400
var easing = .03
var boxes = []
var color = "hsla(" + Math.floor(Math.random() * 360) + ",100%,50%,1)"
CreateFractal()
renderContent()

function renderContent(){

    c.clearRect(0 , 0 , canvas.width , canvas.height)

    boxes.forEach(box => { box.draw() })

    requestAnimationFrame(renderContent)
}

function EaseRotation(object , startrotation , endrotation , easing){

    function run(){

        var rotationspeed = (endrotation - object.rotation) * easing

        object.rotation += rotationspeed
   
        if(rotationspeed < .00001){

           object.rotation = endrotation
           object.finished = true
           return

        }else{

            requestAnimationFrame(run)
        }  
       
    }
    
    run()
}

function EaseOut(object , nx , ny , easing){

    function run(){

        object.x += (nx - object.x) * easing
        object.y += (ny - object.y) * easing

        var dx = nx - object.x 
        var dy = ny - object.y
        var dist = Math.sqrt(dx * dx + dy * dy)
        
        if(Math.abs(dist) < .01){

            return

        }else{

            requestAnimationFrame(run)
        }  
       
    }
    
    run()
}

function CreateFractal(){

    if(currentsize % 5 > 0){

        console.log(currentsize)
        console.log("we are done")
        return

    }else{

        //create first box
        if(boxes.length === 0){

            var box = new Box(canvas.width/2 , canvas.height/2 , currentsize , 0 , color)
            boxes.push(box)
            EaseRotation(box , 0 ,  2 * Math.PI/2 , easing)


        }else{

            for(var i = boxes.length - 1  ; i >= 0  ; i--){

                if(boxes[i].finished  && !boxes[i].created ){

                    for(var r = -1 ; r < 2 ; r++){

                        for(var c = -1 ; c < 2 ; c++){

                            if((r === -1 && c === -1) || (r === -1 && c === 1) || ( r === 1 && c === -1) || ( r === 1 && c === 1)){

                                var x = boxes[i].x 
                                var y = boxes[i].y
                                
                                currentsize = boxes[i].size/2 

                                var box = new Box(x , y , currentsize ,  0 , color)
                                boxes.push(box)

                                var nx = boxes[i].x + c * boxes[i].size/1.35
                                var ny = boxes[i].y + r * boxes[i].size/1.35

                                EaseRotation(box , 0 , 2 * Math.PI * .75 , easing)
                                EaseOut(box , nx  , ny , easing)
                            }
                        }
                    }

    
                    boxes[i].created = true
               
            
                }

                
            }

         
        }

    }

    setTimeout(CreateFractal , 1)
}


