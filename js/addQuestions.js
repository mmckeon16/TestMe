function createShortAnswer() {
		var container = document.getElementById("addedQuestions");
		var input = document.createElement("input");
		var breakElem = document.createElement("br");
        input.type = "text";
        input.placeholder = "Insert Text for Short Answer";
        container.appendChild(input);
        container.appendChild(breakElem);
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
