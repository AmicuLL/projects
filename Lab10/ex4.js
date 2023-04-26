/*Dezvoltați o pagină web cu facilități JavaScript care definește o grilă dreptunghiulară (componente div
alăturate, dispuse matricial; dimensiunea grilei este prestabilită).
La trecerea cu mouse-ul peste componente, acestea își schimbă culoarea. Monitorizați și afișați timpul scurs
până la colorarea tuturor celulelor.*/
var contorColorat = 0;
var contorStart = false;
let cronometru;
let minute = `00`, secunde = `00`;
function DivCreationEx4() {
    let redirectionat = false;
    n = prompt("Cate elemente doriti sa fie? [n linii, n coloane]", "3");
    let spatiu = document.createElement("div");
    spatiu.style.height = "30px";
    spatiu.style.width = "100%";
    document.getElementById("content").appendChild(spatiu);
    text = document.createElement("h2"); text.setAttribute("id", "textArea");
    text.style.fontFamily = "Akaya Kanadaka";
    text.textContent = "Colorati toate elementele prin miscarea mouse-ului peste ele. Sunteti cronometrat :)";
    text.style.color = "darkred";
    document.getElementById("content").appendChild(text);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if((document.getElementById("cronometru") == "")||(document.getElementById("cronometru") == null)||(document.getElementById("cronometru") == undefined)) {
                cronometru = document.createElement("h2");
                cronometru.setAttribute("id", "cronometru");
                cronometru.style.fontFamily = "Segment7Standard";
                cronometru.textContent = "00:00";
                document.getElementById("content").appendChild(cronometru);
            }
            let cDivEx4 = document.createElement("div");
            cDivEx4.setAttribute("class", "divEx4");
            cDivEx4.style.width = (((n / n) * 100) / n)-1 + "%";
            cDivEx4.style.margin = "0.35%";
            cDivEx4.style.height = (((n / n) * 100) / n)-1 + "%";
            cDivEx4.style.display = "inline-block";
            cDivEx4.style.borderStyle = "solid";
            cDivEx4.style.borderWidth = "2px";
            cDivEx4.onmouseover = function () {
                cDivEx4.style.background = "darkred";
                if(contorStart !== true){
                    apelareCronometru = setInterval(Cronometru, 1000);
                }
                contorStart = true;
                document.querySelectorAll('.divEx4').forEach(e => {
                    if(((window.getComputedStyle( e ,null).getPropertyValue('background-color')) == "rgb(139, 0, 0)")&&(e.getAttribute("name") != "counted")) {
                        e.setAttribute("name", "counted");
                        contorColorat += 1;
                    }
                    if (contorColorat == (n*n)) {
                        clearInterval(apelareCronometru);
                        cronometru.style.fontFamily = "Akaya Kanadaka";
                        if(minute == `00`){
                            cronometru.innerHTML =  `Felicitari! Ati colorat toate cele <span style="font-family: Segment7Standard;">${(n*n)}</span> elemente in : <span style="font-family: Segment7Standard;">${parseInt(secunde)}</span> secunde!`;
                        } else {
                            cronometru.innerHTML =  `Felicitari! Ati colorat toate cele ${(n*n)} elemente in : <span style="font-family: Segment7Standard;">${minute}:${secunde}</span>!`;
                        }
                        if((minute == `00`)&&(parseInt(secunde) < 3)&&(redirectionat === false)) {
                            redirectionat = true;
                            window.open('https://www.youtube.com/embed/o6Y7aCT9kis?&autoplay=1', '_blank');
                        }
                    }
                });
            };
            document.getElementById("content").appendChild(cDivEx4);
        }
    }
}
let apelareCronometru;
function Cronometru() {
    secunde ++
    if (secunde < 10) {
        secunde = `0` + secunde
    }
    if (secunde > 59) {
        secunde = `00`
        minute ++
        if (minute < 10) {
            minute = `0` + minute
        }
    }
    cronometru.textContent = minute + ':' + secunde;

}

function Ex4(){
    minute = `00`; secunde = `00`;
    contorStart = false;
    contorColorat = 0;
    StergereElemente(4);
    DivCreationEx4();
}