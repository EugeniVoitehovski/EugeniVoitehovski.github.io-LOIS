/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

function calculate() {
    let expression = document.getElementById("formula").value;
    try {
        let lexemes = new LexemeParser().parse(expression);
        let rpnExpression = new RpnTranslator().translate(lexemes);
        let formula = new FormulaTranslator().translate(rpnExpression);
        let truthTable = new TruthTableGenerator().generate(formula);
        showTruthTable(truthTable, expression);

        showResult(new PcnfBuilder().build(expression));
    } catch (error) {
        showResult(error.message);
    }
}

function showResult(pcnf) {
    document.getElementById("result").textContent = pcnf;
}

function showTruthTable(truthTable, expression) {
    document.getElementById("truthTable").innerHTML = "";
    let table = document.getElementById("truthTable");
    let headerSupplier = (variable) => variable.name;
    let bodySupplier = (variable) => variable.value;
    table.appendChild(createRow(truthTable.variableValues[0], expression, headerSupplier));
    truthTable.variableValues
        .map((variables, index) => createRow(variables, truthTable.formulaValues[index], bodySupplier))
        .forEach(body => table.appendChild(body));
}

function createRow(variableValues, answer, supplier) {
    let row = document.createElement("TR");
    variableValues.filter(variable => variable.name.match(/[A-Z]/g) != null)
        .map(variable => supplier(variable))
        .forEach(variableName => {
            let variableTd = document.createElement("TD");
            variableTd.appendChild(document.createTextNode(variableName));
            row.appendChild(variableTd);
        });
    let answerTd = document.createElement("TD");
    answerTd.appendChild(document.createTextNode(answer));
    row.appendChild(answerTd);
    return row;
}

function generateQuestion() {
    let question = new FormulaGenerator().generate();
    document.getElementById("question").value = question;
    let formula = new PcnfBuilder().build(question);
    document.getElementById("suggestion").value = new FormulaInvalidator().invalidate(formula);
}

function clickTrue() {
    checkAnswer("SKNF");
    generateQuestion();
}

function clickFalse() {
    checkAnswer("!SKNF");
    generateQuestion();
}

function checkAnswer(actual) {
    let expression = document.getElementById("question").value;
    let suggestion = document.getElementById("suggestion").value;
    let expected = new PcnfBuilder().build(expression) === suggestion ? "SKNF" : "!SKNF";
    document.getElementById("resultQuestion").textContent = "You " + (expected === actual ? "right" : "false");
    let color = actual === expected ? "green" : "red";
    addRowToAutomaticTestsTable("generatedResults", expression, suggestion, expected, actual, color);
}

function addRowToAutomaticTestsTable(tableId, formula, suggestion, expected, actual, color) {
    let table = document.getElementById(tableId);
    let formulaTd = document.createElement("TD");
    formulaTd.appendChild(document.createTextNode(formula));
    let suggestionTd = document.createElement("TD");
    suggestionTd.appendChild(document.createTextNode(suggestion));
    let expectedTd = document.createElement("TD");
    expectedTd.appendChild(document.createTextNode(expected));
    let actualTd = document.createElement("TD");
    actualTd.appendChild(document.createTextNode(actual));
    let row = document.createElement("TR");
    row.style.backgroundColor = color;
    row.appendChild(formulaTd);
    row.appendChild(suggestionTd);
    row.appendChild(expectedTd);
    row.appendChild(actualTd);
    table.appendChild(row);
}


