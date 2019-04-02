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
	var question = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakEl = document.createElement("br");
	input.type = "text";
	input.placeholder = "Insert Text for Long Answer";
	question.appendChild(input);
	

	// Delete question button
	var btn = document.createElement("button");
	btn.innerHTML = "DELETE";
	btn.type = "button";
	document.body.appendChild(btn);
	question.appendChild(breakEl);

	return false;

}


function createMC() {
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
    input.type = "text";
    input.placeholder = "Insert Multiple Choice Question";
    container.appendChild(input);

    var options = document.createElement("input");
    options.type = "text";
    input.placeholder = "enter options as comma-separated list: op1, op2, op3...";
    container.appendChild(options);
    container.appendChild(breakElem);
    return false;
}

function createTrueFalse() {

}
