import { Particle }from "./particle";

const PARTICLE_SIZE = 2;

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)

let app = new PIXI.Application({ 
    antialias: true,
    backgroundColor: 0x333333,
    autoResize: true,
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);


PIXI.loader
.add("LOGO","../assets/JSTW.png")
.load(setup);

let logo: PIXI.Sprite;
let particles: Particle[] = [];
function setup() {
    logo = new PIXI.Sprite(
        PIXI.loader.resources.LOGO.texture
    );
    let scale = (app.view.width/2)/logo.width;
    logo.scale.set(scale);
    logo.x = app.view.width/2-logo.width/2;
    logo.y = app.view.height/2-logo.height/2;
    app.stage.addChild(logo);
    
    app.ticker.add(delta => loop(delta));


    let particleContainer = new PIXI.particles.ParticleContainer();
    const p = new PIXI.Graphics();
    p.beginFill(0xff0000);
    p.lineStyle(0);
    p.drawCircle(PARTICLE_SIZE, PARTICLE_SIZE, PARTICLE_SIZE);
    p.endFill();
    const t = PIXI.RenderTexture.create(p.width, p.height);
    app.renderer.render(p, t);
    
    const pixels = app.renderer.extract.pixels(logo);
    const step = Math.round(PARTICLE_SIZE/scale);
    for(let y = 0; y < logo.texture.height; y+=step){
        for(let x = 0; x < logo.texture.width; x+=step){
            const yMiddle = y+Math.round(step/2);
            const xMiddle = x+Math.round(step/2);
            var index   = (xMiddle+yMiddle*logo.texture.width) * 4+3;
            if(pixels[index] > 127){
                let sprite = new PIXI.Sprite(t);
                sprite.position.set(logo.x+xMiddle*scale-PARTICLE_SIZE/2,logo.y+yMiddle*scale-PARTICLE_SIZE/2);
                particleContainer.addChild(sprite);
                particles.push(new Particle(particleContainer.children.length,sprite));
            }
        }
    }

    app.stage.addChild(particleContainer);
    console.log(particleContainer.children.length);
 
}

function loop(delta: number){
    for(const particle of particles){
        particle.update(delta);
    }
    app.renderer.render(app.stage);
}