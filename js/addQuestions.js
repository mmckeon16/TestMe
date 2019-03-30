function createShortAnswer() {
		var container = document.getElementById("shortAnswer");
		var input = document.createElement("input");
        input.type = "text";
        console.log("we are in the method");
        return false;
}

function createLongAnswer() {
		var question = document.getElementById("longAnswer");
		var input = document.createElement("input");
		input.type = "text";
		question.appendChild(input);
		// question.appendChild(break);
	
		// Delete question button
		var btn = document.createElement("BUTTON");
		btn.innerHTML = "DELETE";
		document.body.appendChild(btn);

}


function createMC() {

}

function createTrueFalse() {

}
