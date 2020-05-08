/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

class FormulaCalculator {
    constructor() {
    }

    calculate(formula) {
        let buffer = [];
        formula.elements.forEach(element => this.updateBuffer(element, buffer));
        return buffer.pop();
    }

    updateBuffer(element, buffer) {
        if (element instanceof Variable) {
            buffer.push(element);
        } else {
            let operand2 = buffer.pop();
            let operand1 = buffer.pop();
            let operationResult = element.execute(operand1.value, operand2.value);
            buffer.push(new Variable(operationResult, operationResult));
        }
    }
}
