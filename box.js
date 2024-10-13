class Box{

    constructor(x , y , size , rotation , color){

        this.x = x 
        this.y = y 
        this.size = size
        this.finished = false
        this.color = color
        this.rotation = rotation
        this.created = false

    }

    draw(){

        c.save()
        c.translate(this.x , this.y)
        c.rotate(this.rotation)
        c.beginPath()
        c.fillStyle = this.color
        c.rect(-this.size/2 , -this.size/2 , this.size , this.size)
        c.fill()
        c.closePath()
        c.restore()

    }
}