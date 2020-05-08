/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

class RpnTranslator {
    constructor() {
    }

    translate(lexemes) {
        let buffer = [];
        let result = [];
        lexemes.forEach(lexeme => this.resolveDestination(lexeme, buffer, result));
        this.clearBuffer(buffer, result);
        return result;
    }

    resolveDestination(lexeme, buffer, result) {
        if (lexeme.type === CONSTANT_LEXEME || lexeme.type === VARIABLE_LEXEME) {
            result.push(lexeme);
        }
        if (lexeme.type === OPEN_BRACKET_LEXEME) {
            buffer.push(lexeme);
        }
        if (lexeme.type === CLOSED_BRACKET_LEXEME) {
            this.extractOpenBracket(buffer, result);
        }
        if (lexeme.type === OPERATION_LEXEME) {
            this.pushOperation(lexeme, buffer, result);
        }
    }

    extractOpenBracket(buffer, result) {
        while (true) {
            let lexeme = buffer.pop();
            if (lexeme.type !== OPEN_BRACKET_LEXEME) {
                result.push(lexeme);
            } else {
                break;
            }
        }
    }

    pushOperation(operation, buffer, result) {
        if (buffer.length === 0) {
            buffer.push(operation);
            return;
        }
        if (buffer[buffer.length - 1] !== undefined && buffer[buffer.length - 1].priority < operation.priority) {
            buffer.push(operation);
            return;
        }
        while (buffer[buffer.length - 1] !== undefined && buffer[buffer.length - 1].priority >= operation.priority) {
            result.push(buffer.pop());
        }
        this.pushOperation(operation, buffer, result);
    }

    clearBuffer(buffer, result) {
        while (true) {
            let lexeme = buffer.pop();
            if (lexeme !== undefined) {
                result.push(lexeme);
            } else {
                break;
            }
        }
    }
}
