console.log("test");
export class CanvasSimulation {
    private readonly gl: WebGL2RenderingContext;

    constructor(private readonly canvas: HTMLCanvasElement){
        console.log("Created canvsas");
        this.gl = this.canvas.getContext("webgl2");
    }
    
    draw(){
        window.requestAnimationFrame(() => this.draw());
    }
}

window.onload = function () {
    const canvas = <HTMLCanvasElement>document.getElementById('image-particle-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    new CanvasSimulation(canvas);
}
