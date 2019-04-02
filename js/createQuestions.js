module.exports = {
	createQuestions: function(body) {
		var questions = [];

		//TODO if anything undefined then pls done call function to add bc just makes it all undefined

		//get short answer
		var shortAnswers = body.shortAnswer;
		if(typeof shortAnswers != 'undefined') {
			questions = makeQuestions(questions, shortAnswers, "shortAnswer");
		}
		


		//get long answer
		var longAnswers = body.longAnswer;
		if(typeof longAnswers != 'undefined') {
			questions = makeQuestions(questions, longAnswers, "longAnswer");
		}

		

		//get mc
		var multipleChoiceQuestions = body.multipleChoice;
		var mcOptions = body.mcOptions;
		if(typeof multipleChoiceQuestions != 'undefined') {
			questions = makeMC(questions, multipleChoiceQuestions, mcOptions);
		}

		//get tf
		var trueFalseQuestions = body.trueFalse;
		if(typeof trueFalseQuestions != 'undefined') {
			questions = makeQuestions(questions, trueFalseQuestions, "trueFalse");
		}

		console.log(questions);
	}
}

function makeQuestions(questions, questionsToAdd, questionType) {
	console.log(questionType + "in make q;s function: "+questionsToAdd);

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

	if(typeof questionsToAdd === 'string') {
		//TODO check if long answer is getting here????
		//then only one to add
		newQuestions.push({"type": type, "answer": "", "question": questionsToAdd});
	} else {
		for (index; index < questionsToAdd.length; index += 1) {
		newQuestions.push({"type": type, "answer": "", "question": questionsToAdd[index]});
	}
	}
	

	return newQuestions;
	
}

function makeMC(questions, mcQuestions, mcOptions) {

	if(mcQuestions == null) {
		return;
	}
	console.log("in mc : " + questions);
	var newQuestions = questions;

	var index = 0;

	if(typeof mcQuestions  === 'string') {
		//then only one to add
		optionsObj = mcOptions.split(";");
		console.log(optionsObj);
		newQuestions.push({"type": "multipleChoice", "answer": "", "question": mcQuestions, "options": optionsObj});
	} else {
		for (index; index < mcQuestions.length; index += 1) {
			optionsObj = mcOptions[index].split(";");
			newQuestions.push({"type": "multipleChoice", "answer": "", "question": mcQuestions[index], "options": optionsObj});
		}
	}
	
	return newQuestions;
}