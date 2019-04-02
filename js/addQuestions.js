function createShortAnswer() {
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
    input.type = "text";
    input.name = "shortAnswer";
    input.placeholder = "Insert Text for Short Answer";
    input.required = true;
    container.appendChild(input);
    container.appendChild(breakElem);

    return false;
}

function createLongAnswer() {
	var question = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakEl = document.createElement("br");
	input.type = "text";
	input.name = "longAnswer";
	input.placeholder = "Insert Text for Long Answer";
	input.required = true;
	question.appendChild(input);
	
	// Delete question button
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "DELETE";
	document.body.appendChild(btn);
		// return false;

}


function createMC() {
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
    input.type = "text";
    input.name = "multipleChoice";
    input.placeholder = "Insert Multiple Choice Question";
    input.required = true;
    container.appendChild(input);
    

    var options = document.createElement("input");
    options.type = "text";
    options.name = "mcOptions"
    options.placeholder = "enter options as semi-colon-separated list etc: op1; op2; op3";
    options.required = true;
    container.appendChild(options);
    container.appendChild(breakElem);
    
    return false;
}

function createTrueFalse() {
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
    input.type = "text";
    input.name = "trueFalse";
    input.placeholder = "Insert True False Question";
    input.required = true;
    container.appendChild(input);
    container.appendChild(breakElem);
}
