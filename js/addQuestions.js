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

}


function createMC() {

}

function createTrueFalse() {

}
