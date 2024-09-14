class Box{

    constructor(x , y , size , color){

        this.x = x 
        this.y = y 
        this.size = size
        this.finished = false
        this.color = color
        this.currentsize = 0
        this.targetx = undefined 
        this.targety = undefined
    }

    draw(){


        c.beginPath()
        c.strokeStyle = this.color
        c.rect(this.x , this.y , this.size , this.size)
        c.stroke()
        c.closePath()
      
    }

    update(){

        this.x += (this.targetx - this.x) * .08
        this.y += (this.targety - this.y) * .08
    }

}