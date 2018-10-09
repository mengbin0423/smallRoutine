//下一个超越
class nextPlayer extends ui.nextPlayerUI
{
    constructor()
    {
        super();
    }    
}

class newRank extends ui.newRankUI
{
    private sOpenId:string = "";
    private page:number = 1;
    private pages:number = 0;
    public  mLevel:number = 0;

    private mDate:Array<Object> = [];
    constructor()
    {
        super();
        this.page = 1;
        this.pages = 0;
        this.sOpenId = "";
        this.mDate = [];

        this.mlist.renderHandler = new Laya.Handler(this,this.updateUser);
        this.mlist.selectEnable = false;
        this.mlist.mouseEnabled = false;

        var info = wx.getSystemInfoSync();
        if (info['screenHeight'] * 2 > Laya.stage.height)
        {
          Laya.stage.height = info['screenHeight'] * 2;
        }
        this.rankListBg.y = this.rankListBg.y - (Laya.stage.height - 1334) / 2;
    }

    public show():void
    {
        this.visible = true;
    }

    public init(message:Object):void
    {
        let info:Object = message['info'];
        this.sOpenId = info['openid'];
        let dir:string = message['dir'];
        console.log("dir here:" + dir);
        if(dir == "none")
        {
            GameMain.app.sortData(message['level']);
            this.mLevel = message['level'];

            var total:number = 0;
            if(this.mLevel == 0)
            {
                this.pages = Math.ceil(GameMain.app.mData.length / 5);
                total = GameMain.app.mData.length;
            }
            else
            {
                for(var i=0;i<GameMain.app.mData.length;i++)
                {
                    if(this.mLevel == 1 && GameMain.app.mData[i]['map1'] > 0)
                        total = total + 1;
                    if(this.mLevel == 2 && GameMain.app.mData[i]['map2'] > 0)
                        total = total + 1;
                    if(this.mLevel == 3 && GameMain.app.mData[i]['map3'] > 0)
                        total = total + 1;
                }
                this.pages = Math.ceil(total / 5);
            }
            if(this.pages == 0)
                this.pages = 1;
            console.log("pages:" + this.pages + "," + total + "," + this.mLevel)
            var have:boolean = false;
            for(var i=0;i<GameMain.app.mData.length;i++)
            {
                if(GameMain.app.mData[i]['openid'] == this.sOpenId)
                {
                    this.mRank.text = GameMain.app.mData[i]['rank'];
                    this.mUser.text = GameMain.app.mData[i]['name'];
                    // this.myLevel.text = GameMain.app.mData[i]['level'].toString();
                    console.log(GameMain.app.mData[i]['level'].toString())
                    this.myFace.skin = GameMain.app.mData[i]['avatar'];
                    if(this.mLevel == 1)    
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['map1']) + "%";
                    else if(this.mLevel == 2)    
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['map2']) + "%";
                    else if(this.mLevel == 3)    
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['map3']) + "%";
                    else
                        this.mMark.text = Math.floor(GameMain.app.mData[i]['mark']) + "米";

                    this.mRank.text = GameMain.app.mData[i]['rank'];    
                    have = true;
                    break;
                }
            }
            this.mSelf.visible = have;
        }
        this.onFlip(dir,this.mLevel);
    }

    public initGroup(message:Object):void
    {
        var groupid:string = message['groupid'];
        this.sOpenId = GameMain.app.mOpenID;
        let dir:string = message['dir'];
        console.log("dir:" + dir);
        if(dir == "none")
        {
            GameMain.app.sortGroupData(groupid,message['level']);

            this.mLevel = message['level'];
            if(this.mLevel == 0)
                this.pages = Math.ceil(GameMain.app.mGroups[groupid].length / 5);
            else
            {
                var total:number = 0;
                for(var i=0;i<GameMain.app.mGroups[groupid].length;i++)
                {
                    if(this.mLevel == 1 && GameMain.app.mGroups[groupid][i]['map1'] > 0)
                        total = total + 1;
                    if(this.mLevel == 2 && GameMain.app.mGroups[groupid][i]['map2'] > 0)
                        total = total + 1;
                    if(this.mLevel == 3 && GameMain.app.mGroups[groupid][i]['map3'] > 0)
                        total = total + 1;
                }
                this.pages = Math.ceil(total / 5);
                if(this.pages == 0)
                    this.pages = 1;
                console.log("pages:" + this.pages + "," + total + "," + this.mLevel)
            }
            var have:boolean = false;
            for(var i=0;i<GameMain.app.mGroups[groupid].length;i++)
            {
                if(GameMain.app.mGroups[groupid][i]['openid'] == this.sOpenId)
                {
                    this.mRank.text = GameMain.app.mGroups[groupid][i]['rank'];
                    this.mUser.text = GameMain.app.mGroups[groupid][i]['name'];
                    // this.myLevel.text = GameMain.app.mGroups[groupid][i]['level'];   
                    this.myFace.skin = GameMain.app.mGroups[groupid][i]['avatar'];
                    if(this.mLevel == 1)    
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['map1']) + "%";
                    else if(this.mLevel == 2)    
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['map2']) + "%";
                    else if(this.mLevel == 3)    
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['map3']) + "%";
                    else
                        this.mMark.text = Math.floor(GameMain.app.mGroups[groupid][i]['mark']) + "米";

                    this.mRank.text = GameMain.app.mGroups[groupid][i]['rank'];    
                    have = true;
                    break;
                }
            }
            this.mSelf.visible = have;
        }
        this.onFlipGroup(groupid,dir,this.mLevel);
    }

    public onFlip(dir:string,level:number):void
    {
        if     (dir === "previous") this.page -- ;
        else if(dir === "next") this.page ++ ;
        else
            this.page = 1;

        if     (this.page > this.pages) { this.page = this.pages; return;}
        else if(this.page < 1) { this.page = 1; return ;}

        this.mDate.splice(0,this.mDate.length);

        let starIndex:number = (this.page - 1) * 5;
        for(let i:number = starIndex;i<starIndex+5;i++)
        {
            let mInfo:Object = GameMain.app.mData[i];
            if(mInfo == null || mInfo == undefined) break;
            mInfo['map'] = level;
            this.mDate.push(mInfo);
        }
        
        if(this.mDate.length == 0) 
        { 
			this.mlist.array = [];
            this.page--; 
            return ;
        }

        this.initData();
    }
    public onFlipGroup(groupid:string,dir:string,level:number):void
    {
        if     (dir === "previous") this.page -- ;
        else if(dir === "next") this.page ++ ;
        else
            this.page = 1;

        if     (this.page > this.pages) { this.page = this.pages; return;}
        else if(this.page < 1) { this.page = 1; return ;}

        this.mDate.splice(0,this.mDate.length);

        let starIndex:number = (this.page - 1) * 5;
        for(let i:number = starIndex;i<starIndex+5;i++)
        {
            let mInfo:Object = GameMain.app.mGroups[groupid][i];
            if(mInfo == null || mInfo == undefined) break;
            mInfo['map'] = level;
            this.mDate.push(mInfo);
        }
        
        if(this.mDate.length == 0) 
        { 
			this.mlist.array = [];
            this.page--; 
            return ;
        }
        this.initData();
    }
    public initData():void
    {
        this.mlist.repeatY = this.mDate.length;
        this.mlist.array = this.mDate;
    } 

    public updateUser(cell:Laya.Box,index:number)
    {

        console.log('群排行updata')
        var face: Laya.Image = cell.getChildByName("face") as Laya.Image;
        var name: Laya.Label = cell.getChildByName("name") as Laya.Label;
        var rank: Laya.Label = cell.getChildByName("rk").getChildByName("rank") as Laya.Label;
        // var level:Laya.Label = cell.getChildByName("ll").getChildByName("otherLevel") as Laya.Label;   
        var mark: Laya.Label = cell.getChildByName("mk") as Laya.Label;  

        name.changeText(cell.dataSource['name']);
        face.skin = cell.dataSource['avatar'];
        rank.text = cell.dataSource['rank'];
        // level.text = cell.dataSource['level'];
        mark.text = Math.floor(cell.dataSource['mark']) + "米";

        
    } 
}

class GameMain{
    public static app: GameMain = null;

    public mData:Array<Object> = [];
    public mLevel:Array<Number> = [5,15,30,50,80,110,150,200,300,400,600,1000,10000,100001]
    public mLevelName:Array<Object> = ['倒立鸟蛋','学飞菜鸟','呆萌小鸟','尬舞小鸟','搞怪小鸟','勤奋小鸟','眩晕麻雀','蹦迪鸽子','绅士天鹅','求知孔雀','卖萌大鹏','傲娇玄鸟','自信凤凰','传奇智慧鸟']

    
    public mGroups:Object = {};
    public mShareTicket:string = "";
    public mOpenID:string = "";
                                        
    constructor()
    {
        GameMain.app = this;
        Laya.init(750, 1334);
        Laya.ResourceManager.systemResourceManager.autoRelease = false;//开启内存管理
    }
    public init(message:Object):void
    {
        Laya.stage.width = message['width'];
        Laya.stage.height = message['height'];

        wx.getFriendCloudStorage({
            keyList:["avatarUrl","nickName","city","openId","mark1","map11","map12","map13"],
            success:function(res){
                console.log(res);
                GameMain.app.initData(res.data);
            },
            fail:function(res){
                console.log(res);
            }
        });
    }
    public initData(users:Array<Object>):void
    {
        this.mData.splice(0,this.mData.length);
        for(var i=0;i<users.length;i++)
        {
            var obj:Object = {};
            
            obj['name'] = users[i]['nickname'];
            var face:string = users[i]['avatarUrl'];

            if(face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/')
            {
                face = face.substr(0,face.length - 2);
                face = face + "/132";
            }
            obj['avatar'] = face;

            obj['openid'] = users[i]['openid'];
            obj['mark'] = 0;
            obj['map1'] = 0;
            obj['map2'] = 0;
            obj['map3'] = 0;
            for(var j=0;j<users[i]['KVDataList'].length;j++)
            {
                if(users[i]['KVDataList'][j]['key'] == "mark1")
                    obj['mark'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if(users[i]['KVDataList'][j]['key'] == "map11")
                    obj['map1'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if(users[i]['KVDataList'][j]['key'] == "map12")
                    obj['map2'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if(users[i]['KVDataList'][j]['key'] == "map13")
                    obj['map3'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
            }

            let level:number = this.mLevel.length;
            for(let m:number=0;m<this.mLevel.length;m++)
            {
                if(this.mLevel[m] > Math.floor(obj['mark']/100))
                {
                    level = m + 1;
                    break;
                }
            }
            obj['level'] = this.mLevelName[level-1];
            this.mData.push(obj);
        }
        console.log("initData ok");
    }    
    public initGroupData(users:Array<Object>):void
    {
        if(this.mGroups[this.mShareTicket] == null)
            this.mGroups[this.mShareTicket] = [];

        var data:Array<Object> = this.mGroups[this.mShareTicket];    
        data.splice(0,data.length);

        for(var i=0;i<users.length;i++)
        {
            var obj:Object = {};
            
            obj['name'] = users[i]['nickname'];
            var face:string = users[i]['avatarUrl'];

            if(face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/')
            {
                face = face.substr(0,face.length - 2);
                face = face + "/132";
            }
            obj['avatar'] = face;

            obj['openid'] = users[i]['openid'];
            obj['mark'] = 0;
            obj['map1'] = 0;
            obj['map2'] = 0;
            obj['map3'] = 0;
            for(var j=0;j<users[i]['KVDataList'].length;j++)
            {
                if(users[i]['KVDataList'][j]['key'] == "mark1")
                    obj['mark'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if(users[i]['KVDataList'][j]['key'] == "map11")
                    obj['map1'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if(users[i]['KVDataList'][j]['key'] == "map12")
                    obj['map2'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
                if(users[i]['KVDataList'][j]['key'] == "map13")
                    obj['map3'] = Math.floor(Number(users[i]['KVDataList'][j]['value']));
            }

            let level:number = this.mLevel.length;
            for(let m:number=0;m<this.mLevel.length;m++)
            {
                if(this.mLevel[m] >= Math.floor(obj['mark']/100))
                {
                    level = m + 1;
                    break;
                }
            }
            obj['level'] = this.mLevelName[level-1];
            data.push(obj);
        }
        console.log("initGroupData ok");
        this.showGroupRank({show:1,level:0,groupid:this.mShareTicket,dir:"none"});
    }

    public sortData(level:number):void
    {
        if(level == 1)
            this.mData.sort(function(a:Object, b:Object):number { return a['map1'] < b['map1'] ? 1 : -1});
        else if(level == 2)
            this.mData.sort(function(a:Object, b:Object):number { return a['map2'] < b['map2'] ? 1 : -1});
        else if(level == 3)
            this.mData.sort(function(a:Object, b:Object):number { return a['map3'] < b['map3'] ? 1 : -1});
        else
            this.mData.sort(function(a:Object, b:Object):number { return a['mark'] < b['mark'] ? 1 : -1});
        for(var i=0;i<this.mData.length;i++)
        {
            this.mData[i]['rank'] = i + 1;
        }
    }

    public sortGroupData(id:string,level:number)
    {
        if(level == 1)
            this.mGroups[id].sort(function(a:Object, b:Object):number { return a['map1'] < b['map1'] ? 1 : -1});
        else if(level == 2)
            this.mGroups[id].sort(function(a:Object, b:Object):number { return a['map2'] < b['map2'] ? 1 : -1});
        else if(level == 3)
            this.mGroups[id].sort(function(a:Object, b:Object):number { return a['map3'] < b['map3'] ? 1 : -1});
        else
            this.mGroups[id].sort(function(a:Object, b:Object):number { return a['mark'] < b['mark'] ? 1 : -1});
        for(var i=0;i<this.mGroups[id].length;i++)
        {
            this.mGroups[id][i]['rank'] = i + 1;
        }
    }
    
    public sendTencent(message:Object):void
    {
        var user:Object = message['user'];
        var best:number = message['best'];
        var map:number  = message['level'];
        console.log("sendtencent");
        console.log(message);

        var his:number = 0;
        for(var i=0;i<GameMain.app.mData.length;i++)
        {
            if(GameMain.app.mData[i]['openid'] == user['openid'])
            {
                console.log(GameMain.app.mData[i]);
                if(map == 0)
                {
                    his = GameMain.app.mData[i]['mark'];
                    if(Number(message['mark']) > Number(GameMain.app.mData[i]['mark']))
                    {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList:[{key:"mark1",value:message['mark'].toString()}],
                        });
                        GameMain.app.mData[i]['mark'] = Number(message['mark']);
                    }
                }
                else if(map == 1)
                {
                    his = GameMain.app.mData[i]['map1'];
                    if(Number(message['mark']) > Number(GameMain.app.mData[i]['map1']))
                    {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList:[{key:"map11",value:message['mark'].toString()}],
                        });
                        GameMain.app.mData[i]['map1'] = Number(message['mark']);
                    }
                }
                else if(map == 2)
                {
                    his = GameMain.app.mData[i]['map2'];
                    if(Number(message['mark']) > Number(GameMain.app.mData[i]['map2']))
                    {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList:[{key:"map12",value:message['mark'].toString()}],
                        });
                        GameMain.app.mData[i]['map2'] = Number(message['mark']);
                    }
                }
                else if(map == 3)
                {
                    his = GameMain.app.mData[i]['map3'];
                    if(Number(message['mark']) > Number(GameMain.app.mData[i]['map3']))
                    {
                        his = Number(message['mark']);
                        wx.setUserCloudStorage({
                            KVDataList:[{key:"map13",value:message['mark'].toString()}],
                        });
                        GameMain.app.mData[i]['map3'] = Number(message['mark']);
                    }
                }
                // GameMain.app.mData.sort(function(a:Object, b:Object):number { return a['mark'] < b['mark'] ? 1 : -1});
                
                let level:number = this.mLevel.length;
                for(let m:number=0;m<this.mLevel.length;m++)
                {
                    if(this.mLevel[m] > Math.floor(GameMain.app.mData[i]['mark']/100))
                    {
                        level = m + 1;
                        break;
                    }
                }
                GameMain.app.mData[i]['level'] = this.mLevelName[level-1]; 
                break;
            }
        }

        if(his == 0 && best <= Number(message['mark']))
        {
            console.log("best:" + best + "," + Number(message['mark']));
            var obj:Object = {};
            obj['name'] = user['nickName'];
            obj['avatar'] = user['avatarUrl'];
            obj['openid'] = user['openid'];
            obj['mark'] = 0;
            obj['map1'] = 0;
            obj['map2'] = 0;
            obj['map3'] = 0;
            obj['level'] = 0;
            //测试
            //message['mark'] = Math.ceil(message['mark']) + 1;

            if(map == 0)
            {
                wx.setUserCloudStorage({
                    KVDataList:[{key:"mark1",value:message['mark'].toString()}],
                });      
                obj['mark'] = message['mark'];
                let level:number = this.mLevel.length;
                for(let m:number=0;m<this.mLevel.length;m++)
                {
                    if(this.mLevel[m] > Math.floor(obj['mark']/100))
                    {
                        level = m + 1;
                        break;
                    }
                }
                obj['level'] = this.mLevelName[level-1];
            }
            else if(map == 1)
            {
                wx.setUserCloudStorage({
                    KVDataList:[{key:"map11",value:message['mark'].toString()}],
                });      
                obj['map1'] = message['mark'];
            }
            else if(map == 2)
            {
                wx.setUserCloudStorage({
                    KVDataList:[{key:"map12",value:message['mark'].toString()}],
                });      
                obj['map2'] = message['mark'];
            }
            else if(map == 3)
            {
                wx.setUserCloudStorage({
                    KVDataList:[{key:"map13",value:message['mark'].toString()}],
                });      
                obj['map3'] = message['mark'];
            }
            GameMain.app.mData.push(obj);
            console.log(obj);
            console.log(GameMain.app.mData);
        }
    }
    public showRank(message:Object):void
    {
        let rank:newRank = Laya.stage.getChildByName("rank") as newRank;
        if(message['show'] == 1)
        {
            if(rank == null)
            {
                rank = new newRank();
                rank.centerX = 0;
                rank.y = (Laya.stage.height - 1334)/2;
                rank.name = "rank";
                Laya.stage.addChild(rank);
            }
            rank.show();
            rank.init(message);  
        }
        else
        {
            if(rank != null)
                rank.visible = false;
        }
    }
    public showGroupRank(message:Object):void
    {
        let rank:newRank = Laya.stage.getChildByName("rank") as newRank;
        if(message['show'] == 1)
        {
            if(rank == null)
            {
                rank = new newRank();
                rank.centerX = 0;
                rank.y = (Laya.stage.height - 1334)/2;
                rank.name = "rank";
                Laya.stage.addChild(rank);
            }
            rank.show();
            rank.initGroup(message);  
        }
        else
        {
            if(rank != null)
                rank.visible = false;
        }
    }

    public showGroup(message:Object):void
    {
        this.mOpenID = message['openid'];

        if(message['show'] == 1)
        {
            var groupid:string = message['groupid'];
            if(this.mGroups[groupid] != null)
            {
                this.showGroupRank(message);
            }
            else
            {
                this.mShareTicket = message['groupid'];
                wx.getGroupCloudStorage({
                    shareTicket:message['groupid'],
                    keyList:["avatarUrl","nickName","openId","mark1","map11","map12","map13"],
                    success:function(res){
                        console.log(res);
                        GameMain.app.initGroupData(res.data);
                    },
                    fail:function(res){
                        console.log(res);
                    }
                });                
            }
        }
        else
            this.showGroupRank(message);
    }

    public showNextPlayer(message:Object):void
    {
        let next:nextPlayer = Laya.stage.getChildByName("next") as nextPlayer;
        if(message['show'] == 1)
        {
            if(next == null)
            {
                next = new nextPlayer();
                next.centerX = 0;
                next.y = 1120 + (Laya.stage.height - 1334)/2;
                next.name = "next";
                Laya.stage.addChild(next);
            }
            next.visible = true;
            var level:number = message['level'];
            var openid:string= message['openid'];
            this.sortData(level);

            var row:number = this.mData.length - 1;
            for(var i=0;i<this.mData.length;i++)
            {
                if(this.mData[i]['openid'] == message['openid'])
                    continue;

                if(level == 0 && this.mData[i]['mark'] <= Number(message['mark']))
                {
                    row = i - 1;
                    break;
                }
                if(level == 1 && this.mData[i]['map1'] <= Number(message['mark']))
                {
                    row = i - 1;
                    break;
                }
                if(level == 2 && this.mData[i]['map2'] <= Number(message['mark']))
                {
                    row = i - 1;
                    break;
                }
                if(level == 3 && this.mData[i]['map3'] <= Number(message['mark']))
                {
                    row = i - 1;
                    break;
                }                
            }
            if(row < 0)
                next.visible = false;
            else
            {
                if(this.mData[row]['openid'] == message['openid'])
                {
                    row = row - 1;
                    if(row < 0)
                        next.visible = false;
                }
                if(Number(message['level']) == 0)
                    next.mark.text = Math.floor(this.mData[row]['mark']/100) + "米";
                if(Number(message['level']) == 1)
                    next.mark.text = Math.floor(this.mData[row]['map1']) + "%";
                if(Number(message['level']) == 2)
                    next.mark.text = Math.floor(this.mData[row]['map2']) + "%";
                if(Number(message['level']) == 3)
                    next.mark.text = Math.floor(this.mData[row]['map3']) + "%";
                next.face.skin = this.mData[row]['avatar'];
            }    
        }
        else
        {
            if(next != null)
                next.visible = false;
        }        
    }

}

Laya.MiniAdpter.init(true,true);
new GameMain();

wx.onMessage(function(message)
{
    console.log(message);
    if(message.type && message.type == "init")
    {
        GameMain.app.init(message);
    }
    if (message.type && message.type == "rank")
    {
        GameMain.app.showRank(message);
    }
    if(message.type && message.type == "send")
    {
        GameMain.app.sendTencent(message);
    }
    if(message.type && message.type == "next")
    {
        GameMain.app.showNextPlayer(message);
    }
    if(message.type && message.type == "group")
    {
        GameMain.app.showGroup(message);
    }
    if (message['isLoad'] == "filedata") 
    {
        laya.wx.mini.MiniFileMgr.ziyuFileData[message.url] = message.data;
    }    
});

