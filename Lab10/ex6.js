/*Dezvoltați o pagină web cu facilități JavaScript care afișează ora curentă (hh:mm:ss), actualizată o dată pe
secundă (obiect de tip Date, apel repetat de cod prin setInterval() sau setTimeout()).*/

var creatH2 = false;
var afisOra;

function CreareElementAfisare(){
    if(creatH2 === false) {
        let h1 = document.createElement("h1");
        h1.setAttribute("id", "afisareOra");
        h1.style.textAlign = "center";
        h1.style.width = "100%";
        h1.style.height = "auto";
        h1.style.fontSize = "12vmin";
        h1.style.fontFamily = "Segment7Standard";
        h1.style.background = "darkred";
        h1.style.color = "white";
        document.getElementById("content").appendChild(h1);
        creatH2 = true;
    }
}

function AfisareOra(){
    if(creatH2 === true) {
        var display = document.getElementById("afisareOra");
        var time = new Date();
        display.textContent = ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);
    } else {
        clearInterval(afisOra);
        afisOra = 0;
    }
}


function Ex6(){
    creatH2 = false;
    StergereElemente(6);
    CreareElementAfisare();
    afisOra = setInterval(function () {
        AfisareOra();
    }, 1000);
}

