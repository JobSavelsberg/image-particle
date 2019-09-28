import { Sprite } from "pixi.js";

export class Particle{
    public vx: number;
    public vy: number;
    public sprite: Sprite;
    constructor (index: number, sprite: Sprite){
        this.vx = 0;//Math.random()*2-1;
        this.vy = 0;//Math.random()*2-1;
        this.sprite = sprite;
    }

    update(delta: number){
        this.sprite.x += this.vx*delta;
        this.sprite.y += this.vy*delta;
        this.vx += -0.01*this.vx;
        this.vy += -0.01*this.vy;

    }
}