/*3. Dezvoltați o pagină web cu facilități JavaScript care definește o grilă dreptunghiulară (componente div
alăturate, dispuse matricial; dimensiunea grilei este prestabilită). Elementul din stânga sus este colorat diferit.
Definiți 4 taste la apăsarea cărora elementul colorat “se mută” pe celula imediat următoare din stânga,
dreapta, sus sau jos (doar dacă mișcarea este posibilă).
*/

let contorPatratica = 0;
let contorMaxim = 0;
//let n = 3; //initializare ca sa nu fie erori
function DivCreation() {
    n = prompt("Cate elemente doriti sa fie? [n linii, n coloane]", "3");
    let text = document.createElement("h2");
    text.setAttribute("id","InfoTextEx3"); text.style.fontFamily = "Akaya Kanadaka";
    text.textContent = "Pentru a deplasa patratica colorata, puteti folosi WASD sau sagetile.";
    text.style.color = "darkred";
    document.getElementById("content").appendChild(text);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let cDivEx3 = document.createElement("div");
            cDivEx3.setAttribute("class", "divEx3");
            cDivEx3.style.width = (((n / n) * 100) / n)-1 + "%";
            cDivEx3.style.margin = "0.35%";
            cDivEx3.style.height = (((n / n) * 100) / n)-1 + "%";
            cDivEx3.style.display = "inline-block";
            cDivEx3.style.borderStyle = "solid";
            cDivEx3.style.borderWidth = "2px";
            document.getElementById("content").appendChild(cDivEx3);
            contorMaxim += 1;
        }
    }
    colorareDivRandom = document.getElementsByClassName("divEx3");
    contorPatratica =Math.floor(Math.random() * (n*n))
    colorareDivRandom[contorPatratica].style.background = "darkred";
}

function Miscare(e){
    var this_key = (e) ? e.which : window.event.keyCode;
    var patratica = document.getElementsByClassName("divEx3");
    console.log(`contor Patratica: ${contorPatratica}`);
    if((this_key==37)||(this_key==65)) {  //stanga
        if (((contorPatratica + 1) % n == 0) || !(contorPatratica % n) == 0){
            patratica[contorPatratica].style.background = "";
            patratica[contorPatratica - 1].style.background = "darkred";
            contorPatratica -= 1;
        } else {
            console.log("Ati ajuns la marginea din stanga! [" + contorPatratica + "]");
        }
    }
    if((this_key==38)||(this_key==87)){ //sus
        //if((contorPatratica>n*n)){
        if(contorPatratica+(contorPatratica+1)>(n*2)-1){
            patratica[contorPatratica].style.background = "";
            patratica[contorPatratica - n].style.background = "darkred";
            contorPatratica -= n;
        } else {
            console.log("Ati ajuns la capatul de sus! [" + contorPatratica + "]");
        }
    }
    if((this_key==39)||(this_key==68)) { //dreapta
        if (!((contorPatratica + 1) % n == 0) || (contorPatratica % n) == 0){
            patratica[contorPatratica].style.background = "";
            patratica[contorPatratica + 1].style.background = "darkred";
            contorPatratica += 1;
        } else {
            console.log("Ati ajuns la marginea din dreapta! [" + contorPatratica + "]");
        }
    }
    if((this_key==40)||(this_key==83)) { //jos
        if(contorPatratica<parseInt(contorMaxim - n)){
            patratica[contorPatratica].style.background = "";
            patratica[contorPatratica + parseInt(n)].style.background = "darkred";
            contorPatratica += parseInt(n);
        } else {
            console.log("Ati ajuns la capatul de jos! [" + contorPatratica + "]");
        }
    }
}

function Ex3() {
    StergereElemente(3);
    contorPatratica = 0;
    contorMaxim = 0;
    DivCreation();
    document.onkeydown = Miscare;
}
