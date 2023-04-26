/*Dezvoltați o pagină web cu facilități JavaScript care detectează și afișează caracteristicile:
- host
- hostname
- href
- pathname
- port
- protocol
specifice paginii curente. Să se afișeze numele browserului care a servit la încărcarea paginii.*/

var creatDivs = false;
//////DE CE N-AM FOLOSIT O CLASA?!?!?!?!!?!!
function GenerareDivs(){
    if(creatDivs === false) {
        let parinte = document.getElementById("content");
        let host = document.createElement("h2");
        host.style.height = "auto";
        host.style.margin = "20px";
        host.style.color = "#6619A4";
        host.style.fontFamily = "Akaya Kanadaka";
        host.setAttribute("id", "host")
        let hostname = document.createElement("h2")
        hostname.style.height = "auto";
        hostname.style.margin = "20px";
        hostname.style.color = "#6619A4";
        hostname.style.fontFamily = "Akaya Kanadaka";
        hostname.setAttribute("id", "hostname")
        let href = document.createElement("h2");
        href.style.height = "auto";
        href.style.margin = "20px";
        href.style.color = "#86EDA3";
        href.style.fontFamily = "Akaya Kanadaka";
        href.setAttribute("id", "href")
        let pathname = document.createElement("h2");
        pathname.style.height = "auto";
        pathname.style.margin = "20px";
        pathname.style.color = "#86EDA3";
        pathname.style.fontFamily = "Akaya Kanadaka";
        pathname.setAttribute("id", "pathname")
        let port = document.createElement("h2");
        port.style.height = "auto";
        port.style.margin = "20px";
        port.style.color = "#F13A4B";
        port.style.fontFamily = "Akaya Kanadaka";
        port.setAttribute("id", "port")
        let protocol = document.createElement("h2");
        protocol.style.height = "auto";
        protocol.style.margin = "20px";
        protocol.style.color = "#F13A4B";
        protocol.style.fontFamily = "Akaya Kanadaka";
        protocol.setAttribute("id", "protocol")
        let SO = document.createElement("h2");
        SO.style.height = "auto";
        SO.style.margin = "20px";
        SO.style.color = "#40DE24";
        SO.style.fontFamily = "Akaya Kanadaka";
        SO.setAttribute("id", "SO")
        let Browser = document.createElement("h2");
        Browser.style.height = "auto";
        Browser.style.margin = "20px";
        Browser.style.color = "#40DE24";
        Browser.style.fontFamily = "Akaya Kanadaka";
        Browser.setAttribute("id", "Browser")
        parinte.appendChild(host);
        parinte.appendChild(hostname);
        parinte.appendChild(href);
        parinte.appendChild(pathname);
        parinte.appendChild(port);
        parinte.appendChild(protocol);
        parinte.appendChild(SO);
        parinte.appendChild(Browser);

        host.textContent = "HOST: " + location.host;
        hostname.textContent = "HOST NAME: " + location.hostname;
        href.textContent = "HREF: " + location.href;
        pathname.textContent = "PATHNAME: " + location.pathname;
        port.textContent = "PORT: " + location.port;
        protocol.textContent = "PROTOCOL: " + location.protocol;
        SO.textContent = "Sistem de Operare: " + DetectareSO();
        Browser.textContent = "Navigatorul de pe care s-a incarcat site-ul: " + DetectareBrowser();
    }
}
function DetectareBrowser(){

    var browserName  = navigator.appName;
    var nAgt = navigator.userAgent;

    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
        browserName = "Opera";
    } else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
    } else if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = "Opera";
    } else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
    } else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
    } else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
    } else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
        browserName = nAgt.substring(nameOffset,verOffset);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    return browserName;
}
function DetectareSO() {
    var SistemDeOperare = "Nedetectat";
    if (navigator.appVersion.indexOf("Win") != -1) {
        SistemDeOperare = "Windows";
    }
    if (navigator.appVersion.indexOf("Mac") != -1) {
        SistemDeOperare = "MacOS";
    }
    if (navigator.appVersion.indexOf("Linux") != -1) {
        SistemDeOperare = "Linux";
    }
    return SistemDeOperare;
}

function Ex7(){
    StergereElemente(7);
    GenerareDivs();
}