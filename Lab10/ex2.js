/*2. Dezvoltați o pagină web cu facilități JavaScript care desenează, una langa alta,
o serie (10) de componente div colorate cu culori prestabilite. Într-o zonă de pe ecran
se afișează codul culorii deasupra căreia se află mouse-ul. Textul este afișat cu culoarea componentei.*/

function DivMaker() {
    for (let i = 0; i < 10; i++) {
        let nameTag = document.createElement("h2");
        nameTag.setAttribute("class", "divEx2H2");
        nameTag.style.width = "9%";
        nameTag.style.margin = "0.5%";
        nameTag.style.display = "inline-block";
        document.getElementById("content").appendChild(nameTag);
    }
    for (let i = 0; i < 10; i++) {
        let cDiv = document.createElement("div");
        cDiv.setAttribute("class", "divEx2");
        var h2Tags = document.getElementsByClassName("divEx2H2");
        cDiv.onmouseover = function () {
            h2Tags[i].style.visibility = "visible";
        };
        cDiv.onmouseout = function () {
            h2Tags[i].style.visibility = "hidden";
        };
        cDiv.style.width = "9%";
        cDiv.style.margin = "0.35%";
        cDiv.style.height = "20%";
        cDiv.style.display = "inline-block";
        cDiv.style.borderStyle = "solid";
        cDiv.style.borderWidth = "2px";
        document.getElementById("content").appendChild(cDiv);
    }
}
function colorare(){
    let cDiv = document.getElementsByClassName("divEx2");
    for(let i = 0; i< cDiv.length; i++) {
        cDiv[i].style.background = "#" + Math.floor(Math.random() * 16777215).toString(16);
    }
    var h2Tags = document.getElementsByClassName("divEx2H2");
    for(let i = 0; i<10; i++) {
        var createdDiv = document.getElementsByClassName("divEx2");
        let culoare = window.getComputedStyle( createdDiv[i] ,null).getPropertyValue('background-color');
        var PassHexa = Array.from(culoare.split(/[,\s\\/~()]/),Number); //extragere coduri culoare
        let toHexa = PassHexa[1].toString(16).toUpperCase() + PassHexa[3].toString(16).toUpperCase() + PassHexa[5].toString(16).toUpperCase();
        h2Tags[i].innerHTML = "#" + toHexa;
        h2Tags[i].style.color = culoare;
        h2Tags[i].style.visibility = "hidden";
    }
    return false;
}
function Ex2(x,y){
    StergereElemente(2);
    DivMaker();
    colorare();

}