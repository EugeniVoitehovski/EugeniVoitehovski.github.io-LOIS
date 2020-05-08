/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/


class TruthTable {
    constructor(variableValues, formulaValues) {
        this.variableValues = variableValues;
        this.formulaValues = formulaValues;
    }
}

class TruthTableGenerator {
    constructor() {
        this.sourceDataGenerator = new SourceDataGenerator();
        this.formulaCalculator = new FormulaCalculator();
    }

    generate(formula) {
        let sourceData = this.sourceDataGenerator.generate(this.getVariables(formula).length);
        let variableValues = sourceData.map(values => this.getVariableValues(values, formula));
        let formulaValues = sourceData.map(values => this.getFormulaValues(values, formula));
        return new TruthTable(variableValues, formulaValues);
    }

    getVariables(formula) {
        return formula.variables.filter(variable => variable.name.match(/[A-Z]/g) != null);
    }

    getVariableValues(sourceValue, formula) {
        return this.getVariables(formula).map((value, index) => new Variable(value.name, sourceValue[index]));
    }

    getFormulaValues(sourceValues, formula) {
        this.getVariables(formula).forEach((value, index) => value.value = sourceValues[index]);
        return this.formulaCalculator.calculate(formula).value;
    }
}
