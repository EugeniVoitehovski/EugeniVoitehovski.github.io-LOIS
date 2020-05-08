/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

class FormulaGenerator {
    constructor() {
    }

    generate() {
        let variablesNumber = this.generateVariablesAmount();
        let variables = [];
        for (let index = 0; index < variablesNumber; index++) {
            variables.push(this.generateVariable());
        }
        return variables.reduce((expression, variable) => expression === "" ?
            variable :
            `(${variable}${this.generateOperator()}${expression})`)
    }

    generateOperator() {
        let randomValue = Math.floor(Math.random() * 3);
        if (randomValue === 0) {
            return "->";
        }
        if (randomValue === 1) {
            return "|";
        }
        if (randomValue === 2) {
            return "&";
        }
        if (randomValue === 3) {
            return "~";
        }
    }

    generateVariablesAmount() {
        return Math.floor(Math.random() * 2) + 2;
    }

    generateVariable() {
        let source = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let position = Math.floor(Math.random() * source.length);
        let symbol = source.charAt(position);
        return this.generateBoolean() ? symbol : `(!${symbol})`;
    }

    generateBoolean() {
        return Math.floor(Math.random() * 2) > 0;
    }
}

class FormulaInvalidator {
    constructor() {
    }

    invalidate(formula) {
        if (this.generateBoolean()) {
            if (this.generateBoolean()) {
                return this.invalidateConjunction(formula);
            } else {
                return this.invalidateDisjunction(formula);
            }
        } else {
            return formula;
        }
    }

    invalidateConjunction(formula) {
        let indexes = formula.split("")
            .map((value, index) => value === "&" ? index : -1)
            .filter(value => value !== -1);
        if (indexes.length !== 0) {
            let randomIndex = Math.floor(Math.random() * indexes.length);
            let invalidatedFormula = this.replaceAt(formula, indexes[randomIndex], "|");
            return this.invalidateYet() ? this.invalidate(formula) : invalidatedFormula;
        } else {
            return formula;
        }
    }

    invalidateDisjunction(formula) {
        let indexes = formula.split("")
            .map((value, index) => value === "|" ? index : -1)
            .filter(value => value !== -1);
        if (indexes.length !== 0) {
            let randomIndex = Math.floor(Math.random() * indexes.length);
            let invalidatedFormula = this.replaceAt(formula, indexes[randomIndex], "&");
            return this.invalidateYet() ? this.invalidate(formula) : invalidatedFormula;
        } else {
            return formula;
        }
    }

    replaceAt(source, index, replacement) {
        return source.substr(0, index) + replacement + source.substr(index + replacement.length);
    }

    generateBoolean() {
        return Math.floor(Math.random() * 2) > 0;
    }

    invalidateYet() {
        return Math.random() > 0.7;
    }
}
