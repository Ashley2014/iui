//require("./style.scss");


//console.log(url)




import iui from "./iui.js";



//window.iui=iui;

if(window.hb){
    window.hb.lib.iui=iui;
}else{
    window.hb={};
    window.hb.lib={};
    window.hb.lib.iui=iui;
}

//console.log(iui);






