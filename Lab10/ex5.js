/*Dezvoltați o pagină web cu facilități JavaScript care definește un labirint (componente div alăturate,
dispuse matricial).
O imagine (a carei dimensiuni ii permit să încapă în labirint) trebuie mutată cu cursorul, de la intrare spre
ieșire.
Se afișează în permanență numărul de coliziuni cu pereții labirintului. Se contorizează timpul scurs între
intrarea în labirint și momentul ieșirii (număr de secunde).
Aplicația are 2 butoane, Pauza și Restart.*/

//imagine: https://doctorat.utcluj.ro/images/logo_site.png /212x108
//img2?:https://admitereonline.utcluj.ro/storage/2021/02/logout02.png  //320px227px;

//sursa: https://en.wikipedia.org/wiki/Maze_generation_algorithm

/*
1.Given a current cell as a parameter
2.Mark the current cell as visited
3.While the current cell has any unvisited neighbour cells:
    1.Choose one of the unvisited neighbours
    2.Remove the wall between the current cell and the chosen cell
    3.Invoke the routine recursively for the chosen cell
*/
//let n=3;
let min = `00`, sec = `00`;
let contorColiziuni;
function  createMaze(){
    n = prompt("Generare Labirint.[maxim 10] Introduceti dimensiunea:", 10);
    let wrapper = document.createElement("div"); wrapper.setAttribute("id", "wrapper"); wrapper.style.textAlign = "center"; wrapper.style.width = "100%";
    let spatiu = document.createElement("div"); spatiu.setAttribute("class", "StartZone");
    spatiu.style.position = "relative";
    let spatiu2 = document.createElement("div"); spatiu2.setAttribute("class", "finishZone");

    let DivControale = document.createElement("div"); DivControale.setAttribute("id", "divButoaneInfoText");
        let pauza = document.createElement("button");
        let restart = document.createElement("button");
        let info = document.createElement("h2"); info.style.display = "inline";
        let cron = document.createElement("h2"); cron.style.display = "inline";
    document.getElementById("content").appendChild(DivControale);
    DivControale.style.marginTop = "1%"; DivControale.style.display = "inline-block"; DivControale.style.width = "100%";
    DivControale.appendChild(pauza); DivControale.appendChild(restart); DivControale.appendChild(info); DivControale.appendChild(cron);
    pauza.setAttribute("id", "ButonPauza"); pauza.setAttribute("class", "ButCascada");
    restart.setAttribute("id","ButonRestart"); restart.setAttribute("class", "ButCascada"); restart.style.marginLeft = "1%";
    info.setAttribute("id", "infoText"); info.style.marginLeft = "1%"; info.style.width = "40%"; info.style.fontFamily = "Akaya Kanadaka"; info.innerHTML = `Numarul de coliziuni cu peretii labirintului: <span style="font-family: Segment7Standard;">${0}</span>`; //E DE FACUT
    cron.setAttribute("id", "cron");
    pauza.textContent = "Pauza"; pauza.setAttribute("onClick", "Pauza()"); ////////AICI E DE FACUT
    restart.textContent = "Restart"; restart.setAttribute("onClick", "Ex5()");
    cron.style.fontFamily = "Segment7Standard"; cron.textContent = "00:00"; cron.style.paddingLeft = "5%";


    spatiu.setAttribute("id", "start"); spatiu2.setAttribute("id", "sfarsit");
    spatiu.style.height = "100px"; spatiu2.style.height = "100px";
    spatiu.style.width = "100%"; spatiu2.style.width = "100%";
    imagine = document.createElement("img");
    imagine.setAttribute("id", "logoUTCN");
    imagine.style.zIndex = "1";
    imagine.style.width = (((n / n) * 100) / n) - 5  + "%";
    imagine.style.height= "auto";
    imagine.style.position = "absolute";
    imagine.style.left = "47.5%";
    imagine.style.border = "1px solid black";
    imagine.src = "https://doctorat.utcluj.ro/images/logo_site.png";
    //imagine.addEventListener("mousedown", mutare(), false);


    spatiu.appendChild(imagine);
    document.getElementById("content").appendChild(spatiu);
    document.getElementById("content").appendChild(wrapper);
    for(let i=0; i<n; i++) {
        for (let j = 0; j < n; j++) {
            var createDivs = document.createElement("div");
            createDivs.style.background = "#6D9BC5";
            createDivs.style.display = "inline-block";
            createDivs.style.width = (((n / n) * 100) / n) -0.8  + "%";
            createDivs.style.height = "100px";
            createDivs.style.marginBottom = "-4px";
            createDivs.style.border = "2px solid transparent";
            createDivs.setAttribute("class", "Labirint");
            createDivs.setAttribute("id", "lab" + i + "" + j);
            wrapper.appendChild(createDivs);

        }
    }

    for(var j = 0; j<n; j++) {
        document.getElementById("lab" + j + "" + (n-1)).style.borderRight = "5px solid black";
        document.getElementById("lab0" + j).style.borderTop = "5px solid black";
        document.getElementById("lab" + j + "0").style.borderLeft = "5px solid black";
        document.getElementById("lab" + (n-1) + "" + j).style.borderBottom = "5px solid black";
    }

    document.getElementById("content").appendChild(spatiu2);
    let border = +getComputedStyle((document.getElementById("lab02"))).borderTopWidth.slice(0, -2);

}

let LabirintSolved = false;
function Pauza(){ //implementare resume? -implementat :) Musai verificat
    if(document.getElementById("cron").textContent != '00:00') {
        if(LabirintSolved === false) {
			if (document.getElementById("ButonPauza").textContent == 'Pauza') {
				clearInterval(apelCron);
				apelCron = 0;
				document.getElementById("ButonPauza").textContent = 'Resume';
			} else if (document.getElementById("ButonPauza").textContent == 'Resume') {
				apelCron = setInterval(Cron, 1000);
				document.getElementById("ButonPauza").textContent = 'Pauza';
			}
		} else {
			alert("Nu se mai poate interactiona cu cronometrul, labirintul a fost rezolvat!");
		}
    }
}

let apelCron; //variabila in care se stocheaza intervalul
function Cron() {
    let cron = document.getElementById("cron");
    sec ++
    if (sec < 10) {
        sec = `0` + sec;
    }
    if (sec > 59) {
        sec = `00`
        min ++
        if (min < 10) {
            min = `0` + min
        }
    }
    cron.textContent = min + ':' + sec;

}

let generareCompleta = false;
let celulaCurenta;
let celulaStart;
let celulaFinal;
//let Bordere = new Array(n*n).fill(0).map(() => new Array(5).fill(0));
let BordereElement1 = []; //array in care imi salvez ce pereti trebuie sa fac (initial toti peretii is "true" in clasa)

/*
1.Choose the initial cell, mark it as visited and push it to the stack
2.While the stack is not empty
    1.Pop a cell from the stack and make it a current cell
    2.If the current cell has any neighbours which have not been visited
        1.Push the current cell to the stack
        2.Choose one of the unvisited neighbours
        3.Remove the wall between the current cell and the chosen cell
        4.Mark the chosen cell as visited and push it to the stack
*/


function generare(){ //?
    let grid = [];//new Array(n).fill(0).map(() => new Array(n).fill(0));
    let stack = [];

    for (let i = 0; i < n; i++) {
        let linie = [];//Se salveaza un rand intreg de celule in variabila asta
        for (let j = 0; j < n; j++) {
            let celula = new Celule(i, j, grid);
            linie.push(celula); //se introduce un element in linie
        }
        grid.push(linie); //se face un array bidimensional
    }
    var start = RandomNumber(); //utilizat pe parcurs
    var finish = RandomNumber();

    celulaCurenta = grid[0][start]; //inceputul maze-ului? Pot sa implementez intrarea random? celulaCurenta = grid[0][Math.floor(Math.random()* n)] ?
    celulaStart = start;
    celulaFinal = finish;


    console.log(`start: ${celulaStart} \nfinish: ${celulaFinal}`);
    grid[n-1][finish].goal = true;

    //celulaCurenta.setAttribute("paLaVecin", "vizitat");
    //iesireMaze = grid1[n][Math.floor(Math.random()* n)]; //nu stiu daca o sa folosesc :D
    /*for(let i = 0; i<n; i++) {
        for (let j = 0; j < n; j++) {
            paLaVecinu(grid, i ,j);
        }
    }*/
    functieRecursiva();
    function functieRecursiva(){
        for(let i = 0; i< n; i++){
            for(let j=0; j<n; j++) {
                grid[i][j].AfisGenMaze();
            }
        }
        let celulaUrmatoare = celulaCurenta.verificareVecin();
        if (celulaUrmatoare) {
            //celulaCurenta.setAttribute("paLaVecin", "vizitat");
            celulaUrmatoare.vizitat = true;
            stack.push(celulaCurenta);
            celulaCurenta.StergereBordere(celulaCurenta, celulaUrmatoare);
            celulaCurenta.PatraticaGeneratoare();
            //StergereBordere(celulaCurenta, celulaUrmatoare)
            celulaCurenta = celulaUrmatoare;
        } else if (stack.length > 0) {
            let celula = stack.pop();
            //celulaCurenta.PatraticaGeneratoare();
            celulaCurenta = celula;
        }
        if (stack.length === 0) {
            generareCompleta = true;
            return;
        }
        window.requestAnimationFrame(() => {
            functieRecursiva();
        });
    }
}
function RandomNumber(){
    let x = Math.floor(Math.random() * ((n-1) - 0 + 1) + 0);

    console.log(`In Random: ${x}`);
    if((x<0)||(x>n)){
        RandomNumber();
    } else {
        return x;
    }
}
function Bordere(){
    for(var i =1; i<= BordereElement1.length; i+=2) { //De ce 2???! SA PUN COMENTARII MAI DESSS!----parcurg vectorul din 2 in 2 pentru ca pe pozitiile pare am salvat array-ul cu booleans pentru pereti, iar cele impare cu elementul div respectiv
        if (BordereElement1[i - 1].topBorder === true) {
            BordereElement1[i].style.borderTop = "2px solid black";
        }
        if (BordereElement1[i - 1].bottomBorder === true) {
            BordereElement1[i].style.borderBottom = "2px solid black";
        }
        if (BordereElement1[i - 1].leftBorder === true) {
            BordereElement1[i].style.borderLeft = "2px solid black";
        }
        if (BordereElement1[i - 1].rightBorder === true) {
            BordereElement1[i].style.borderRight = "2px solid black";
        }
    }
    for(var j = 0; j<n; j++) {
        document.getElementById("lab" + j + "" + (n-1)).style.borderRight = "5px solid black";  //generare border exterior
        document.getElementById("lab0" + j).style.borderTop = "5px solid black";
        document.getElementById("lab" + j + "0").style.borderLeft = "5px solid black";
        document.getElementById("lab" + (n-1) + "" + j).style.borderBottom = "5px solid black";
    }
    document.getElementById("lab0"+celulaStart).style.borderTop = "5px solid transparent"; //pt celula start si finish
    document.getElementById("lab"+ (n-1) + "" + celulaFinal).style.borderBottom = "5px solid transparent";
	
	//setareBordereOglindaPentruElementulUrmator
	for(var i = 0; i < n; i++){
        for(var j = 1; j < (n-1); j++){
			//ca sa fac la toate, trebuie sa trec prin fiecare linia la fiecare coloana? Si pentru fiecare coloana la fiecare linie?
			let id = document.getElementById("lab" + i + "" + j);
			let idUrmColoana = document.getElementById("lab" + i + "" + (j+1));
			let idAntColoana = document.getElementById("lab" + i + "" + (j-1));
			if(id.style.borderRightColor === 'black') {
				idUrmColoana.style.borderLeftColor = 'black';
			}
			if(id.style.borderLeftColor === 'black') {
				idAntColoana.style.borderRightColor = 'black';
			}
			if(idAntColoana.style.borderRightColor === 'black') {
				id.style.borderLeftColor = 'black';
			}
			if(idUrmColoana.style.borderLeftColor === 'black') {
				id.style.borderRightColor = 'black';
			}
		}
	}
	for(var i = 1; i < (n-1); i++){
        for(var j = 0; j < n; j++){
			let id = document.getElementById("lab" + i + "" + j);
			let idUrmLinie = document.getElementById("lab" + (i+1) + "" + j);
			let idAntLinie = document.getElementById("lab" + (i-1) + "" + j);
			if(id.style.borderBottomColor === 'black') { //lab[x,y] are border-ul de jos negru, lab[x+1,y] o sa aibe border-ul de sus negru
				idUrmLinie.style.borderTopColor = 'black';
			}
			if(id.style.borderTopColor === 'black') { //lab[x,y] are border-ul de jos negru, lab[x+1,y] o sa aibe border-ul de sus negru
				idAntLinie.style.borderBottomColor = 'black';
			}
			if(idAntLinie.style.borderBottomColor === 'black'){
				id.style.borderTopColor = 'black';
			}
			if(idUrmLinie.style.borderTopColor === 'black') {
				id.style.borderBottomColor = 'black';
			}
		}
	}
}
class Celule {
    constructor(linia, coloana, matrice) {
        this.linia = linia;
        this.coloana = coloana;
        this.ElementDiv = document.getElementById("lab" + linia + "" + coloana);
        this.vizitat = false;
        this.borders = { //dupa vectorul asta se schimba borderu' din transparent in black
            topBorder: true,
            rightBorder: true,
            bottomBorder: true,
            leftBorder: true,
        };
        this.goal = false;
        this.grid = matrice;
    }
    verificareVecin() {
        let grid = this.grid;
        let linia = this.linia;
        let coloana = this.coloana;
        let vecini = [];

        let vecinSus = linia !== 0 ? grid[linia - 1][coloana] : undefined;
        let vecinDreapta = coloana !== grid.length - 1 ? grid[linia][coloana + 1] : undefined;
        let vecinJos = linia !== grid.length - 1 ? grid[linia + 1][coloana] : undefined;
        let vecinStanga = coloana !== 0 ? grid[linia][coloana - 1] : undefined;

        if (vecinSus && !vecinSus.vizitat) {
            vecini.push(vecinSus);
        }
        if (vecinDreapta && !vecinDreapta.vizitat) {
            vecini.push(vecinDreapta);
        }
        if (vecinJos && !vecinJos.vizitat) {
            vecini.push(vecinJos);
        }
        if (vecinStanga && !vecinStanga.vizitat) {
            vecini.push(vecinStanga);
        }

        if (vecini.length !== 0) {
            let random = Math.floor(Math.random() * vecini.length);
            return vecini[random];
        } else {
            return undefined;
        }
    }
    PatraticaGeneratoare() {
        if(generareCompleta) {
            this.ElementDiv.style.background ="#1974D2";
        } else {
            this.ElementDiv.style.background = "darkred";
        }
    }
    StergereBordere(celula1, celula2) {
        let x = celula1.coloana - celula2.coloana; //Se ia celula anterioara si se calculeaza pe orizontala. Daca da 1, inseamna ca generarea a fost facuta de la dreapta la stanga
        if (x === 1) {
            celula1.borders.leftBorder = false; //se elimina booleanul pentru peretele din stanga. Dupa ma folosesc de aceste boolean-uri la setarea culorii la borders.
            celula2.borders.rightBorder = false;
        } else if (x === -1) {
            celula1.borders.rightBorder = false; //stanga la dreapta, pe verticala
            celula2.borders.leftBorder = false;
        }
        let y = celula1.linia - celula2.linia; //daca e 1, e de jos in sus
        if (y === 1) {
            celula1.borders.topBorder = false;
            celula2.borders.bottomBorder = false;
        } else if (y === -1) { //de sus in jos
            celula1.borders.bottomBorder = false;
            celula2.borders.topBorder = false;
        }
        //DE AIA MERG DIN 2 IN 2 :)
        BordereElement1.push(this.borders); //Imi introduc toate boolean-urile intr-un array unidimensional (length/2 pentru a putea afisa un anumit tip de date)
        BordereElement1.push(this.ElementDiv); //salvez si div-urile pt care trebuie aplicate boolean-urile salvate
    }
    AfisGenMaze() {
        if (this.vizitat) {
            this.ElementDiv.style.background = "#1974D2"; //ca sa suprapun culoarea "darkred" cu care afisez generarea maze-ului
        }
        if (this.goal) {
            this.ElementDiv.style.background = "rgba(0,255,0,0.2)"; //patratica care e iesirea
			this.ElementDiv.style.bottomBorderColor = 'darkred';
        }
    }
}


function Ex5(){
    min = `00`; sec = `00`; coliziuni = 0; ultimaColiziune = null;
    clearInterval(apelCron); apelCron = 0; startMaze = true;
    generareCompleta = false;
    StergereElemente(5);
    createMaze();
    generare();
    setTimeout(() => {Bordere();}, (n/3)*1000);
    ParcurgereLabirint();
}
var ultimaColiziune, coliziune = false, coliziuni = 0, startMaze = true;
function ParcurgereLabirint() {
    let img = document.getElementById("logoUTCN");

    img.onmousedown = function (event) {
        let shiftX = event.clientX - img.getBoundingClientRect().left;
        let shiftY = event.clientY - img.getBoundingClientRect().top;
        img.style.zIndex = 1000;

        if(startMaze === true){
            apelCron = setInterval(Cron, 1000);
            startMaze = false;
        }

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            img.style.left = pageX - shiftX - 8 + 'px';
            img.style.top = pageY - shiftY - 124 + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            info = document.getElementById("infoText");
            info.innerHTML = `Numarul de coliziuni cu peretii labirintului: <span style="font-family: Segment7Standard;">${coliziuni}</span>`;

            img.hidden = true; //ca sa treaca cursoru' prin poza ca sa ia div-ul de sub img
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            img.hidden = false;

            if (!elemBelow) return;

            let idDivLab = elemBelow.closest('.Labirint');

            //console.log(idDivLab);
            if(elemBelow.closest('.Labirint')) {
                let borderStanga = idDivLab.style.borderLeftColor;
                let borderSus = idDivLab.style.borderTopColor;
                let borderDreapta = idDivLab.style.borderRightColor;
                let borderJos = idDivLab.style.borderBottomColor;
                //console.log(parseInt(img.style.left.slice(0,-2)) - idDivLab.getBoundingClientRect().left);
                //console.log(`Stanga ${borderStanga}\nSus: ${borderSus}\nDreapta: ${borderDreapta}\nJos: ${borderJos}`);
                let idUrmatorColoana = idDivLab.getAttribute("id"); //pt dreapta daca div-ul actual nu are border in dreapta
                if(parseInt(idUrmatorColoana.slice(-1))<n){
                    idUrmatorColoana = idUrmatorColoana.substring(0, 4) + (parseInt(idUrmatorColoana.slice(-1))+1);
                }
                let idAnteriorColoana = idDivLab.getAttribute("id"); //pt stanga in caz ca div-ul actual nu are border in stanga si sa verific pentru borderu' din dreapta
                if(parseInt(idAnteriorColoana.slice(-1))>0){
                    idAnteriorColoana = idAnteriorColoana.substring(0, 4) + (parseInt(idAnteriorColoana.slice(-1))-1);
                }
                let idUrmatorLinie = idDivLab.getAttribute("id"); //pt border-ul de jos in caz ca div-ul actual nu are si verific borderu' de sus la div-ul de sub cel actual
                if(parseInt(idUrmatorLinie.slice(3,4))<n){
                    idUrmatorLinie = idUrmatorLinie.substring(0, 3) + (parseInt(idUrmatorLinie.slice(3,4)) + 1) + idUrmatorLinie.substring(4);
                }
                let idAnteriorLinie = idDivLab.getAttribute("id");//pt border-ul de sus in caz ca div-ul actual nu are si verific borderu' de jos la div-ul deasupra celui actual
                if(parseInt(idAnteriorLinie.slice(3,4))>0){
                    idAnteriorLinie = idAnteriorLinie.substring(0, 3) + (parseInt(idAnteriorLinie.slice(3,4)) - 1) + idAnteriorLinie.substring(4);
                }
                if ((borderStanga === "black") && (img.getBoundingClientRect().left - idDivLab.getBoundingClientRect().left < 6)) {
                    //console.log("stanga: " + (img.getBoundingClientRect().left - idDivLab.getBoundingClientRect().left));
					if(coliziune == true) {
                        if(ultimaColiziune != idDivLab) {
                            coliziuni += 1;
                            coliziune = true;
                        }
                    } else {
                        coliziuni += 1;
                        coliziune = true;
                    }
                    //console.log("Stanga sub limita!\n" + (img.getBoundingClientRect().left - document.getElementById(idAnteriorColoana).getBoundingClientRect().right));
                    ultimaColiziune = idDivLab;
                    console.log(coliziuni);
                    document.removeEventListener('mousemove', onMouseMove);
                }

                if ((borderSus === "black") && (img.getBoundingClientRect().top - idDivLab.getBoundingClientRect().top) < 5){
                    //console.log("sus: " + (img.getBoundingClientRect().top - idDivLab.getBoundingClientRect().top));
                    if(coliziune == true) {
                        if(ultimaColiziune != idDivLab) {
                            coliziuni += 1;
                            coliziune = true;
                        }
                    } else {
                        coliziuni += 1;
                        coliziune = true;
                    }
                    ultimaColiziune = idDivLab;
                    console.log(coliziuni);
                    document.removeEventListener('mousemove', onMouseMove);
                }

                if ((borderDreapta === "black") && (idDivLab.getBoundingClientRect().right - img.getBoundingClientRect().right) < 7) { //sa iau si borderu' stang de la j+1!!!!
                    //console.log("Dreapta");
                   // console.log("dreapta: " + (idDivLab.getBoundingClientRect().right - img.getBoundingClientRect().right)); //<7
                    if(coliziune == true) {
                        if(ultimaColiziune != idDivLab) {
                            coliziuni += 1;
                            coliziune = true;
                        }
                    } else {
                        coliziuni += 1;
                        coliziune = true;
                    }
                    //console.log("idLinieUrmator: " + idLinieUrmator + "\nDreapta sub limita!\n" + (img.getBoundingClientRect().right - document.getElementById(idUrmatorLinie).getBoundingClientRect().left));
                    ultimaColiziune = idDivLab;
                    console.log(coliziuni);
                    document.removeEventListener('mousemove', onMouseMove);
                }
                if ((borderJos === "black") && (idDivLab.getBoundingClientRect().bottom - img.getBoundingClientRect().bottom < 5)) {
                    //console.log("jos: " + (idDivLab.getBoundingClientRect().bottom - img.getBoundingClientRect().bottom));
                    if(coliziune == true) {
                        if(ultimaColiziune != idDivLab) {
                            coliziuni += 1;
                            coliziune = true;
                        } else {
                            coliziuni += 1;
                            coliziune = true;
                        }
                    }
                    //console.log("Jos sub limita!\n" + (document.getElementById(idUrmatorColoana).getBoundingClientRect().top - img.getBoundingClientRect().bottom));
                    ultimaColiziune = idDivLab;
                    document.removeEventListener('mousemove', onMouseMove);
                }
            } //else if (document.elementFromPoint(event.clientX, event.clientY).closest('.finishZone')){
            else if ((document.getElementById("sfarsit").getBoundingClientRect().bottom - img.getBoundingClientRect().bottom > 5)&&(document.getElementById("sfarsit").getBoundingClientRect().right - img.getBoundingClientRect().right > 5)
            &&(img.getBoundingClientRect().top - document.getElementById("sfarsit").getBoundingClientRect().top > 5)&&(img.getBoundingClientRect().left - document.getElementById("sfarsit").getBoundingClientRect().left > 5)){
                clearInterval(apelCron);
                apelareCron = 0;
                document.removeEventListener('mousemove', onMouseMove);
				LabirintSolved = true;
                alert(`Felicitari! Ati terminat maze-ul in ${min}:${sec}! Numarul de coliziuni cu peretii: ${coliziuni}`)
            }
        }

        document.addEventListener('mousemove', onMouseMove);

        img.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            img.onmouseup = null;
        };

    };

    img.ondragstart = function () { //nu vreau sa se activeze draggu'
        return false;
    };
}