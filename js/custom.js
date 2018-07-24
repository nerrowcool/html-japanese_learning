var total = 0;
var character = new Array();
var loops = new Array();
var count = 0;
var interval;

function make_thead(){
	document.write(
		'<tr>'+
			'<td colspan="2">'+
				'a(あ)行'+
			'</td>'+
			'<td colspan="2">'+
				'k(か)行'+
			'</td>'+
			'<td colspan="2">'+
				's(さ)行'+
			'</td>'+
			'<td colspan="2">'+
				't(た)行'+
			'</td>'+
			'<td colspan="2">'+
				'n(な)行'+
			'</td>'+
			'<td colspan="2">'+
				'h(は)行'+
			'</td>'+
			'<td colspan="2">'+
				'm(ま)行'+
			'</td>'+
			'<td colspan="2">'+
				'y(や)行'+
			'</td>'+
			'<td colspan="2">'+
				'w(わ)行'+
			'</td>'+
			'<td colspan="2">'+
				'r(ら)行'+
			'</td>'+
			'<td colspan="2">'+
				'撥音'+
			'</td>'+
		'</tr>'
	);
}
function make_hiragana_tbody(){
	var r;
	// produce rows
	for(r = 0; r < 5; r++){
		document.write("<tr>");
		var c;
		// produce columns
		for(c = 0; c < 10; c++){
			// save sound
			var sound = new Array();
			switch (c){
				case 0:
					sound.push('a');
					break;
				case 1:
					sound.push('k');
					break;
				case 2:
					sound.push('s');
					break;
				case 3:
					sound.push('t');
					break;
				case 4:
					sound.push('n');
					break;
				case 5:
					sound.push('h');
					break;
				case 6:
					sound.push('m');
					break;
				case 7:
					sound.push('y');
					break;
				case 8:
					sound.push('r');
					break;
				case 9:
					sound.push('w');
					break;
			}
			switch (r){
				case 0:
					sound.push('a');
					break;
				case 1:
					sound.push('i');
					break;
				case 2:
					sound.push('u');
					break;
				case 3:
					sound.push('e');
					break;
				case 4:
					sound.push('o');
					break;
			}

			// special case
			if(sound[0] == 's' && sound[1] == 'i'){
				sound[0] = 'sh';
			}
			if(sound[0] == 't'){
				switch (sound[1]){
					case 'i':
						sound[0] = 'ch'
						break;
					case 'u':
						sound[1] = 'su'
						break;
				}
			}
			if(sound[0] == 'h' && sound[1] == 'u'){
				sound[0] = 'f';
			}

			// save romaji
			var romaji;
			if(c == 0) {
				romaji = sound[1];
			} else {
				romaji = sound[0]+sound[1];
			}
			// save kana
			var kana = wanakana.toKana(romaji)[0];
			if(romaji == 'yi' || romaji == 'ye' || romaji == 'wi' || romaji == 'wu' || romaji == 'we'){
				document.write("<td class='pronounce' colspan='2'></td>");
			} else {
				document.write("<td id='" + r + c + "' class='pronounce'>"+romaji+"</td>");
				document.write("<td class='voice'><img src='../../image/hiragana/voiceless/"+sound[0]+sound[1]+".png' onclick='responsiveVoice.speak(\""+kana+"\", \"Japanese Female\", {volume: 1.5, rate: 0.55})'></td>");
			}
		}
		// add 'n' sound in first row
		if(r == 0){
			document.write("<td class='pronounce'>n</td>");
			document.write("<td class='voice'><img src='../../image/hiragana/voiceless/n.png' onclick='responsiveVoice.speak(\"ん\", \"Japanese Female\", {volume: 1.5, rate: 0.55})'></td>");
		}
		document.write("</tr>");
	}
}

function save_character(is_vertical){
	if(is_vertical == true){
		var r_max = 10;
		var c_max = 5;
	} else {
		var r_max = 5;
		var c_max = 10;
	}
	for(var r = 0; r < r_max; r++){
		var r_string = r.toString();
		for(var c = 0; c < c_max; c++){
			var c_string = c.toString();
			if(is_vertical == true){
				var key = c_string + r_string;
			} else {
				var key = r_string + c_string;
			}
			if(document.getElementById(key)!= null){
				character[total] = document.getElementById(key).textContent;
				total++;
			}
		}
	}
}

function get_loops(is_random){
	if(is_random == "TRUE"){
		save_character(false);
		for(var i = 0; i < parseInt(document.getElementById("loops").value); i++){
			loops[i] = Math.floor((Math.random()*100)*(total/99));
			if(i != 0){
				while(loops[i-1] == loops[i]){
					loops[i] = Math.floor((Math.random()*100)*(total/99));
				}
			}
		}
		return loops;
	} else {
		save_character(true);
		loops = character;
		return loops;
	}
}

function start_pronounce(){
	is_random = document.querySelector('input[name=is_random]:checked').value;
	loops = get_loops(is_random);
	count = 0;
	if(is_random == "TRUE"){
		interval = setInterval(function(){
				if(count < loops.length){
					responsiveVoice.speak(wanakana.toKana(character[loops[count++]]), "Japanese Female", {volume: 1.5, rate: 0.55});
				}
			}, parseInt(document.getElementById("time_ms").value)*1000
		);
	} else {
		interval = setInterval(function(){
				if(count < loops.length){
					responsiveVoice.speak(wanakana.toKana(loops[count++]), "Japanese Female", {volume: 1.5, rate: 0.55});
				}
			}, parseInt(document.getElementById("time_ms").value)*1000
		);
	}
}

function stop_pronounce(){
	clearInterval(interval);
}
