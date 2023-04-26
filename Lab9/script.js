
function afisareMeniuAdaugareStudenti() { //functie care schimba stilul div-urilor selectati. 1=stil block, restul none la apasarea unui buton. button onClick = "functia specifica"
        var a = document.getElementById("formDateStudenti");
        var b = document.getElementById("formModDateStudenti");
        var c = document.getElementById("formAfisDateStudenti");
        if (a.style.display === "none") {
                console.log("Meniu ADAUGARE DATE STUDENTI ON");
                a.style.display = "block"; 
                b.style.display = "none"; 
                c.style.display = "none";
                document.getElementById("AfisareANoteStudenti").style.display = "none"; //se modifica display-ul de la meniurile adaugare si actualizare note la fiecare schimbare a meniurilor [arata mai bine]
                document.getElementById("AfisareNoteStudenti").style.display = "none";
        } else if((b.style.display === "block")||(c.style.display === "block")){  //sa nu ramana div-ul din dreapta fara content daca celelalte 2 sunt hidden.
                a.style.display = "none";
        }
}
function afisareMeniuModificareStudenti() { //Same ca prima functie
        var a = document.getElementById("formModDateStudenti");
        var b = document.getElementById("formDateStudenti");
        var c = document.getElementById("formAfisDateStudenti");
        if (a.style.display === "none") { 
                console.log("Meniu MODIFICARE DATE STUDENTI ON");
                a.style.display = "block"; 
                b.style.display = "none"; 
                c.style.display = "none"; 
                document.getElementById("AfisareANoteStudenti").style.display = "none";
                document.getElementById("AfisareNoteStudenti").style.display = "none";
        } else if((b.style.display === "block")||(c.style.display === "block")){ 
                a.style.display = "none"; 
        }
}
function afisareMeniuAfisStudenti() { //same ca a 2-a functie :))))
        var a = document.getElementById("formAfisDateStudenti");
        var b = document.getElementById("formModDateStudenti");
        var c = document.getElementById("formDateStudenti");
        if (a.style.display === "none") {
                console.log("Meniu AFISARE STUDENTI ON");
                a.style.display = "block";
                b.style.display = "none"; 
                c.style.display = "none"; 
                document.getElementById("AfisareANoteStudenti").style.display = "none";
                document.getElementById("AfisareNoteStudenti").style.display = "none";
        } else if((b.style.display === "block")||(c.style.display === "block")){ 
                a.style.display = "none"; 
        }
        afisareStudenti(); //se face apelarea functiei ca sa se cloneze+introduca valori in text box-uri.
}
class Student{ //clasa ceruta
        static count = 0; //tin evidenta claselor pentru ca ma folosesc de asta pentru a putea face chestiile cat mai dinamic [ex: aflare cate elemente de tip div tre sa clonez]
        constructor(nume, prenume, data_nasterii, foaie_matricola){
                this.IdClasa = ++Student.count; //id-ul studentului ??SA VERIFIC DACA FOLOSESC ASTA, altfel STERGE!!
                //definirea atributelor
                this.nume = nume; 
                this.prenume = prenume;
                this.data_nasterii = data_nasterii;
                this.foaie_matricola = foaie_matricola;
                this.note = []; //definire array de note
        }
        afiseazaVarsta(){
                const birthday = new Date(this.data_nasterii); //se introduce in birthday data cu ajutorul functiei new Date
                const date1 = new Date() - birthday; //Se face diferenta de ms intre data introdusa si data curenta
                let msAn = 3.168808781402895 * Math.pow(10,-11); //un an in ms are msAn :)
                let ani = Math.abs(date1 * msAn) //inmultire ca sa aflu in ani
                return Math.floor(ani); //rotunjire
        }
        afiseazaNotele(){
                if(this.note!=null){ //daca notele nu sunt null, se returneaza notele pentru studentul selectat dintr-un array sau variabila salvata
                        return this.note;
                } else {
                        return false; //se returneaza false (NaN daca se apeleaza functia intr-o variabila)
                }
        }
        calculeazaMedia(){
                let medie = 0;
                if(this.note!=null) {
                console.log("calculez media studentului...==>")
                        for(let i = 0; i<this.note.length; i++) //se trece prin array-ul de note si se adauga la variabila medie
                        {
                                medie += this.note[i];
                        }
                        console.log("Media este: " + medie/this.note.length);
                return medie/this.note.length; //se returneaza direct medie
                }
        }
        adaugaNota(nota_noua){
                this.note.push(nota_noua); //se introduce nota noua cu functia push.
                console.log("S-a introdus nota: \"" + nota_noua + "\"!");
                return false;
        }
        setterNume(nume) { //setter nume

                try {
                        if((stringLength(nume)<2)||(/\d/.test(nume) == 1)) { //se verifica daca e mai mare ca 1 si sa nu contina numere. Am creat o functie ca sa imi masoare string-urile pentru ca functia .length nu functioneaza :)
                                throw "Lungimea numelui nu e >=2! Sau contine numere!" //se arunca eroarea asta daca e adevarata conditia de sus
                        } else {
                                this.nume = nume;
                        }
                }catch(err) {
                                console.log(err);
                                return err;
                }        
        }
        setterPrenume(prenume) {
                try {
                        if((stringLength(prenume)<2)||(/\d/.test(prenume) == 1)) { //same ca la nume
                                throw "Lungimea prenumelui nu e >=2!"
                        } else {
                                this.prenume = prenume;
                        }
                }catch(err) {
                                console.log(err);
                                return err;
                }
        }
        setterdataNasterii(data_nasterii) { //setter data nasterii, dar se verifica sa fie > 18
                try {
                        this.data_nasterii = data_nasterii; //Fiindca nu vreau sa mai fac o functie care sa primeasca data_nasterii ca parametru, o introduc in clasa direct si dupa apelez functia din clasa
                        if(this.afiseazaVarsta()<18) { //apelare functie din clasa. Daca e adevarat, se initializeaza cu null data_nasterii din clasa si se returneaza eroarea
                                this.data_nasterii = null;
                                throw "Varsta < 18!"
                        } //daca nu e adevarata conditia, trece mai departe. (Adica nu face nimic, si ramane salvata data_nasterii
                }catch(err) {
                                console.log(err);
                                getterOrice(err);
                                return err;
                }
        }
}

Stud=[]; //intializare array (nu e musai, l-am pus sa fie. Daca tin bine minte, se poate schimba aceasta variabila pentru ca m-am folosit doar de variabile specifice clasei)
Stud = [new Student("Popescu", "Vasile", "2001.05.03", "0123123"), new Student("Visinescu", "Smekeru'", "2004/10-18", "0123123"),new Student("Popescu", "Aristotel", "1998/02.09", "0123123")];
Stud[0].note.push(8,7,10); Stud[1].note.push(3,7,6); Stud[2].note.push(6,3,6);

function stringLength(string) { //functia care imi masoara string-uri
  let index = 0; //index 0 initializare
  while (string.slice(index) !== '') {
    index++;
  }
  return index;
}

function modificareStudent(event){//Functia care e apelata la apasarea butonului "Cautare"
        event.preventDefault();
        document.getElementById("mesajeroare").innerHTML = ""; //in caz ca a fost returnata o eroare inainte sa fie reapelata functia, se sterge acel mesaj
        var uinput = document.getElementById("modStud").value; //inputul unde se cere userului sa introduca index-ul unui student
        if(Student.count>0) { //daca exista elemente student
                if(uinput==null || uinput=='') { //daca utilizatorul nu a introdus o valoare sau a introdus o valoare mai mica ca 0/ mai mare ca nr de obj tip Student, se afiseaza erorile referente cauzei
                        document.getElementById("mesajeroare").innerHTML = "|Introduceti un numar!|"; 
                                document.getElementById("MNumeStudent").value = ""; //reintializare data in caz ca s-a introdus un index corect si dupa un index gresit.
                                document.getElementById("MPrenumeStudent").value= "";
                                document.getElementById("MintData").value = "";
                                document.getElementById("MFoaiaMatStud").value = "";
                } else if (uinput<=0) {
                        document.getElementById("mesajeroare").innerHTML = "|Introduceti un numar valid![>=1]|"; 
                                document.getElementById("MNumeStudent").value = ""; //reintializare data in caz ca s-a introdus un index corect si dupa un index gresit.
                                document.getElementById("MPrenumeStudent").value= "";
                                document.getElementById("MintData").value = "";
                                document.getElementById("MFoaiaMatStud").value = "";
                } else if(uinput>Student.count) {
                        document.getElementById("mesajeroare").innerHTML = "|Studentul nu a fost gasit!| Am gasit acest nr de stud:" + Student.count; 
                                document.getElementById("MNumeStudent").value = ""; //reintializare data in caz ca s-a introdus un index corect si dupa un index gresit.
                                document.getElementById("MPrenumeStudent").value= "";
                                document.getElementById("MintData").value = "";
                                document.getElementById("MFoaiaMatStud").value = "";
                } else { //daca utilizatorul a introdus un index corect, se afiseaza valorile studentului
                        console.log("Realizez cautarea studentului dupa index...");
                        document.getElementById("MNumeStudent").value = Stud[uinput-1].nume;
                        document.getElementById("MPrenumeStudent").value = Stud[uinput-1].prenume;
                        document.getElementById("MintData").value = Stud[uinput-1].data_nasterii.replace(/[.\s\\/~]/g,'-'); //functia replace ca sa transforme un string intr-un format suportat de <input type="date">
                        document.getElementById("MFoaiaMatStud").value =Stud[uinput-1].foaie_matricola;
                        console.log("Studentul a fost gasit!");
                        document.getElementById("ActualizareDateStud").onclick = function(event){ //un listener la apasarea butonului "Modificare"
                                event.preventDefault(); //sa nu se dea refresh la pagina
                                console.log(uinput);
                                if((uinput==null) || (uinput=='') || (uinput<1) || (uinput>Student.count)) { //conditii necesare ca sa se poate modifica un student (>0, !=null, <=index Student
                                        alert("Nu s-a putut realiza identificarea studentului!");
                                        modificareStudent(event); //reapelare functie
                                } else {
                                        if(Stud[uinput-1].nume == (document.getElementById("MNumeStudent").value) && Stud[uinput-1].prenume == document.getElementById("MPrenumeStudent").value && Stud[uinput-1].data_nasterii == document.getElementById("MintData").value && Stud[uinput-1].foaie_matricola == document.getElementById("MFoaiaMatStud").value) { //daca user-ul nu a modificat nimic, se afiseaza eroare. E irelevanta aceasta linie, da e mai fancy codul :)
                                                alert("Nu ati modidicat nimic la student. Se pastreaza valorile initiale.");
                                        } else { //altfel se reinitializeaza valorile din campurile specifice
                                                document.getElementById("mesajeroare").innerHTML = Stud[uinput-1].setterNume(document.getElementById("MNumeStudent").value); //nu merge sa fac catch la eroare din clasa student
                                                document.getElementById("mesajeroare").innerHTML = Stud[uinput-1].setterPrenume(document.getElementById("MPrenumeStudent").value);
                                                document.getElementById("mesajeroare").innerHTML = Stud[uinput-1].setterdataNasterii(document.getElementById("MintData").value);
                                                Stud[uinput-1].foaie_matricola = document.getElementById("MFoaiaMatStud").value;
                                                if((document.getElementById("MNumeStudent").value==Stud[uinput-1].nume)&&(document.getElementById("MPrenumeStudent").value==Stud[uinput-1].prenume)&&(document.getElementById("MintData").value==Stud[uinput-1].data_nasterii)&&(document.getElementById("MFoaiaMatStud").value==Stud[uinput-1].foaie_matricola)) //Se verifica daca valoarea din obj Student coincide cu cea introdusa de user
                                                {
                                                        alert("Studentul a fost actualizat!"); //se afiseaza o alerta corespunzatoare
                                                        modificareStudent(event); //reapelare functie ?Nu stiu de ce fac asta ca e cam irelevant(update de date?), bad habit de la c++ sau java
                                                } else {
                                                        alert("Eroare la actualizarea datelor a acestui student!");
                                                }
                                        }
                                }
                        };
                }
        } else {
                alert("Nu sunt studenti!");
                console.log(Stud);
                document.getElementById("mesajeroare").innerHTML = "|Studenti salvati: \""+ Student.count + "\"!|"; //Daca nu s-a introdus bine valoarea si s-a apasat butonul cauta, se afiseaza numarul de studenti existenti.
        }
}
function stergereToti(event) { //functie care trece prin tot array-ul de studenti si apeleaza functia .pop() pentru a elimina ultimul element din vector.
        event.preventDefault();
        let indexStudent = Student.count;
        AdaugareNoteStud(event); //ca sa sterg div-urile clonate si sa reupdatez interfata
        ActualizareNoteStud(event);
        document.getElementById("AfisareANoteStudenti").style.display = "none"; //sa dispara meniul pentru actualizarea notelor
        document.getElementById("AfisareNoteStudenti").style.display = "none"; //adaugare note stud
        if(Student.count>0) { //se verifica daca sunt studenti pentru a putea afisa o eroare corespunzatoare in caz ca nu exista studenti care sa fie stersi
                for(let i = 0; i< indexStudent; i++) { //se trece prin array. pentru a evita folosirea altei variabile: for(i=Student.count; i>=0; --i) //-1 pentru ca trebuie sa mearga pana la 0. puteam folosi <=, dar sa mai schimbam putin lucrurile
                        Stud.pop(); //
                        Student.count -= 1; //se decrementeaza Student.count
                }
                let p = 1;
                while(true){ //e loop infinit ca nu se stie numarul de div-uri care au fost clonate.
                        let selectareDiv = document.getElementById('aNote'+ (Student.count + p));
                        if(typeof(selectareDiv) != 'undefined' && selectareDiv != null){ //verificare existenta div-urilor care permit afisarea
                                selectareDiv.remove();//eliminare div selectat
                                p++;
                        } else {
                                break; //daca nu exista, se iese din loop
                        }
                }
                document.getElementById("MNumeStudent").value = ""; //Stergere date din afisajul de la content box-uri
                document.getElementById("MPrenumeStudent").value = "";
                document.getElementById("MintData").value = "";
                document.getElementById("MFoaiaMatStud").value = "";
                document.getElementById("modStud").value = "";
                alert("Toti studentii au fost stersi!"); //alertare utilizator ca operatiunea a avut loc cu succes.
        } else {
                alert("Nu mai exista studenti care sa fie stersi!");
        }
}
function stergereStudent(event) { //se ia un index de la utilizator pentru a gasi student care urmeaza sa fie sters
        event.preventDefault(); //stop refresh pagina
        document.getElementById("mesajeroare").innerHTML = ""; //eliminare orice eroare in caz ca era inainte
        var uinput = document.getElementById("modStud").value; //se citeste din input box valoarea introdusa
        if(uinput==null || uinput=='') { //verificare sa fie date eronate (se asteapta un numar si sa fie intre [1, Student.count]
                document.getElementById("mesajeroare").innerHTML = "|Introduceti un numar pentru a putea identifica studentul!|"; 
        } else if(uinput>Student.count) {
                document.getElementById("mesajeroare").innerHTML = "|Eroare la stergerea studentului. Nu a fost gasit!| Am gasit acest nr de stud:" + Student.count; 
        } else {        
                const index = uinput-1; //salvare index utilizator in variabila
                if (index > -1) { //daca index-ul e mai mare ca -1 (in caz ca a bagat utilizatorul 0, sa nu mearga)
                        Stud.splice(index, 1); //de la index-ul dat, se elimina 1 element din vector. EX: [34, 55, 68] .splice(1,1) => [34,68]. 55 a fost sters pentru ca s-a aflat pe pozitia cu index-ul 1, adica pozitia doi. [index0, index1, index3]
                        Student.count -= 1; //eliminare un count de la clasa pentru ca nu mai exista
                        console.log("Studentul " + uinput + " cu datele: \n| Nume: " + document.getElementById("MNumeStudent").value + " \n| Prenume:" + document.getElementById("MPrenumeStudent").value + "      a fost sters!")
                        document.getElementById("MNumeStudent").value = "";//reinitializare cu null continutul casetelor
                        document.getElementById("MPrenumeStudent").value ="";
                        document.getElementById("MintData").value = "";
                        document.getElementById("MFoaiaMatStud").value = "";
                        alert("Studentul a fost sters!");
                        AdaugareNoteStud(event);
                        ActualizareNoteStud(event);
                        document.getElementById("AfisareANoteStudenti").style.display = "none";
                        document.getElementById("AfisareNoteStudenti").style.display = "none";
                } else {
                        alert("Eroare la stergerea studentului!"); //se afiseaza eroarea daca nu e indeplinita conditia
                }
        }
}
function adaugareStudent(){ //functie care adauga studenti in array. [Mod dinamic]
        document.getElementById("addmesajeroaren").innerHTML = ""; //mesaj eroare nume
        document.getElementById("addmesajeroarep").innerHTML = ""; //mesaj eroare prenume
        document.getElementById("addmesajeroared").innerHTML = ""; //mesaj eroare data
        let bol = true; //boolean
        if(document.getElementById("AddNumeStudent").value==null || document.getElementById("AddNumeStudent").value=='')
        {
                document.getElementById("addmesajeroaren").innerHTML = "|?Numele nu poate sa fie null|"; 
                bol = false; //e un inginer care da pass la schita sau nu :)))
        }
        if(document.getElementById("AddPrenumeStudent").value==null || document.getElementById("AddPrenumeStudent").value=='')
        {
                document.getElementById("addmesajeroarep").innerHTML = "|?Preumele nu poate sa fie null|"; 
                bol = false;
        }
        if(document.getElementById("AddintData").value==null || document.getElementById("AddintData").value=='')
        {
                document.getElementById("addmesajeroared").innerHTML = "|?Data nasterii nu poate sa fie nula|"; 
                bol = false;
        }
        if(bol == true){
                try{
                        Stud.push(new Student(document.getElementById("AddNumeStudent").value,document.getElementById("AddPrenumeStudent").value,document.getElementById("AddintData").value,document.getElementById("AddFoaiaMatStud").value)); //ca sa testez varsta, e musai sa introduc utilizatorul in array(functie clasa fara parametru)
                        if((Stud[Stud.length-1].afiseazaVarsta()<18)||(stringLength(Stud[Stud.length-1].nume)<2)||(stringLength(Stud[Stud.length-1].prenume)<2))
                        {
                                if(Stud[Stud.length-1].afiseazaVarsta()<18) {
                                        Stud.pop();
                                        Student.count -= 1;
                                        throw "Varsta studentului e sub 18!";
                                }
                                if(stringLength(Stud[Stud.length-1].nume)<2) {
                                        Stud.pop();
                                        Student.count -= 1;
                                        throw "Numele studentului are mai putin de 2 caractere!";
                                }
                                if(stringLength(Stud[Stud.length-1].prenume)<2) {
                                        Stud.pop();
                                        Student.count -= 1;
                                        throw "Preumele studentului are mai putin de 2 caractere!";
                                }
                        } else {
                                alert("Studentul \"" + document.getElementById("AddNumeStudent").value + " " + document.getElementById("AddPrenumeStudent").value + "\" a fost adaugat!");
                        }
                        
                } catch(err) {
                        console.log(err);
                        document.getElementById("addmesajeroarep").innerHTML = err;
                }
        }
}
function afisareStudenti(){
        let i = 0; let bol = false;
        for(let x=1; x<=Student.count; x++) { //verificare numar de elemente create + protectie sa nu creeze din nou la reapelare
                if(document.getElementById("AfisareStudenti"+x)==null)
                {
                        i = x;
                        bol = true;
                        break;
                } else {
                        bol = false;
                }
        }
        if((i<=Student.count)&&(bol==true)){ //conditia care face n elemente(fix de cat e nevoie|Clonare)
                for(i; i<=Student.count; i++) {
                        var div = document.querySelector('#AfisareStudenti1');
                        var divClone = div.cloneNode(true);
                        divClone.id = 'AfisareStudenti'+(i);
                        divClone.querySelector("h2").innerText = "Afisare Student " + i; //schimbare h2 pentru a afisa numarul studentului
                        var NumeStud = divClone.querySelector("#NumeStudent1");//selectare id copilului div-ului clonat si reinitializat cu alt nume mai jos "NumeStud.id = "..."+(i);"
                        var NoteStud = divClone.querySelector("#NoteStudent1");
                        var PrenumeStud = divClone.querySelector("#PrenumeStudent1");
                        var MediaStud = divClone.querySelector("#MediaStudent1");
                        var dataNastStud = divClone.querySelector("#intData1");
                        var varstaStud = divClone.querySelector("#varstaStud1");
                        var FoaiaMatStud = divClone.querySelector("#FoaiaMatStud1");
                        NumeStud.id = "NumeStudent"+(i);
                        NoteStud.id = "NoteStudent"+(i);
                        PrenumeStud.id = "PrenumeStudent"+(i);
                        MediaStud.id = "MediaStudent"+(i);
                        dataNastStud.id = "intData"+(i);
                        varstaStud.id = "varstaStud" +(i);
                        FoaiaMatStud.id = "FoaiaMatStud"+(i);
                        div.after(divClone);//introducere div clonat dupa div-ul parrent (De aia e nevoie de sortare, pentru ca se baga div2 dupa div 1, se creeaza elementul div 3 si el tot se introduce dupa div1. EX:n=5 => div1 div4 div3 div2
                }
        }
        if(Student.count<1){ //Daca se apeleaza functia stergerea totala a studentilor dupa ce a fost apelata functia afisare studenti, trebuie reinitializat sectorul pentru afisare
                let i = 2; //se incepe direct de la 2 pentru ca doresc sa las primul div acolo necompletat.
                while(true){ //e loop infinit ca nu se stie numarul de div-uri care au fost clonate.
                        let selectareDiv = document.getElementById('AfisareStudenti'+i);
                        if(typeof(selectareDiv) != 'undefined' && selectareDiv != null){ //verificare existenta div-urilor care permit afisarea
                                selectareDiv.remove();
                        } else {
                                break; //daca nu exista, se iese din loop
                        }
                        i++; //incrementare
                }
                document.getElementById("NumeStudent1").value = null;//reinitializare (stergere) valori din input text
                document.getElementById("PrenumeStudent1").value = null;
                document.getElementById("intData1").value = null;
                document.getElementById("varstaStud1").value = null;
                document.getElementById("FoaiaMatStud1").value = null;
                document.getElementById("NoteStudent1").value = null;
                document.getElementById("MediaStudent1").value = null;
        }
        for(let j=0; j<Student.count; j++) { //populare cu date a casetelor text
                document.getElementById("NumeStudent"+(j+1)).value = Stud[j].nume;
                document.getElementById("PrenumeStudent"+(j+1)).value = Stud[j].prenume;
                document.getElementById("intData"+(j+1)).value = Stud[j].data_nasterii.replace(/[. \\/~]/g,'-'); //functia .replace in caz ca nu e scrisa data corect(standard) si trebuie reinitializata ca sa accepte caseta tip date
                document.getElementById("varstaStud"+(j+1)).value = Stud[j].afiseazaVarsta();
                document.getElementById("FoaiaMatStud"+(j+1)).value = Stud[j].foaie_matricola;
                document.getElementById("NoteStudent"+(j+1)).value = Stud[j].afiseazaNotele();
                document.getElementById("MediaStudent"+(j+1)).value = Stud[j].calculeazaMedia().toFixed(2);
        }
        //sortare div-uri.
        var toSort = document.getElementById('sort').children; //se selecteaza div-urile care sunt in interiorul div-ului cu id-ul sort
        toSort = Array.prototype.slice.call(toSort, 0); 
        toSort.sort(function(a, b) { //functia sort sorteaza crescator
                var aord = +a.id.slice(15,17); //se selecteaza ultima parte a id-ului (e o cifra si asa diferentiez div-urile)
                var bord = +b.id.slice(15,17);
                return (aord > bord) ? 1 : -1;}); //se pune conditia daca e mai mare, se returneaza 1, altfel -1
        var parent = document.getElementById('sort'); //se selecteaza div-ul in care o sa fie introduse div-urile sortate
        parent.innerHTML = "";
        for(var f = 0, l = toSort.length; f < l; f++) {
                parent.appendChild(toSort[f]);
        }
        if(Student.count < 1) {
                alert("Nu sunt studenti ca sa se poata faca listarea!");
        }
}
function AdaugareNoteStud(event){//Functia care permite adaugarea unor noi valori in vectorul Note
        event.preventDefault(); //sa nu-si dea restart pagina
        var a = document.getElementById("AfisareNoteStudenti");
        if(Student.count>0) {        
                if (a.style.display === "none") { 
                        a.style.display = "block";
                        document.getElementById("AfisareANoteStudenti").style.display = "none";
                } else { 
                        a.style.display = "none";                        
                } 
        } else {
                alert("Nu exista studenti!");
        }
        let i = 0; let bol = false;
        for(let x=1; x<=Student.count; x++) {
                if(document.getElementById("aNote"+x)==null) 
                {
                        i = x;
                        bol = true;
                        break;
                } else {
                        bol = false;
                }                
        }
        if((i<=Student.count)&&(bol==true)){ //adaugarea de n elemente pentru fiecare student
                for(i; i<=Student.count; i++){        
                        var div = document.querySelector('#aNote1');
                        var divClone = div.cloneNode(true);
                        divClone.id = 'aNote'+(i);
                        var inputNota = divClone.querySelector("#addNoteStudent1");
                        var butonNote = divClone.querySelector("#selAdaugareN1");
                        divClone.querySelector("label").innerHTML = "Student " + (i) +". Note:";
                        inputNota.id = "addNoteStudent"+(i);
                        butonNote.id = "selAdaugareN"+(i);
                        div.after(divClone);
                }
        }
        let p = 1;
        while(true){ //e loop infinit ca nu se stie numarul de div-uri care au fost clonate.
                let selectareDiv = document.getElementById('aNote'+ (Student.count + p));
                if(typeof(selectareDiv) != 'undefined' && selectareDiv != null){ //verificare existenta div-urilor care permit afisarea
                        selectareDiv.remove();
                        p++;
                } else {
                        break; //daca nu exista, se iese din loop
                }
        }
        //sortare
        var toSort = document.getElementById('sort1').children; //se selecteaza div-urile care sunt in interiorul div-ului cu id-ul sort
        toSort = Array.prototype.slice.call(toSort, 0); 
        toSort.sort(function(a, b) { //functia sort sorteaza crescator
                var aord = +a.id.slice(5,7); //se selecteaza ultima parte a id-ului (e o cifra si asa diferentiez div-urile)
                var bord = +b.id.slice(5,7);
                return (aord > bord) ? 1 : -1;}); //se pune conditia daca e mai mare, se returneaza 1, altfel -1
        var parent = document.getElementById('sort1'); //se selecteaza div-ul in care o sa fie introduse div-urile sortate
        parent.innerHTML = "";
        for(var f = 0, l = toSort.length; f < l; f++) {
                parent.appendChild(toSort[f]);
        }
}
function ActualizareNoteStud(event){ //meniu pentru actualizare note
        event.preventDefault();
        var a = document.getElementById("AfisareANoteStudenti");
        if(Student.count>0) {
                if (a.style.display === "none") { 
                        a.style.display = "block";
                        document.getElementById("AfisareNoteStudenti").style.display = "none";
                } else { 
                        a.style.display = "none";
                } 
        } else {
                alert("Nu exista studenti!");
        }
        let i = 0; let bol = false;
        for(let x=1; x<=Student.count; x++) { //in caz ca se reapeleaza functia, sa nu creeze din nou inca un set de div-uri, se afla indexul de elemente existente
                if(document.getElementById("actNote"+x)==null)
                {
                        i = x;
                        bol = true;
                        break;
                } else {
                        bol = false;
                }                
        }
        if((i<=Student.count)&&(bol==true)){ //clonare
                for(i; i<=Student.count; i++){        
                        var div = document.querySelector('#actNote1');
                        var divClone = div.cloneNode(true);
                        divClone.id = 'actNote'+(i);
                        var inputANota = divClone.querySelector("#NoteAStudent1");
                        var butonNote = divClone.querySelector("#selActualizareN1");
                        divClone.querySelector("label").innerHTML = "Student " + (i) +". Note:";
                        inputANota.id = "NoteAStudent"+(i);
                        butonNote.id = "selActualizareN"+(i);
                        div.after(divClone);
                }
        }
        let p = 1;
        while(true){ //e loop infinit ca nu se stie numarul de div-uri care au fost clonate.
                let selectareDiv = document.getElementById('actNote'+ (Student.count + p));
                if(typeof(selectareDiv) != 'undefined' && selectareDiv != null){ //verificare existenta div-urilor care permit afisarea
                        console.log("saluuuut");
                        selectareDiv.remove();
                        p++;
                } else {
                        break; //daca nu exista, se iese din loop
                }
        }
        for(let j=0; j<Student.count; j++) {
                        document.getElementById("NoteAStudent"+(j+1)).value = Stud[j].afiseazaNotele(); //functie care introduce notele salvate in contentbox
                }
        //sortare
        var toSort = document.getElementById('sort2').children; //se selecteaza div-urile care sunt in interiorul div-ului cu id-ul sort
        toSort = Array.prototype.slice.call(toSort, 0); 
        toSort.sort(function(a, b) { //functia sort sorteaza crescator
                var aord = +a.id.slice(7,9); //se selecteaza ultima parte a id-ului (e o cifra si asa diferentiez div-urile)
                var bord = +b.id.slice(7,9);
                return (aord > bord) ? 1 : -1;}); //se pune conditia daca e mai mare, se returneaza 1, altfel -1
        var parent = document.getElementById('sort2'); //se selecteaza div-ul in care o sa fie introduse div-urile sortate
        parent.innerHTML = "";
        for(var f = 0, l = toSort.length; f < l; f++) {
                parent.appendChild(toSort[f]);
        }
}
function FstergereNota(event){ //functie care sterge nota dupa un index dat de user
        event.preventDefault();
        let idStudSN = parseInt(document.getElementById("idStudStergereNota").value); //idStudentStergereNota
        console.log("A fost eliminata nota: \"" + Stud[idStudSN-1].note[(parseInt(document.getElementById("pozNotaStud").value)-1)] + "\" de la Studentul " + idStudSN);
        Stud[idStudSN-1].note.splice(parseInt(document.getElementById("pozNotaStud").value)-1, 1); //Se elimina nota de la index-ul dat.| Note[Nota1, Nota2, Nota3] => splice(1,1) o sa elimine Nota2
        for(let j=0; j<Student.count; j++) {
                document.getElementById("NoteAStudent"+(j+1)).value = Stud[j].afiseazaNotele(); //update date
        }
}
function returnId(event,id){ //adaugare nota
        event.preventDefault();
        let idFinal = parseInt(id.slice(-1)); //se extrage id-ul butonului
        let notain = parseInt(document.querySelector('#addNoteStudent'+idFinal.toString()).value); //se introduce valoarea div-ului
        if((isNaN(notain))||(notain=='')||(notain==null)){
                alert("Nu se poate adauga o nota nula!");
        } else if(notain>10){
                alert("Nu se poate adauga o nota mai mare ca 10!")
                console.log("Nota 10 e nota maxima admisa!");
        } else {
                Stud[idFinal-1].adaugaNota(notain);
                alert("Nota " + notain +" a fost adaugata cu succes la studentul: " + idFinal + "." + Stud[idFinal-1].nume + " " + Stud[idFinal-1].prenume);
                document.querySelector('#addNoteStudent'+idFinal.toString()).value = "";
                //se apeleaza functia
        }
}
function returnId2(event, index){
        event.preventDefault();
        let idFinal1 = parseInt(index.slice(-1)); //id div
        let a = (document.querySelector('#NoteAStudent'+idFinal1.toString()).value); //salvare in a
        console.log("Note student primite din textbox:" + a);
        var notain = Array.from(a.split(/[,\s\\/~]/),Number); //transformare in cifre
        console.log(notain);
        for(let k = -1; k <= Stud[idFinal1-1].note.length; k++){ //se elimina toate notele
                Stud[idFinal1-1].note.pop();
        }
        for(let j = 0; j < notain.length; j++){
                if((isNaN(notain[j]))||(notain[j]=='')||(notain[j]==null)||(notain[j]>10)||(notain[j]<0)) { //verificare daca este un caracter interzis
                        if(notain[j]>10||notain[j]<0) { console.log("La actualizarea notelor a unui student, am dat de o nota incorecta: " + notain[j] + ". Nota respectiva a fost eliminata!"); alert("La actualizarea notelor a unui student, am dat de o nota incorecta: " + notain[j] + ". Nota respectiva a fost eliminata!");}
                        else{console.log("La actualizarea notelor a unui student, am dat de un caracter null:" + notain[j]);}
                } else if ((notain[j]!=0)&&(notain[j]<=10)&&(notain[j]>0)){
                        Stud[idFinal1-1].note.push(notain[j]);
                } else {
                                console.log("Nu ar trebui sa ajunga niciodata aici.");
                }
        } 
}
//sortAlfabetica(event) sortMedii(event) sortVarsta(event)
function sortAlfabetica(event){ //Sortare dupa prenume si dupa nume
        event.preventDefault();
        if(Student.count>1) {
                console.log("Sortez in ordinea alfabetica...");
                console.log("Sortez dupa prenume initial...\nSortez dupa nume....");
                for(let i=0; i<Student.count; i++) {
                        for(let j=i+1; j<Student.count; j++) {
                                if((Stud[j].prenume.slice(0,1).toLowerCase())<(Stud[i].prenume.slice(0,1).toLowerCase())){ //sortare prenume //to lower ca sa verifice "a" cu "a" si nu "a" cu "A" :)
                                        let aux = Stud[i];
                                        Stud[i] = Stud[j];
                                        Stud[j] = aux;
                                }
                                if((Stud[j].nume.slice(0,1).toLowerCase())<(Stud[i].nume.slice(0,1).toLowerCase())){ //sortare nume
                                        let aux = Stud[i];
                                        Stud[i] = Stud[j];
                                        Stud[j] = aux;
                                }
                        }
                }
                console.log("Sortarea s-a facut cu succes!\nRecalculez media...");
                afisareStudenti();
        } else if (Student.count==1){ 
                alert("Nu se poate face sortarea deoarece este doar un student salvat!");
                console.log("Ii salvat un stundent. Nu se poate face sortarea!");
        } else if (Student.count<1) {
                alert("Nu se poate face sortarea deoarece nu sunt studenti salvati!");
                console.log("Nu e nici un stundent salvat. Nu se poate face sortarea!");
                afisareMeniuAdaugareStudenti();
        }
}
let counterMedie = 0;
function sortMedii(event){
        event.preventDefault();
        if(Student.count>1) {
                console.log("Sortez dupa medii...\Calculez media si resortez!");
                for(let i=0; i<Student.count; i++) {
                                        if(((isNaN(Stud[i].calculeazaMedia()))||(Stud[i].calculeazaMedia()==null)||(Stud[i].calculeazaMedia()==''))&&(counterMedie<1))
                                        {
                                                Stud[i].note.push(0);
                                                counterMedie += 1;
                                        }
                        for(let j=i+1; j<Student.count; j++) {
                                if(((isNaN(Stud[j].calculeazaMedia())||(Stud[j].calculeazaMedia()==null)||(Stud[j].calculeazaMedia()=='')))&&(counterMedie<1)){
                                        Stud[j].note.push(0);
                                }
                                if((Stud[j].calculeazaMedia())>(Stud[i].calculeazaMedia())){ //sortare medii
                                        let aux = Stud[i];
                                        Stud[i] = Stud[j];
                                        Stud[j] = aux;
                                }
                        }
                } 
                console.log("Sortarea s-a facut cu succes!\nRecalculez media ca sa ma asigur ca e in ordine...");
                afisareStudenti();
        } else if (Student.count==1){ 
                alert("Nu se poate face sortarea deoarece este doar un student salvat!");
                console.log("Ii salvat un stundent. Nu se poate face sortarea!");
        } else if (Student.count<1){
                alert("Nu se poate face sortarea deoarece nu sunt studenti salvati!");
                console.log("Nu e nici un stundent salvat. Nu se poate face sortarea!");
                afisareMeniuAdaugareStudenti();
        }
}
function sortVarsta(event){
        event.preventDefault();
        if(Student.count>1) {
                console.log("Sortez dupa varsta...");
                for(let i=0; i<Student.count; i++) {
                        for(let j=i+1; j<Student.count; j++) {
                                if((Stud[j].afiseazaVarsta())>(Stud[i].afiseazaVarsta())){ //sortare varsta
                                        let aux = Stud[i];
                                        Stud[i] = Stud[j];
                                        Stud[j] = aux;
                                }
                        }
                }
                console.log("Sortarea s-a facut cu succes!\nRecalculez media...");
                afisareStudenti();
        } else if (Student.count==1){ 
                alert("Nu se poate face sortarea deoarece este doar un student salvat!");
                console.log("Ii salvat un stundent. Nu se poate face sortarea!");
        } else if (Student.count<1){
                alert("Nu se poate face sortarea deoarece nu sunt studenti salvati!");
                console.log("Nu e nici un stundent salvat. Nu se poate face sortarea!");
                afisareMeniuAdaugareStudenti();
        }
}
let ok = false;
function ex4Stil1() {
        if(ok==false) {        
                for(let i=0; i<=60; i++){
                        var Divs = document.getElementsByClassName("rainbow");
                        var cDiv = document.createElement('div');
                        cDiv.className = "rainbow";
                        Divs[i].appendChild(cDiv);
                }
                ok = true;//era pus ca sa nu refac div-urile. Dar, puteam sa fac o functie centrala care facea div-urile la pornire. Aiae
        }
        var curcubeu = document.getElementsByClassName("rainbow");
        setInterval(
                function () {
                        for(let j=0; j<curcubeu.length;j++) {
                                var randomColor = Math.floor(Math.random()*16777215).toString(16); //culoarea generata random luata de pe net. Incearca sa o refaci singur!
                                curcubeu[0].style.backgroundColor = "#"+randomColor;
                                for(let y = 0; y<1000; y++) {setTimeout(() => {curcubeu[j].style.backgroundColor = curcubeu[0].style.backgroundColor;}, 2000);} //ceva setari cu speranta ca fac schimbu' de culori mai fain
                        }
                },1000
        );
}
function ex4Stil2() {
        if(ok==false) {        
                for(let i=0; i<=60; i++){
                        var Divs = document.getElementsByClassName("rainbow");
                        var cDiv = document.createElement('div');
                        cDiv.className = "rainbow";
                        Divs[i].appendChild(cDiv);
                }
                ok = true;
        }
        var curcubeu = document.getElementsByClassName("rainbow");
        setInterval(
                function () {
                        for(let j=0; j<curcubeu.length;j++) {
                                var randomColor = Math.floor(Math.random()*16777215).toString(16); //culoarea generata luata de pe net. Incearca sa o refaci singur!
                                if(j%2 == 0) { curcubeu[j].style.backgroundColor = "#"+randomColor; }
                                if(j%3 == 0) { curcubeu[j].style.backgroundColor = curcubeu[j].style.backgroundColor; }
                        }
                },1000
        );
}
function ex4Stil3() {
        ex4Stil1(); setTimeout(ex4Stil2,300);
        return 0;
}