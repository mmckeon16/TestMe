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
		var breakEl = document.createElement("br");
		input.type = "text";
		question.appendChild(input);
		question.appendChild(breakEl);
	
		// Delete question button
		var btn = document.createElement("BUTTON");
		btn.innerHTML = "DELETE";
		document.body.appendChild(btn);
		// return false;

}


function createMC() {

}

function createTrueFalse() {

}
