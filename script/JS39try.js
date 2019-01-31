window.onload=function(){
    var rawdata;//定义dataList内的数据；
    //0.获取input位置
    var check=document.getElementsByClassName("select");     
    var region_arr=check[0].querySelectorAll("input");
    var goods_arr=check[1].querySelectorAll("input");
    var barcolor=['yellow','orange','red',
    'green','blue','purple',
    'rgb(50,250,50)','darkgray','black',]
    var table_html=document.getElementById("table");
    var hash=window.location.hash;

    //-1.读取hash渲染页面
    if(window.location){
        
    }
    
    //0-1获取bar
    check[0].addEventListener("click",event);
    check[1].addEventListener("click",event);
    check[0].addEventListener("click",checkevent);
    check[1].addEventListener("click",checkevent);
    function event(){
        var datalist=checkbox();
        window.localStorage.setItem('data',JSON.stringify(datalist));
        var localDataList=JSON.parse(localStorage.getItem("data"));
        var maxdata=getmaxdata(localDataList);
        createsvg(localDataList,maxdata,barcolor);
        createline(localDataList,maxdata,barcolor);
        tableevent();
        
    }
    function checkbox(){
        var filter={};
        var filter1=filter_checked(filter);
        //*优先从localDatalist拿数据
        if(window.localStorage && localStorage.getItem('data')!=null){
            var localDataList=JSON.parse(localStorage.getItem("data"));
            if(localDataList.length>0){
                for(let i in localDataList){
                    for(let j in sourceData){
                        if(localDataList[i].region==sourceData[j].region && 
                            localDataList[i].product==sourceData[j].product){
                                sourceData[j].sale=localDataList[i].sale;
                            }
                    }    
                }
            }
            else{
                sourceData=sourceData;
            }
            //console.log('12345');
        }     
        var data_filter1=get_checked_data(filter1,sourceData);
        return data_filter1;
    }
    function tableevent(){
        var data_filter1=checkbox();
        table_push(data_filter1);
    }
    //2-1.点击checkbox的值汇集到数组内
    function filter_checked(filter){
        var temp_region_arr=[];
        var temp_goods_arr=[];       
        for(var i=1;i<region_arr.length;i++){
            if(region_arr[i].checked==true){
                temp_region_arr.push(region_arr[i]);
            }
        }
        for(var j=1;j<goods_arr.length;j++){
            if(goods_arr[j].checked==true){
                temp_goods_arr.push(goods_arr[j]);
            }
        }
        filter.region=temp_region_arr;
        filter.goods=temp_goods_arr;
        //console.log(filter);
        return filter;
        //save checked状态
        
    }
    //2-2.checkbox数组到sourceData内获取数据    
    function get_checked_data(filter,sourceData){
        var data_filter=[];
        var temp_data_filter=[];        
        if(filter.region.length>0 && filter.goods.length>0){
            for(var i=0;i<filter.region.length;i++){
                for(var j=0;j<sourceData.length;j++){
                    if(filter.region[i].value==sourceData[j].region){
                        temp_data_filter.push(sourceData[j]);
                        //console.log(temp_data_filter);
                    }
                }
            }
            for(var i=0;i<filter.goods.length;i++){
                for(var j=0;j<temp_data_filter.length;j++){
                    if(filter.goods[i].value==temp_data_filter[j].product){
                        data_filter.push(temp_data_filter[j]);
                        //console.log(data_filter);
                    }
                }
            }
        }
        return data_filter;   
    }
    //2-3.过滤后的sourceData数据添加事件
    
    //2-3(*1)table的mouseover事件(1)bar && line数据变化(2)数据mouseover时出现编辑
    table_html.addEventListener('mouseover',a);
    function a(ev){
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.nodeName.toLowerCase() == "td" && target.parentNode.nodeName.toLowerCase()=="tr"){
            var tr=target.parentNode;
            var td=tr.getElementsByTagName('td');
            var span=tr.getElementsByTagName('span');
            var sale=[];
            //bar && line图形变化
            for(var i=0;i<span.length;i++){
                sale.push(span[i].innerHTML);
            }
            var newdata1=new Array();
                newdata1.product=td[0].innerHTML;
                newdata1.region=td[1].innerHTML;
                newdata1.sale=sale;
            var newdata=[newdata1];           
            var maxdata=getmaxdata(newdata);
            //console.log(newdata);
            createsvg(newdata,maxdata,barcolor);
            createline(newdata,maxdata,barcolor);
        }
        //(2)span mouseover时出现“编辑”
        //??????????????????????????????????????????????????????????????
        if(target.nodeName.toLowerCase()=='span'){
            var edit_all=table_html.getElementsByClassName('edit');
            for(let i in edit_all){
                if(edit_all[i].parentNode){
                    edit_all[i].parentNode.childNodes[4].classList.remove("active");
                }
            }
            target.parentNode.childNodes[4].classList.add("active");
            
        }
    };
    //2-3(*2)table的mouseleave事件  
    table_html.addEventListener('mouseleave',event);
    //2-3(*3)<i>编辑</i> click事件
    table_html.addEventListener('click',edit_click,true);
    function edit_click(ev){
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        var td=target.parentNode;
        if(target.className.toLowerCase().includes("edit") || target.nodeName.toLowerCase()=="span"){
            td.childNodes[0].classList.remove("active");

            td.childNodes[2].classList.add("active");
            td.childNodes[2].focus();
            td.childNodes[4].classList.remove("active");
            td.childNodes[6].classList.add("active");
            td.childNodes[7].classList.add("active");
            //console.log(td.childNodes[2]);
        }
        else if(target.innerHTML=="保存"){
            td.childNodes[0].classList.add("active");
            td.childNodes[2].classList.remove("active");
            td.childNodes[4].classList.remove("active");
            td.childNodes[6].classList.remove("active");
            td.childNodes[7].classList.remove("active");
            //set td && tr.value,when "save",change the datalist to changed one;
            var datalist=checkbox();
            var trIndex = td.dataset.tr;
            var tdIndex = td.dataset.td;
            datalist[trIndex].sale[tdIndex]=rawdata;
            //console.log(datalist);
            var maxdata=getmaxdata(datalist);
            createsvg(datalist,maxdata,barcolor);
            createline(datalist,maxdata,barcolor);
            //save the localStorage
            var storage=window.localStorage;
            storage.clear();
            storage.setItem('data',JSON.stringify(datalist));
            //console.log(storage);
        }
        else if(target.innerHTML=="取消"){
            td.childNodes[0].classList.add("active");
            td.childNodes[2].classList.remove("active");
            td.childNodes[4].classList.remove("active");
            td.childNodes[6].classList.remove("active");
            td.childNodes[7].classList.remove("active");
        }

    }
    //2-3(*4)input blur事件
    table_html.addEventListener('focus',function(ev){
        ev=ev || window.event;
        var target=ev.target || srcElement;
        if(target.nodeName.toLowerCase()=="input"){
            rawdata=target.value;
            //console.log(rawdata);
        }
    },true);
    table_html.addEventListener('blur',function(ev){
        ev=ev || window.event;
        var target=ev.target || srcElement;
        if(target.nodeName.toLowerCase()=="input"){
            if(!Number(target.value)||target.value<=0){
                alert('请输入正数数字');
                target.value=rawdata;
            }
            else{
                rawdata=target.value;
                //console.log(rawdata);
            }
            
        }
    },true);
    //2-3(*5)keydown事件
    table_html.addEventListener('keydown',function(ev){
        ev=ev || window.event;
        var target=ev.target || srcElement;
        var td=target.parentNode;
        if(target.nodeName.toLowerCase()=="input"){
            if(ev.keyCode==13){
                td.childNodes[0].classList.add("active");
            td.childNodes[2].classList.remove("active");
            td.childNodes[4].classList.remove("active");
            td.childNodes[6].classList.remove("active");
            td.childNodes[7].classList.remove("active");
            //set td && tr.value,when "save",change the datalist to changed one;
            var datalist=checkbox();
            var trIndex = td.dataset.tr;
            var tdIndex = td.dataset.td;
            rawdata=target.value;
            datalist[trIndex].sale[tdIndex]=rawdata;
            //console.log(datalist);
            var maxdata=getmaxdata(datalist);
            createsvg(datalist,maxdata,barcolor);
            createline(datalist,maxdata,barcolor);
            //save the localStorage
            var storage=window.localStorage;
            storage.clear();
            storage.setItem('data',JSON.stringify(datalist));
            //console.log(rawdata);
            }
            else if(ev.keyCode==27){
                td.childNodes[0].classList.add("active");
            td.childNodes[2].classList.remove("active");
            td.childNodes[4].classList.remove("active");
            td.childNodes[6].classList.remove("active");
            td.childNodes[7].classList.remove("active");
            }
        }
    });

    //console.log(sourceData.length);
    //2-4.sourceData添加事件
    function table_push(data_filter){
        var th_thml=`<tr>
        <th>商品</th><th>地区</th><th>1月</th><th>2月</th><th>3月</th><th>4月</th><th>5月</th>
        <th>6月</th><th>7月</th><th>8月</th><th>9月</th><th>10月</th><th>11月</th><th>12月</th>
        </tr>`;
        var td_thml="";
        var add_html="";
        //计算region的个数
        var region_num=0;
        for(var i=1;i<region_arr.length;i++){
            if(region_arr[i].checked==true){
                region_num++;
            }
        }
        var product_num=0;
        for(var i=1;i<goods_arr.length;i++){
            if(goods_arr[i].checked==true){
                product_num++;
            }
        }
        //console.log(region_num);
        //console.log(product_num);
        //2-3(1)goods.length>=1 && region.length==1
        if(region_num==1 && product_num>=1){
            for(var i=0;i<data_filter.length;i++){
                add_html+=`<tr><td>${data_filter[i].product}</td><td>${data_filter[i].region}</td>`;
                for(var j=0;j<data_filter[i].sale.length;j++){
                    add_html+=`<td data-tr=${i} data-td=${j}><span class="active">${data_filter[i].sale[j]}</span>
                    <input type="text" value=${data_filter[i].sale[j]} class='input2'>
                    <i class="edit">编辑</i><br/><i>保存</i><i>取消</i></td>`;
                }   
                add_html+=`</tr>`;
                //console.log(add_html);
            }
            table_html.innerHTML=`<table>${th_thml}${add_html}</table>`; 
        }
        else if(region_num>1 && product_num==1){
            td_thml=`<tr><td rowspan=${region_num}>${data_filter[0].product}</td>
                    <td>${data_filter[0].region}</td>`
                for(var j in data_filter[0].sale){
                    td_thml+=`<td data-tr=${i} data-td=${j}><span class="active">${data_filter[0].sale[j]}</span>
                    <input type="text" value=${data_filter[0].sale[j]} class='input2'>
                    <i class="edit">编辑</i><br/><i>保存</i><i>取消</i></td>`;
                }    
                td_thml+=`</tr>`; 
            for(var i=1;i<data_filter.length;i++){
                add_html+=`<tr><td>${data_filter[i].region}</td>`;
                for(var j in data_filter[i].sale){
                    add_html+=`<td data-tr=${i} data-td=${j}><span class="active">${data_filter[i].sale[j]}</span>
                    <input type="text" value=${data_filter[i].sale[j]} class='input2'>
                    <i class="edit">编辑</i><br/><i>保存</i><i>取消</i></td>`;
                }
                add_html+=`</tr>`; 
            }
            table_html.innerHTML=`<table>${th_thml}${td_thml}${add_html}</table>`; 
        } 
        else if(region_num>1 && product_num>1){
            for(var i=0;i<data_filter.length;i++){
                    if(!add_html.includes(data_filter[i].product)){
                        add_html+=`<tr><td rowspan=${region_num}>${data_filter[i].product}</td>
                                <td>${data_filter[i].region}</td>`;
                        for(let j in data_filter[i].sale){
                            add_html+=`<td data-tr=${i} data-td=${j}><span class="active">${data_filter[i].sale[j]}</span>
                            <input type="text" value=${data_filter[i].sale[j]} class='input2'>
                            <i class="edit">编辑</i>
                            <br/><i>保存</i><i>取消</i></td>`;
                        }
                        add_html+=`</tr>`;
                    }
                    else{
                        add_html+=`<tr><td>${data_filter[i].region}</td>`;
                        for(let j in data_filter[i].sale){
                            add_html+=`<td data-tr=${i} data-td=${j}><span class="active">${data_filter[i].sale[j]}</span>
                            <input type="text" value=${data_filter[i].sale[j]} class='input2'>
                            <i class="edit">编辑</i>
                            <br/><i>保存</i><i>取消</i></td>`;
                        }
                        add_html+=`</tr>`;
                        //console.log(add_html);
                    }
                
            }
            table_html.innerHTML=`<table>${th_thml}${add_html}</table>`; 
        } 
        else{
            table_html.innerHTML="";
        }
    }
}
