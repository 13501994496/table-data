//0/2svg总控制
function createsvg(datalist,maxdata,barcolor){
    var bar=document.getElementById("bar");
    var axis=createAxis(maxdata);
    var bar1=createBar(maxdata,datalist,barcolor);
    //console.log(maxdata);
    bar.innerHTML=axis+bar1;
    //console.log('bar');
}
//1/2建立坐标轴
function createAxis(maxdata){
    var html="";
    //x轴
    html+="<line x1='25' y1='205' x2='600' y2='205' stroke='black' stroke-width='2'/>";
    //y轴
    html+="<line x1='25' y1='0' x2='25' y2='205' stroke='black' storke-width='2'/>";
    //x轴的数字
    for(var i=0;i<12;i++){
        html+="<text x='"+(40*i+40)+"' y='220'>"+(i+1)+"月</text>";
    }
    //y轴的数字
    html+="<text x='5' y='20' font-size='12'>"+maxdata+"</text>";
    return html;
}
//2/2建立bar
function createBar(maxdata,datalist,barcolor){
    //2-0total
    var html="";
    var ratio=200/maxdata;
    for(var i=0;i<12;i++){
        for(var j=0;j<datalist.length;j++){
            html+="<rect x='"+(40*i+35+36/datalist.length*j)+"' y='"+(205-(datalist[j].sale[i])*ratio)
            +"' width='"+36/datalist.length+"' height='"+(datalist[j].sale[i])*ratio+"' fill='"
            +barcolor[j]+"'/>";
        }       
    }
    return html;
}
//2-*获取数据
function getmaxdata(datalist){
    var sale=[];
    for(var i=0;i<datalist.length;i++){
        sale.push(datalist[i].sale);    
    }
    var salestring=sale.join(',').split(",");
    var maxdata=Math.max.apply(null,salestring);
    return maxdata;
    
}