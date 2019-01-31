//0/3line总控制
function createline(datalist,maxdata,barcolor){
    var line=document.getElementById("line");
    line.height=line.height;
    var ctx=line.getContext('2d');
    createLineAxis(ctx,maxdata);
    createLine(ctx,datalist,barcolor,maxdata);
    createCircle(ctx,datalist,barcolor,maxdata);   
    //console.log(datalist);
}
//1/3建立坐标轴
function createLineAxis(ctx,maxdata){
    //x轴
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(25,205);
    ctx.lineTo(600,205);
    ctx.stroke();
    //y轴
    ctx.beginPath();
    ctx.moveTo(25,205);
    ctx.lineTo(25,0);
    ctx.stroke();
    //x轴的数字
    ctx.font='12px sans-serif';
    for(var i=0;i<12;i++){
    ctx.fillText((i+1)+"月",(40*i+48),215);
    }
    //y轴的数字
    ctx.fillText(maxdata,0,20);
}
//2/3建立circle
function createCircle(ctx,datalist,barcolor,maxdata){
    var ratio=200/maxdata;
    for(var i=0;i<12;i++){
        for(var j=0;j<datalist.length;j++){
            ctx.beginPath();
            ctx.fillStyle=barcolor[j];
            ctx.arc((40*i+53),(202-(datalist[j].sale[i])*ratio),4,0,2*Math.PI);
            ctx.fill();
        }
    }    
}
//3/3建立line
function createLine(ctx,datalist,barcolor,maxdata){
    var ratio=200/maxdata;
        for(var j=0;j<datalist.length;j++){
            ctx.beginPath();
            ctx.fillStyle=barcolor[j];
            ctx.moveTo((40*0+53),(202-(datalist[j].sale[0])*ratio));
            ctx.lineTo((40*1+53),(202-(datalist[j].sale[1])*ratio));
            ctx.lineTo((40*2+53),(202-(datalist[j].sale[2])*ratio));
            ctx.lineTo((40*3+53),(202-(datalist[j].sale[3])*ratio));
            ctx.lineTo((40*4+53),(202-(datalist[j].sale[4])*ratio));
            ctx.lineTo((40*5+53),(202-(datalist[j].sale[5])*ratio));
            ctx.lineTo((40*6+53),(202-(datalist[j].sale[6])*ratio));
            ctx.lineTo((40*7+53),(202-(datalist[j].sale[7])*ratio));
            ctx.lineTo((40*8+53),(202-(datalist[j].sale[8])*ratio));
            ctx.lineTo((40*9+53),(202-(datalist[j].sale[9])*ratio));
            ctx.lineTo((40*10+53),(202-(datalist[j].sale[10])*ratio));
            ctx.lineTo((40*11+53),(202-(datalist[j].sale[11])*ratio));
            ctx.stroke();
        }
     
}
