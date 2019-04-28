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
			questions = makeMCRanking(questions, multipleChoiceQuestions, "multipleChoice", mcOptions);
		}

		//get tf
		var trueFalseQuestions = body.trueFalse;
		if(typeof trueFalseQuestions != 'undefined') {
			questions = makeQuestions(questions, trueFalseQuestions, "trueFalse");
		}

		//get ranking
		var rankingQuestions = body.ranking;
		var rankingOptions = body.rankingOptions;
		if(typeof rankingQuestions != 'undefined') {
			questions = makeMCRanking(questions, rankingQuestions, "ranking", rankingOptions);
		}

		return(questions);
	}
}

function makeQuestions(questions, questionsToAdd, questionType) {
	if(questionsToAdd == null) {
		return;
	}

	var newQuestions = questions;
	var index = 0;

	if(typeof questionsToAdd === 'string') {
		//TODO check if long answer is getting here????
		//then only one to add
		newQuestions.push({"type": questionType, "answer": "", "question": questionsToAdd});
	} else {
		for (index; index < questionsToAdd.length; index += 1) {
		newQuestions.push({"type": questionType, "answer": "", "question": questionsToAdd[index]});
	}
	}
	

	return newQuestions;
	
}

function makeMCRanking(questions, questionsToAdd, type, options) {

	if(questionsToAdd == null) {
		return;
	}
	var newQuestions = questions;
	var index = 0;

	if(typeof questionsToAdd  === 'string') {
		//then only one to add
		optionsObj = options.split(";");
		if(optionsObj.length == 1) {
				optionsObj = options.split(",");
				console.log(optionsObj);
			}
		newQuestions.push({"type": type, "answer": "", "question": questionsToAdd, "options": optionsObj});
	} else {
		for (index; index < questionsToAdd.length; index += 1) {
			optionsObj = options[index].split(";");
			console.log("length"+optionsObj.length);
			if(optionsObj.length == 1) {
				console.log("splitting by commas");
				optionsObj = options[index].split(",");
			}
			newQuestions.push({"type": type, "answer": "", "question": questionsToAdd[index], "options": optionsObj});
		}
	}
	
	return newQuestions;
}