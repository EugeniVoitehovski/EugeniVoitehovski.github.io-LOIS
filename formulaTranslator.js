/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

const ARTIFICIAL_CONSTANT_VALUE = 2;
const TRUE = 1;
const FALSE = 0;

class Variable {
    constructor(name, value) {
        this.name = name;
        this.value = value;
    }
}

class Operation {
    constructor(name, execute) {
        this.name = name;
        this.execute = execute;
    }
}

class Formula {
    constructor(elements, variables) {
        this.elements = elements;
        this.variables = variables;
    }
}

class FormulaTranslator {
    constructor() {
        this.FORMULA_TO_FUNCTION = new Map();
        this.FORMULA_TO_FUNCTION.set("!", (operand1, operand2) => {
            if (operand1 === ARTIFICIAL_CONSTANT_VALUE) {
                return operand2 === TRUE ? FALSE : TRUE;
            } else {
                return operand1 === TRUE ? FALSE : TRUE;
            }
        });
        this.FORMULA_TO_FUNCTION.set("&", (operand1, operand2) => (operand1 === TRUE && operand2 === TRUE) ? TRUE : FALSE);
        this.FORMULA_TO_FUNCTION.set("|", (operand1, operand2) => (operand1 === FALSE && operand2 === FALSE) ? FALSE : TRUE);
        this.FORMULA_TO_FUNCTION.set("-", (operand1, operand2) => (operand1 === TRUE && operand2 === FALSE) ? FALSE : TRUE);
        this.FORMULA_TO_FUNCTION.set("~", (operand1, operand2) => (operand1 === operand2) ? TRUE : FALSE);
        this.CONSTANT_TO_VALUE = new Map();
        this.CONSTANT_TO_VALUE.set("0", FALSE);
        this.CONSTANT_TO_VALUE.set("1", TRUE);
        this.CONSTANT_TO_VALUE.set("2", ARTIFICIAL_CONSTANT_VALUE);
    }

    translate(rpnExpression) {
        let variablesCache = new Map();
        let elements = rpnExpression.map(element => this.resolve(element, variablesCache));
        let variables = elements.filter(element => element instanceof Variable);
        let uniqueVariables = Array.from(new Set(variables.map(variable => variable.name)))
            .map(name => variables.find(arg => arg.name === name));
        return new Formula(elements, uniqueVariables);
    }

    resolve(lexeme, variablesCache) {
        let lexemeName = lexeme.rawValue;
        if (this.FORMULA_TO_FUNCTION.has(lexemeName)) {
            return new Operation(lexemeName, this.FORMULA_TO_FUNCTION.get(lexemeName));
        }
        if (this.CONSTANT_TO_VALUE.has(lexemeName)) {
            return new Variable(lexemeName, this.CONSTANT_TO_VALUE.get(lexemeName));
        }
        if (variablesCache.has(lexemeName)) {
            return variablesCache.get(lexemeName);
        }
        let variable = new Variable(lexemeName, lexemeName);
        variablesCache.set(lexemeName, variable);
        return variable;
    }
}
