### EN:
The reason behind creating this WEB page is related to a laboratory theme within the university, for the course: Web Technologies and Databases[^1].

A quick overview of the page: [JSFiddle](https://jsfiddle.net/amicull/24j69ysf/24/) . However, the page is not fully responsive (not at all, in fact), so I recommend running it on a full-HD resolution.

The only part of the page that is worth analyzing and seeing, in my opinion, is Exercise 5, which is displayed by pressing the Ex5 button. The js file („[ex5.js](https://github.com/AmicuLL/html-js/blob/main/Lab10/ex5.js)”) generates a randomly sized maze of n rows and n columns, where n is given by the user. The maze is generated recursively2, providing at least one solution for its resolution.

Solving the maze involves dragging an image, which in this case is the logo of my university[^3], between its walls (the walls are borders on divs), and if the edge of the image enters a perimeter of a few pixels, the "drag" function is interrupted. Work still needs to be done on detecting the edges of the image so that we can count how many collisions have occurred with the walls of the maze and to prevent it from passing through the wall. Therefore, I have implemented a fairly robust solution to this aspect.

Consequently, the file: [Lab10_TWBD.pdf](https://github.com/AmicuLL/projects/blob/main/Lab10/Lab10_TWBD.pdf) lists all the functions of the page.




### RO:
Motivul care a stat în spatele creării acestei pagini WEB este dat de tema de laborator din cadrul facultății, pentru materia: Tehnologii WEB si Baze de Date[^1].

Un quick-view la pagină: [JSFiddle](https://jsfiddle.net/amicull/24j69ysf/24/) . Totuși, pagina nu este full-responsive (mai deloc chiar), prin urmare recomand rularea ei pe o rezoluție full-hd.

Singura parte din pagină care merită analizată și să fie văzută, după părerea mea, este Exercițiul 5, care se afișează prin apăsarea butonului Ex5. Fișierul js („[ex5.js](https://github.com/AmicuLL/html-js/blob/main/Lab10/ex5.js)”) generează un labirint aleator de n linii și n coloane, n fiind dat de către utilizator. Labirintul este generat recursiv[^2], oferind cel puțin o soluție pentru rezolvarea lui. 

Rezolvarea labirintului presupune târârea a unei poze, care în acest fapt este logo-ul universității mele[^3], între pereții lui (pereții sunt niște bordere la div-uri) și dacă marginea pozei intră într-un perimetru de câțiva pixeli, se întrerupe funcția „drag”. Trebuie lucrat încă la detecția marginilor a imaginii, ca să putem contoriza de căte ori s-a făcut coliziune cu pereții labirintului și ca să nu treacă prin perete. Așadar, am făcut o implementare destul de robustă la acest aspect.

Prin urmare, fișierul: [Lab10_TWBD.pdf](https://github.com/AmicuLL/projects/blob/main/Lab10/Lab10_TWBD.pdf) are enumerate toate funcțiile paginii.

[^1]: [TWBD UTCN](https://etti.utcluj.ro/files/Acasa/Site/FiseDisciplina/TstRo/35.pdf)
[^2]: [Wikipedia](https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation)
[^3]: [Logo](https://doctorat.utcluj.ro/images/logo_site.png)
