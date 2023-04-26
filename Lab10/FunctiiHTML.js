//Variabile pe care le folosesc in script-uri
var functieEx1 = false; //variabile ca sa apelez functia dorita
var functieEx1Prim = false;
var functieEx1Secund = false;

function StergereElemente(id){ //ca sa nu se trebuiasca sa dau refresh la pagina...
    if(id!=1) {
        try {
            //ex1
            functieEx1Secund = false;
            functieEx1Prim = false;
            functieEx1 = false;
            document.getElementById("divex1").remove(); //div-uri ex1
        } catch (e) {}
    }
    try{
        //ex2
        document.querySelectorAll('.divEx3').forEach(e => e.remove()); //se sterg div-urile pt ex3
    } catch (e){}
    try{
        //ex3
        document.querySelectorAll('.divEx2').forEach(e => e.remove()); //sunt sterse toate div-urile si header-ele de la ex2
        document.querySelectorAll('.divEx2H2').forEach(e => e.remove());
        document.getElementById("InfoTextEx3").remove();
    } catch (e){}
    try{
        //ex4
        document.querySelectorAll('.divEx4').forEach(e => e.remove()); //se sterg div-urile pt ex4
        document.getElementById("cronometru").remove();
        document.getElementById("textArea").remove();
    } catch (e){}
    try{
        //ex5
        //document.getElementById("").remove();
        /*document.getElementById("divButoaneInfoText").remove();
        document.getElementById("ButonPauza").remove();
        document.getElementById("ButonRestart").remove();
        document.getElementById("infoText").remove();
        document.getElementById("start").remove();
        document.getElementById("sfarsit").remove();
        document.getElementById("logoUTCN").remove();
        document.getElementById("wrapper").remove();
        document.getElementById("cron").remove();
        for(var i = 0; i<n; i++){
            for(var j = 0; j<n; j++) {
                console.log("Salut!");
                document.getElementById("lab" + i + "" + j).remove();
            }
        }*/
        const myNode = document.getElementById("content");
        while (myNode.lastElementChild) {
            myNode.removeChild(myNode.lastElementChild);
        }
    } catch (e){}

    try{
        //ex6
        clearInterval(afisOra);
        document.getElementById("afisareOra").remove();
    } catch (e){}
    try{
        //ex7
        document.getElementById("host").remove();
        document.getElementById("hostname").remove();
        document.getElementById("href").remove();
        document.getElementById("pathname").remove();
        document.getElementById("port").remove();
        document.getElementById("protocol").remove();
        document.getElementById("SO").remove();
        document.getElementById("Browser").remove();
    } catch (e){}
}



function CascadaButoane() {
    document.getElementById("butoaneCascada").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.ButCascada')) {
        var dropdowns = document.getElementsByClassName("CascadaC");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}