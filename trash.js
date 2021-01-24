class Trash{
    constructor(x, y, radius, angle){
        var options={
            isStatic: false,
            restitution : 0.8,
            friction : 0.5,
            density : 1.2
        }
        this.body = Bodies.circle(x, y, radius, options);
        this.image = loadImage("paper.png");
        this.image.scale=0.2;
        this.body.position.x = x;
        this.body.position.y =y;
        radius = this.body.radius;
        Matter.Body.setAngle(this.body, angle);
        World.add(world, this.body);

    }
    display(){
        var pos= this.body.position;
        var angle = this.body.angle;
        var radius = this.body.radius;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0, 90,90);
        pop();
    }
}