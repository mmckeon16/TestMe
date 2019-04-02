module.exports = {
	createQuestions: function(body) {
		var questions = [];

		//get short answer
		var shortAnswers = body.shortAnswer;
		questions = makeQuestions(questions, shortAnswers, "shortAnswer");

		//get long answer
		var longAnswers = body.longAnswers;
		questions = makeQuestions(questions, longAnswers, "longAnswer");

		//get mc
		var multipleChoiceQuestions = body.multipleChoice;
		var mcOptions = body.mcOptions;
		questions = makeMC(quest)

		//get tf
		var trueFalseQuestions = body.TrueFalse;
		questions = makeQuestions(questions, trueFalseQuestions, "trueFalse");

		console.log(questions);
	}
}

function makeQuestions(questions, questionsToAdd, questionType) {
	if(questionsToAdd == null) {
		return;
	}
	var type = "";
	if(questionType.localeCompare("shortAnswer") == 0) { //short answer
		type = "shortAnswer";
	} else if (questionType.localeCompare("longAnswer") == 0) {
		type = "longAnswer";
	} else if (questionType.localeCompare("multipleChoice") == 0) {
		type = "multipleChoice";
	} else if (questionType.localeCompare("trueFalse") == 0) {
		type = "trueFalse";
	} else {
		throw new error("incorrect formatting");
	}

	var newQuestions = questions;
	var index = 0;
	for (index; index < questionsToAdd.length; index += 1) {
		newQuestions.push({"type": type, "answer": "", "question": questionsToAdd[index]})
	}

	return newQuestions;
	
}

function makeMC(questions, mcQuestions, mcOptions) {

	if(mcQuestions == null) {
		return;
	}
	var newQuestions = questions;
	var index = 0;
	for (index; index < mcQuestions.length; index += 1) {
		optionsObj = mcOptions.split(";");
		newQuestions.push({"type": "multipleChoice", "answer": "", "question": mcQuestions[index], "options": optionsObj});
	}

	return newQuestions;
}