function createShortAnswer() {
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
    input.type = "text";
    input.name = "shortAnswer";
    input.placeholder = "Insert Text for Short Answer";
    input.required = true;
    container.appendChild(input);

	// Delete question button
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "DELETE";
	btn.type = "button";
	// btn.onclick = deleteQuestion();
	container.appendChild(btn);
	container.appendChild(breakElem);

    return false;
}

function createLongAnswer() {
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
	input.type = "text";
	input.name = "longAnswer";
	input.placeholder = "Insert Text for Long Answer";
	input.required = true;
	container.appendChild(input);
	
	// Delete question button
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "DELETE";
	container.appendChild(btn);
	btn.type = "button";
	// btn.onclick = deleteQuestion();
	container.appendChild(breakElem);
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
	
	// Delete question button
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "DELETE";
	btn.type = "button";
	// btn.onclick = deleteQuestion();
	container.appendChild(btn);
	// btn.onclick(deleteQuestion);

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

	// Delete question button
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "DELETE";
	btn.type = "button";
	// btn.onclick = deleteQuestion();
	container.appendChild(btn);
	// btn.onclick(deleteQuestion);
    container.appendChild(breakElem);
}

function createRanking(){
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
    input.type = "text";
    input.name = "Ranking";
    input.placeholder = "Insert Ranking Question";
    input.required = true;
    container.appendChild(input);
    

    var options = document.createElement("input");
    options.type = "text";
    options.name = "rankingOptions"
    options.placeholder = "enter options as semi-colon-separated list etc: op1; op2; op3";
    options.required = true;
	container.appendChild(options);
	
	// Delete question button
	var btn = document.createElement("BUTTON");
	btn.innerHTML = "DELETE";
	btn.type = "button";
	// btn.onclick = deleteQuestion();
	container.appendChild(btn);
	// btn.onclick(deleteQuestion);

    container.appendChild(breakElem);
    
    return false;
}

function makeMatch(){
	var container = document.getElementById("matching");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
    input.type = "text";
    input.name = "match1";
    input.placeholder = "Insert Match";
    input.required = true;
    container.appendChild(input);
    

    var option = document.createElement("input");
    option.type = "text";
    option.name = "matchPair"
    option.placeholder = "enter match pair";
    option.required = true;
	container.appendChild(option);

}

function createMatching(){
	// will need a 2 div elements: For question and add matches
	var container = document.getElementById("addedQuestions");
	var input = document.createElement("input");
	var breakElem = document.createElement("br");
	var divElem1 = document.createElement("div");
	// var divElem2 = document.createElement("div");
	var addMatch = document.createElement("BUTTON");
	var deleteMatch = document.createElement("BUTTON");

	divElem1.id = "matching";
	container.appendChild(divElem1);
	container = document.getElementById("matching");

    input.type = "text";
	input.name = "Matching";
	input.placeholder = "Insert Question Prompt";
	input.required = true;
    container.appendChild(input);

	container.appendChild(breakElem);
	addMatch.innerHTML = "Add Match";
	addMatch.type = "button";
	deleteMatch.innerHTML = "Delete Match";
	deleteMatch.type = "button";
	container.appendChild(addMatch);
	addMatch.onclick = makeMatch();
	container.appendChild(divElem1);

	// var optionA = document.createElement("input");
    // options.type = "text";
    // options.name = "matchingOptions"
    // options.placeholder = "enter option";
	// options.required = true;
	
	// var optionB = document.createElement("input");
    // options.type = "text";
    // options.name = "matchingOptions"
    // options.placeholder = "enter option";
	// options.required = true; 

	// container.appendChild(optionA);
	// container.appendChild(optionB);
	
	container.appendChild(breakElem);

	container.appendChild(addMatch);
	
	// addMatch.onclick = makeMatch();

	container.appendChild(breakElem);

	container.appendChild(deleteMatch);


}