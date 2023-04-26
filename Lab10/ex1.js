/*1. Dezvoltați o pagină web cu facilități JavaScript care pozitionează la mijlocul ecranului
o componentă "div" cu latura de 100 de pixeli, umplută cu roșu. Cand mouse-ul se află deasupra componentei,
aceasta este colorată cu albastru.
1'. Schimbați culoarea componentei progresiv (setTimeout, setInterval).
1". Culoarea componentei este închisă/deschisă pe masură ce cursorul mouse-ului
se apropie de țintă.*/
var IE = document.all?true:false;

if (!IE)
    document.captureEvents(Event.MOUSEMOVE);

function ex1(){ //buton html pt ex1
    functieEx1 = true;
    functieEx1Prim = false;
    functieEx1Secund = false;
    document.onmousemove = getMouseXY;
}

function ex1pr(){ //buton html pt ex 1 prim
    functieEx1Prim = true;
    functieEx1Secund = false;
    functieEx1 = false;
    document.onmousemove = getMouseXY;
}

function ex1secund() { //buton html pt ex 1 secund
    functieEx1Secund = true;
    functieEx1Prim = false;
    functieEx1 = false;
    document.onmousemove = getMouseXY;
}
var tempX;
var tempY;

function getMouseXY(e) {

    if (IE) {
        tempX = event.clientX + document.body.scrollLeft;
        tempY = event.clientY + document.body.scrollTop;
    }
    else {
        tempX = e.pageX;
        tempY = e.pageY;
    }
    if (functieEx1 === true) {
        exercitiu1(tempX,tempY);
    } else if (functieEx1Prim === true) {
        ex1prim();
    } else if (functieEx1Secund === true) {
        ex1sec(tempX, tempY);
    }
}
function CreateDiv(){
    StergereElemente(1);
    clearInterval(rosu); clearInterval(albastru);
    if((document.getElementById("divex1")=='')||(document.getElementById("divex1")==null)||(document.getElementById("divex1")==undefined)) {
        let cDivEx1 = document.createElement("div"); //se creaza un div de 100px (dimensiunile sunt in css)
        cDivEx1.setAttribute("id", "divex1");
        cDivEx1.setAttribute("class", "centerDiv"); //de aici se preiau dimensiunile
        document.getElementById("content").appendChild(cDivEx1); //se introduce in div-ul content
    }
}

function exercitiu1(x,y) {
    CreateDiv();
    var div = document.getElementById("divex1");
    var offsets = div.getBoundingClientRect();
    var top = offsets.top;
    var left = offsets.left;
    let dx = left+50,
        dy = top+50;
    if((x > dx-50)&&(x < dx+50)&&(y > dy-50)&&(y < dy+50)){  //pozitia mouse-ului de la pozitia 1920/2 + 50 pixeli (total 100 are div-ul)
        div.style.background = "blue";
    } else {
        div.style.background = "red";
    }
}
var a_value = 255; let rosu;
var b_value = 0; let albastru;
function ex1prim() {
    CreateDiv();
    var div = document.getElementById("divex1");


    //din rosu in albastru (on)
    div.addEventListener("mouseover", function() {
        if((a_value == 0)&&(b_value==255)){
            a_value = 255;
            b_value = 0;
        }
        clearInterval(rosu);
        albastru = setInterval(function() {
            if (a_value < 1)
            {
                clearInterval(albastru);
                clearInterval(rosu);
                albastru = 0; rosu = 0;
                return;
            }
            div.style.background = "rgba(" + (a_value -= 1) + ",0," + (b_value += 1) + ")";
        }, 100);
    });
    //din albastru in rosu (out)
    div.addEventListener("mouseout", function() {
        if((a_value == 255)&&(b_value==0)){
            a_value = 255;
            b_value = 0;
        }
        clearInterval(albastru);
        rosu = setInterval(function() {
            if (a_value > 254)
            {
                clearInterval(rosu);
                clearInterval(albastru);
                rosu = 0; albastru = 0;
                return;
            }
            div.style.background = "rgb(" + (a_value += 1) + ",0," + (b_value -= 1) + ")";
        }, 100);
    });
}

function ex1sec(x, y) {
    CreateDiv();
    var div = document.getElementById("divex1");
    var offsets = div.getBoundingClientRect();
    var top = offsets.top;
    var left = offsets.left;
    let dx = left+50 - x,
        dy = top+50 - y,
        dist = Math.sqrt(dx * dx + dy * dy);
    let Red = 0;
    let Blue = 255;
    Red += dist/4;
    Blue -= dist/4;
    div.style.background = "rgb(" + Red + ", 0, " + Blue + ")";
}