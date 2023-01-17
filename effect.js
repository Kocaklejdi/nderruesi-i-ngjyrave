class Effect{
    constructor(canvas, video){
        this.canvas = canvas;
        this.video = video;
        this.ctx = canvas.getContext("2d");
        this.#animate();

    }
    #animate(){
        const{ctx,canvas,video} = this;
        ctx.drawImage(video,0,0,canvas.width,canvas.height);
        const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);

        const locs = getLocationsWithColor(
            imgData,{r:255,g:255,b:255}
        ); 
        ctx.fillStyle = "yellow";
        locs.forEach(loc => {
            ctx.fillRect(loc.x,loc.y,1,1); 
        });
        
        if(locs.length>0){
            const center = average(locs);
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.arc(center.x,center.y,5,0,Math.PI*2);
            ctx.fill();
        }
        
        requestAnimationFrame(this.#animate.bind(this));
    }
    
}