class GamePage extends ui.gameUI{
    public arr:Array<Object> = [];
    private num:number = 0;  
    public crackRadius: number = 50;
    public hiderPos:Object;
    private scoreNum:number = 0;
    public track;
    public animation2;

    constructor(){
        super(); 
        this.init();
    }



    public init():void
    {
       this.gameBg.visible = true;
       this.gameNav.visible = true;
       this.gameBall.visible = true;


       this.gameNav.on(Events.CLICK,this,this.onGameNav)
    }

    public onGameNav():void
    {
        this.gameNav.visible = false;
        Laya.timer.frameLoop(1,this,this.onAnimation)
        Laya.timer.frameLoop(1,this,this.onAnim)

        var animation = new Laya.Animation; 
        var animation1 = new Laya.Animation;

        animation1.x = this.gameBg1.x;
        animation1.y = this.gameBg1.y;

        animation1.x = this.gameBg2.x;
        animation1.y = this.gameBg2.y;

        animation1.x = this.gameBg3.x;
        animation1.y = this.gameBg3.y;

        animation1.play(0,true,'ani2')

        animation.x = this.gameBall.x;
        animation.y = this.gameBall.y
        animation.play(0,true,'ani1')  

    }

     public onAnimation():void //球运动
    {
        if (this.gameBall.y > 860 || this.gameBall.y < 160) {
          if(this.gameBall.y > 860){
            this.gameBall.y = 860;
            this.num=0
          }
          if(this.gameBall.y < 160){
            this.gameBall.y = 160
            this.num=0;
          }
        }else{
          this.gameBall.y += this.num;
        }
       
    }

    public onAnim():void  //背景移动
    {
        this.scoreNum +=3
        this.gameScore.text =(Math.floor(Math.abs(this.scoreNum)/100)).toString(); 
        this.gameBg1.x -=3,this.gameBg2.x -=3,this.gameBg3.x -=3
        if(this.gameBg1.x<=-750){
            this.gameBg1.x = 1500;  
            this.track = this.gameBg3;
             for(var i=0;i<3;i++){     
                this.createHider(this.track);
            }
            this.track.removeChild()
        }

        if(this.gameBg2.x <= -750){
            this.gameBg2.x = 1500;  
            this.track = this.gameBg1;
             for(var i=0;i<3;i++){     
                this.createHider(this.track);
            }
            this.track.removeChild()
        }

        if(this.gameBg3.x<=-750){
            this.gameBg3.x = 1500;
            this.track = this.gameBg2;
             for(var i=0;i<3;i++){     
                this.createHider(this.track);
            }
            this.track.removeChild()
        }    
        this.checkCrack(this.track)
    }


     public createHider(track):void{
        this.animation2 = new Laya.Animation;
        this.animation2.loadAnimation('hider.ani');
       
        var hiderX = 20 + Math.floor(Math.random()*620);
        var hiderY = 160 + Math.floor(Math.random()*660);
        Laya.timer.frameLoop(1,this,()=>{ hiderX -=10})
            
        this.hiderPos = {
            x:hiderX,
            y:hiderY
        }
        this.arr.push(this.hiderPos)   
        for(let i=0;i<this.arr.length;i++){
            track.addChild(this.animation2) 
            this.animation2.pos(this.arr[i]['x'],this.arr[i]['y'])
        }   
    }

    public checkCrack(track):void
    {
        for(var i=0;i<this.arr.length;i++){ 
            if(Math.abs(Number(this.arr[i]['x']) + Number(track.x) - Number(this.gameBall.x)) <= this.crackRadius && Math.abs(Number(this.gameBall.y) - Number(this.arr[i]['y'])) <= 20)
            {
                Laya.timer.clear(this,this.onAnim);
                Laya.timer.clear(this,this.onAnimation);
                console.log(this.arr[i]['x']+'----'+track.x+'-----'+ this.gameBall.x)
                console.log(this.arr[i]['y']+'----'+track.y+'-----'+ this.gameBall.y)
                console.log(this.arr)
                // this.currentScore.visible = true;
                // this.scoreM.text = this.gameScore.text+'米';
                mainInst.mWX.reportMark(Number(this.gameScore.text));
            }
        }
    }

}