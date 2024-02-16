//https://en.wikipedia.org/wiki/Seven-segment_display

document.body.appendChild(Object.assign(document.createElement("h1"), { innerHTML: "This is a clock displayed in a 7segment display" }));

GUI();

function GUI (){
	let timer = 0;
	let switchC = 0;
	let saveState = 0;
	let runned = false;
	var mainDiv = document.createElement('div');
	document.body.appendChild(mainDiv);
	
	var canvas = document.createElement('canvas');
	canvas.width = 1050; canvas.height = 300; canvas.style.border = '1px solid #000';
	
	var ctx = canvas.getContext('2d');
	
	class sevenSeg {
		constructor() { this.distX = 0; 
			this.nr = 0; 
			this.w = 0;
			this.h = 0;
			this.spatiu = 0;
			this.spatiere = 0;
			this.state = false;
		}
		draw(nr, w, h, spatiu, spatiere) {
			this.initialState();
			this.nr = nr;
			this.w = w;
			this.h = h;
			this.spatiu = spatiu;
			this.spatiere = spatiere;
			this.initCanvas();
			ctx.clearRect(0,0,canvas.width, canvas.height);
			for(let i = 0; i < nr; i++) {
				ctx.beginPath();
				ctx.rect(w+spatiu+this.distX, 1, h, w); //A
				ctx.rect(h+w+2*spatiu+this.distX, w+spatiu, w, h); //B
				ctx.rect(h+w+2*spatiu+this.distX, 3*spatiu+h+2*w, w, h); //C
				ctx.rect(w+spatiu+this.distX, 4*spatiu+2*h+2*w, h, w); //D
				ctx.rect(1+this.distX, 2*w+3*spatiu+h, w, h); //E
				ctx.rect(1+this.distX, w+spatiu, w, h); //F
				ctx.rect(w+spatiu+this.distX, w+h+1+ 2* spatiu, h, w);//G		
				ctx.stroke();
				this.distX += w+spatiu+h+spatiu+w+spatiere;
			}
		}
		initialState(){
			this.distX = 0;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		}
		initCanvas(){
			canvas.height=3*this.w+2*this.h+4*this.spatiu+1;
			if(this.nr<2) {
				canvas.width = 2+2*this.w+this.h+2*this.spatiu;
			} else {
				canvas.width = this.nr*(2*this.w+this.h+2*this.spatiu + this.spatiere) -this.spatiere+2;
			}
		}
		lightUp(indexDisp, bit) {
			let x = () => {
				if(bit ==  0  || bit == 126) return 126;
				if(bit ==  1  || bit == 48 ) return  48;
				if(bit ==  2  || bit == 109) return 109;
				if(bit ==  3  || bit == 121) return 121;
				if(bit ==  4  || bit ==  51) return  51;
				if(bit ==  5  || bit ==  91) return  91;
				if(bit ==  6  || bit ==  95) return  95;
				if(bit ==  7  || bit == 112) return 112;
				if(bit ==  8  || bit == 127) return 127;
				if(bit ==  9  || bit == 123) return 123;
				if(bit == "A" || bit == "a") return 119;
				if(bit == "b" || bit == "B") return  31;
				if(bit == "C" || bit == "c") return  78;
				if(bit == "d" || bit == "D") return  61;
				if(bit == "E" || bit == "e") return  79;
				if(bit == "f" || bit == "F") return  71;
				let bytes = [];
				for (let c = 0; c < bit.length; c += 2){
					bytes.push(parseInt(bit.substr(c, 2), 16));
					//console.log(`hexa:${bit}, bit.length=${bit.length} , bit[${c}]=${parseInt(bit.substr(c,2),16)}`);
				}
				return bytes[1];
			}
			let n = x();
			this.distX = indexDisp * (this.w + this.spatiu + this.h + this.spatiu + this.w + this.spatiere);
			ctx.clearRect(this.w+this.spatiu+this.distX, 1, this.h, this.w);
			ctx.clearRect(this.h+this.w+2*this.spatiu+this.distX, this.w+this.spatiu, this.w, this.h);
			ctx.clearRect(this.h+this.w+2*this.spatiu+this.distX, 3*this.spatiu+this.h+2*this.w, this.w, this.h);
			ctx.clearRect(this.w+this.spatiu+this.distX, 4*this.spatiu+2*this.h+2*this.w, this.h, this.w);
			ctx.clearRect(1+this.distX, 2*this.w+3*this.spatiu+this.h, this.w, this.h);
			ctx.clearRect(1+this.distX, this.w+this.spatiu, this.w, this.h);
			ctx.clearRect(this.w+this.spatiu+this.distX, this.w+this.h+1+ 2* this.spatiu, this.h, this.w);

			ctx.rect(this.w+this.spatiu+this.distX, 1, this.h, this.w);
			ctx.rect(this.h+this.w+2*this.spatiu+this.distX, this.w+this.spatiu, this.w, this.h);
			ctx.rect(this.h+this.w+2*this.spatiu+this.distX, 3*this.spatiu+this.h+2*this.w, this.w, this.h);
			ctx.rect(this.w+this.spatiu+this.distX, 4*this.spatiu+2*this.h+2*this.w, this.h, this.w);
			ctx.rect(1+this.distX, 2*this.w+3*this.spatiu+this.h, this.w, this.h);
			ctx.rect(1+this.distX, this.w+this.spatiu, this.w, this.h);
			ctx.rect(this.w+this.spatiu+this.distX, this.w+this.h+1+ 2* this.spatiu, this.h, this.w);
			
			ctx.fillStyle = "#005ce6";	
			((n >> 6) & 1) ? ctx.fillRect(this.w+this.spatiu+this.distX, 1, this.h, this.w) : null; //A
			((n >> 5) & 1) ? ctx.fillRect(this.h+this.w+2*this.spatiu+this.distX, this.w+this.spatiu, this.w, this.h) : null; //B
			((n >> 4) & 1) ? ctx.fillRect(this.h+this.w+2*this.spatiu+this.distX, 3*this.spatiu+this.h+2*this.w, this.w, this.h) : null; //C
			((n >> 3) & 1) ? ctx.fillRect(this.w+this.spatiu+this.distX, 4*this.spatiu+2*this.h+2*this.w, this.h, this.w) : null; //D
			((n >> 2) & 1) ? ctx.fillRect(1+this.distX, 2*this.w+3*this.spatiu+this.h, this.w, this.h) : null; //E
			((n >> 1) & 1) ? ctx.fillRect(1+this.distX, this.w+this.spatiu, this.w, this.h) : null; //F
			((n >> 0) & 1) ? ctx.fillRect(this.w+this.spatiu+this.distX, this.w+this.h+1+ 2* this.spatiu, this.h, this.w) : null; //G
		}
		douaPuncte() {
			this.state = !this.state;
			let primulPunctX = Math.ceil(4*this.w + 2*this.h + 4*this.spatiu + this.spatiere + ((this.spatiere/2) - (this.w + 2 < this.spatiere ? this.w/2 : (this.spatiere - this.spatiu)/2)) + 0.5);
			
			let alDoilePunctX = Math.ceil(8*this.w + 4*this.h + 8*this.spatiu + 3*this.spatiere + ((this.spatiere/2) - (this.w + 2 < this.spatiere ? this.w/2 : (this.spatiere - this.spatiu)/2)) + 0.5);
			
			let punctSusY = Math.ceil(this.h/2+this.w/2 + this.spatiu);
			let punctJosY = Math.ceil(2*this.w + 3*this.spatiu + this.h + this.h/2 - this.w/2);
			
			let dimPunct = this.w + 2 < this.spatiere ? this.w : this.spatiere - this.spatiu;
			
			if(this.nr>2){if(this.state == true){
				if(switchC % 2 == 0) ctx.fillStyle = "darkred"; switchC++;
			
				ctx.fillRect(primulPunctX, punctSusY, dimPunct, dimPunct); 
				ctx.fillRect(primulPunctX, punctJosY, dimPunct, dimPunct);
				if(this.nr>4) {
					ctx.fillRect(alDoilePunctX, punctSusY, dimPunct, dimPunct);
					ctx.fillRect(alDoilePunctX, punctJosY, dimPunct, dimPunct);
				}
				ctx.fillStyle = "#005ce6";
			} else if (this.state == false) {
				ctx.clearRect(primulPunctX, punctSusY, dimPunct, dimPunct);
				ctx.clearRect(primulPunctX, punctJosY, dimPunct, dimPunct);
				if(this.nr>4){
					ctx.clearRect(alDoilePunctX, punctSusY, dimPunct, dimPunct);
					ctx.clearRect(alDoilePunctX, punctJosY, dimPunct, dimPunct);
				}
				ctx.fillStyle = "#005ce6";
			}
			//ctx.fillStyle = "#005ce6";
		}}
	}
	
	//draw(nr, w, h, spatiu, spatiere) {
	function initPage(val){
		if(val) mainDiv.innerHTML = '';
		mainDiv.appendChild(labelCheckClock);
		mainDiv.appendChild(checkboxClock);
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(nrSegmente);
		mainDiv.appendChild(inputSegmente);
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(labelW);
		mainDiv.appendChild(inputW);
		mainDiv.appendChild(valW);
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(labelH);
		mainDiv.appendChild(inputH);
		mainDiv.appendChild(valH);
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(labelS);
		mainDiv.appendChild(inputS);
		mainDiv.appendChild(valS);
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(labelSp);
		mainDiv.appendChild(inputSp);
		mainDiv.appendChild(valSp);
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(document.createElement("br"));
		mainDiv.appendChild(canvas);
	}
	let labelCheckClock = document.createElement("label");
	labelCheckClock.innerHTML = "Clock?:";
	mainDiv.appendChild(labelCheckClock);
	let checkboxClock = document.createElement("input");
	checkboxClock.type = "checkbox";
	checkboxClock.checked = true;
	checkboxClock.addEventListener("change", function() {
		if(this.checked){
			initPage(true);
			timer = setInterval(() => {
				Ora();
				segment.douaPuncte();
			}, 1000);
			document.getElementsByTagName("h1")[0].innerHTML="This is a clock displayed in a 7segment display";
			inputSegmente.value = "6";
			segment.draw(parseInt(inputSegmente.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
		} else {
			runned = false;
			initPage(true);
			clearInterval(timer); timer = null;
			segment.draw(parseInt(inputSegmente.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
			document.getElementsByTagName("h1")[0].innerHTML="Display numbers [0 -> 9] and letters [a - f] in a 7segment display";
			inputSegmente.min = "1";
			inputSegmente.max = "20";
			inputSegmente.step = "1";
			let labelSegSelector = document.createElement("label");
			let segSelector = document.createElement("select");
			let labelInputSelected = document.createElement("label");
			let segValue = document.createElement("select");
			let spatiu = document.createTextNode("\u00a0");
			let inputSpace = document.createElement("input");
			inputSpace.type = "text"; inputSpace.id = "inputSpace";
			for(let i = 0; i<parseInt(inputSegmente.value); i++){
				inputSpace.value += "0";
				if(!runned) { segment.lightUp(i,0)} if(i == parseInt(inputSegmente.value)-1){ runned = true; }
			}
			
			labelSegSelector.innerHTML = "Segment:";
			for(let i = 1; i<=parseInt(inputSegmente.value); i++) {
				var j = document.createElement("option");
				j.text = `Segment ${i}`;
				j.value = `${parseInt(i)}`;
				segSelector.add(j);
			}
			
			labelInputSelected.innerHTML ="Value:";
			for(let i = 0; i<=15; i++) {
				var j = document.createElement("option");
				if(i < 10){
					j.text = `${i}`;
					j.value = `${parseInt(i)}`;
					segValue.add(j);
				} else {
					if (i == 10) { j.text = `A`; j.value = `A`; segValue.add(j);}
					if (i == 11) { j.text = `b`; j.value = `B`; segValue.add(j);}
					if (i == 12) { j.text = `C`; j.value = `C`; segValue.add(j);}
					if (i == 13) { j.text = `d`; j.value = `D`; segValue.add(j);}
					if (i == 14) { j.text = `E`; j.value = `E`; segValue.add(j);}
					if (i == 15) { j.text = `F`; j.value = `F`; segValue.add(j);}
				}
			}
			
			inputSpace.type = "text"; inputSpace.maxLength = parseInt(inputSegmente.value);
			let insertPos = document.querySelectorAll('br')[6];
			insertPos.parentNode.insertBefore(labelSegSelector, insertPos);
			insertPos.parentNode.insertBefore(spatiu, insertPos);
			insertPos.parentNode.insertBefore(segSelector, insertPos);
			
			insertPos.parentNode.insertBefore(spatiu, insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			
			insertPos.parentNode.insertBefore(labelInputSelected,insertPos);
			insertPos.parentNode.insertBefore(spatiu, insertPos);
			insertPos.parentNode.insertBefore(segValue, insertPos);
			
			insertPos.parentNode.insertBefore(spatiu, insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			insertPos.parentNode.insertBefore(spatiu.cloneNode(),insertPos);
			
			insertPos.parentNode.insertBefore(inputSpace, insertPos);
			segSelector.addEventListener('change', function() {
				checkIndex(this.selectedIndex);
			});
			segValue.addEventListener('change', function() {
				checkValInput();
				inputSpace.value = inputSpace.value.substring(0, parseInt(segSelector.value.slice(-1))-1) + segValue.value + inputSpace.value.substring(parseInt(segSelector.value.slice(-1))-1 + 1);
				segment.lightUp(parseInt(segSelector.value.slice(-1))-1, parseInt(segValue.value).isInteger ? parseInt(segValue.value) : segValue.value);
			});
			inputSpace.addEventListener('keyup', function(event) {
				if (event.key === 'Backspace') return;
				checkValInput();
				for(let i = 0; i< parseInt(inputSegmente.value); i++){
					segment.lightUp(i, Number.isInteger(parseInt(inputSpace.value.slice(i,i+1))) ? parseInt(inputSpace.value.slice(i,i+1)) : inputSpace.value.slice(i,i+1));
					if(segSelector.selectedIndex == i) checkIndex(i);
				}
			});
			
			function checkIndex(i){
				const litereToNumere = {
					'A': 10, 'a':10, 'B': 11, 'b': 11, 'C': 12, 'c':12, 'D': 13, 'd': 13, 'E': 14, 'e': 14, 'F': 15, 'f':15
				};
				segValue.selectedIndex = isNaN(parseInt(inputSpace.value.slice(i, i+1))) ? litereToNumere[inputSpace.value.slice(i, i+1)] : parseInt(inputSpace.value.slice(i, i+1));
			}
			function checkValInput(){
				if (inputSpace.value.length < parseInt(inputSegmente.value)) { 
					for(let i = inputSpace.value.length; i<parseInt(inputSegmente.value); i++){
						inputSpace.value += "0";
					}
				}
			}
		}
	});
	mainDiv.appendChild(checkboxClock);
	
	mainDiv.appendChild(document.createElement("br"));
	
	let nrSegmente = document.createElement("label");
	nrSegmente.innerHTML = "7seg Display count:";
	mainDiv.appendChild(nrSegmente);
	let inputSegmente = document.createElement("input");
	inputSegmente.type ="number";
	inputSegmente.style.width = "2.6%";
	inputSegmente.min = "2";
	inputSegmente.max = "6";
	inputSegmente.step = "2";
	inputSegmente.value = "6";
	inputSegmente.addEventListener("input", function() {
		if(checkboxClock.checked) {
			var validValues = [2, 4, 6];
			var enteredValue = parseInt(this.value, 10);
			if (!isNaN(enteredValue) && validValues.includes(enteredValue)) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				segment.distX = 0;
				segment.draw(parseInt(this.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
			} else {
				this.value = 6;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				segment.distX = 0;
				segment.draw(parseInt(6),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
			}
		} else {
			document.getElementById("inputSpace").maxLength = parseInt(inputSegmente.value);
			segment.draw(parseInt(Math.floor(inputSegmente.value)),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
			zeroInitialize();
		}
	});
	inputSegmente.addEventListener("change", function() {
		if(checkboxClock.checked) {
			var validValues = [2, 4, 6];
			var enteredValue = parseInt(this.value, 10);
			if (!isNaN(enteredValue) && validValues.includes(enteredValue)) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				segment.distX = 0;
				segment.draw(parseInt(this.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
			} else {
				this.value = 6;
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				segment.distX = 0;
				segment.draw(parseInt(6),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
			}
		} else {
			document.getElementById("inputSpace").maxLength = parseInt(inputSegmente.value);
			segment.draw(parseInt(Math.floor(inputSegmente.value)),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
			zeroInitialize();
		}
	});
	function zeroInitialize(){
		runned = false;
			for(let i = 0; i<parseInt(inputSegmente.value); i++){
				if(!runned) { segment.lightUp(i,inputSpace.value.slice(i, i+1));} if(i == parseInt(inputSegmente.value)-1){ runned = true; }
			}
			inputSpace.value.length>parseInt(inputSegmente.value) ? inputSpace.value = inputSpace.value.slice(0, parseInt(inputSegmente.value)) : 
			inputSpace.value.length<parseInt(inputSegmente.value) ? (()=>{for(let i = inputSpace.value;i<parseInt(inputSegmente.value);i++) inputSpace.value += "0"})():null;
	}
	mainDiv.appendChild(inputSegmente);
	mainDiv.appendChild(document.createElement("br"));
	
	let labelW = document.createElement("label");
	labelW.innerHTML = "Segment element width:";
	mainDiv.appendChild(labelW);
	let inputW = document.createElement("input");
	inputW.type ="range";
	inputW.min = "2";
	inputW.max = "50";
	inputW.value = "15";
	inputW.addEventListener("input", function() {
		valW.value = this.value;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		segment.distX = 0;
		segment.draw(parseInt(inputSegmente.value),parseInt(this.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
		if(!checkboxClock.checked) zeroInitialize();
	});
	mainDiv.appendChild(inputW);
	let valW = document.createElement("input");
	valW.type = "text";
	valW.readOnly = true;
	valW.value = inputW.value;
	valW.style.width = "1.3%";
	mainDiv.appendChild(valW);
	mainDiv.appendChild(document.createElement("br"));
	
	let labelH = document.createElement("label");
	labelH.innerHTML = "Segment element height:";
	mainDiv.appendChild(labelH);
	let inputH = document.createElement("input");
	inputH.type ="range";
	inputH.min = "10";
	inputH.max = "250";
	inputH.value = "130";
	inputH.addEventListener("input", function() {
		valH.value = this.value;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		segment.distX = 0;
		segment.draw(parseInt(inputSegmente.value),parseInt(inputW.value),parseInt(this.value), parseInt(inputS.value), parseInt(inputSp.value));
		if(!checkboxClock.checked) zeroInitialize();
	});
	mainDiv.appendChild(inputH);
	let valH = document.createElement("input");
	valH.type = "text";
	valH.readOnly = true;
	valH.value = inputH.value;
	valH.style.width = "1.5%";
	mainDiv.appendChild(valH);
	mainDiv.appendChild(document.createElement("br"));
	
	let labelS = document.createElement("label");
	labelS.innerHTML = "Space between elements:";
	mainDiv.appendChild(labelS);
	let inputS = document.createElement("input");
	inputS.type ="range";
	inputS.min = "0";
	inputS.max = "30";
	inputS.value = "2";
	inputS.addEventListener("input", function() {
		valS.value = this.value;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		segment.distX = 0;
		segment.draw(parseInt(inputSegmente.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(this.value), parseInt(inputSp.value));
		if(!checkboxClock.checked) zeroInitialize();
	});
	mainDiv.appendChild(inputS);
	let valS = document.createElement("input");
	valS.type = "text";
	valS.readOnly = true;
	valS.value = inputS.value;
	valS.style.width = "1.3%";
	mainDiv.appendChild(valS);
	mainDiv.appendChild(document.createElement("br"));
	
	let labelSp = document.createElement("label");
	labelSp.innerHTML = "Space between segments:";
	mainDiv.appendChild(labelSp);
	let inputSp = document.createElement("input");
	inputSp.type ="range";
	inputSp.min = "1";
	inputSp.max = "200";
	inputSp.value = "30";
	inputSp.addEventListener("input", function() {
		valSp.value = this.value;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		segment.distX = 0;
		segment.draw(parseInt(inputSegmente.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(this.value));
		if(!checkboxClock.checked) zeroInitialize();
	});
	mainDiv.appendChild(inputSp);
	let valSp = document.createElement("input");
	valSp.type = "text";
	valSp.readOnly = true;
	valSp.value = inputSp.value;
	valSp.style.width = "1.3%";
	mainDiv.appendChild(valSp);
	
	
	mainDiv.appendChild(document.createElement("br"));
	mainDiv.appendChild(document.createElement("br"));
	mainDiv.appendChild(document.createElement("br"));
	mainDiv.appendChild(canvas);
	
	let segment = new sevenSeg;
	
	segment.draw(parseInt(inputSegmente.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value));
	
	timer = setInterval(() => {
				Ora();
				segment.douaPuncte();
			}, 1000);
	
	function Ora(){
		Date.prototype.timeNow = function () {
			return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
		
		}
		var newDate = new Date().timeNow();
		console.log(`${newDate[0]}${newDate[1]}${newDate[2]}${newDate[3]}${newDate[4]}`);
		//for(let i=0; i<parseInt(inputSegmente.value); i++){
			segment.draw(parseInt(inputSegmente.value),parseInt(inputW.value),parseInt(inputH.value), parseInt(inputS.value), parseInt(inputSp.value))
			segment.lightUp(0, newDate[0]);
			segment.lightUp(1, newDate[1]);
			if(parseInt(inputSegmente.value)>2){
				segment.lightUp(2, newDate[3]);
				segment.lightUp(3, newDate[4]);
			}
			if(parseInt(inputSegmente.value)>4) {
				segment.lightUp(4, newDate[6]);
				segment.lightUp(5, newDate[7]); 
			}
		//}
	}
}