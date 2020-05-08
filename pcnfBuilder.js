/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

class PcnfBuilder {
    constructor() {
        this.lexemeParser = new LexemeParser();
        this.rpnTranslator = new RpnTranslator();
        this.formulaTranslator = new FormulaTranslator();
        this.truthTableGenerator = new TruthTableGenerator();
    }

    build(expression) {
        let lexemes = this.lexemeParser.parse(expression);
        let rpnExpression = this.rpnTranslator.translate(lexemes);
        let formula = this.formulaTranslator.translate(rpnExpression);
        let truthTable = this.truthTableGenerator.generate(formula);
        let disjunctions = this.getDisjunctions(truthTable);
        return disjunctions.length === 0 ? "No disjunctions" : this.buildConjunction(disjunctions);
    }

    getDisjunctions(truthTable) {
        return truthTable.variableValues
            .filter((variable, index) => truthTable.formulaValues[index] === 0)
            .map(variables => this.resolveVariable(variables))
            .map(variables => this.buildDisjunction(variables))
    }

    resolveVariable(variables) {
        return variables.map(variable => variable.value === 0 ? variable.name : `(!${variable.name})`);
    }

    buildDisjunction(variables) {
        return variables.reduce((disjunction, variable) => disjunction === "" ? variable : `(${variable}|${disjunction})`, "");
    }

    buildConjunction(disjunctions) {
        return disjunctions.reduce((conjunction, disjunction) => conjunction === "" ? disjunction : `(${disjunction}&${conjunction})`, "");
    }
}
