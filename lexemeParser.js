/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

const CONSTANT_LEXEME = "constant";
const VARIABLE_LEXEME = "variable";
const OPEN_BRACKET_LEXEME = "openBracket";
const CLOSED_BRACKET_LEXEME = "closedBracket";
const OPERATION_LEXEME = "operation";

class Lexeme {
    constructor(rawValue) {
        this.rawValue = rawValue;
        this.type = "";
        this.priority = "";
    }
}

class LexemeParser {
    constructor() {
        this.preprocessor = new LexemeParserPreprocessor();
        this.validator = new Validator();
        this.typeResolver = new LexemeTypeResolver();
        this.priorityResolver = new LexemePriorityResolver();
    }

    parse(expression) {
        this.validator.validate(expression);
        return this.preprocessor
            .preprocess(expression)
            .split("")
            .map(symbol => new Lexeme(symbol))
            .map(lexeme => this.typeResolver.resolve(lexeme))
            .map(lexeme => this.priorityResolver.resolve(lexeme));
    }
}

class LexemeParserPreprocessor {
    constructor() {
    }

    preprocess(expression) {
        return expression.replace(/->/g, "-").replace(/!/g, "2!");
    }
}

class LexemeTypeResolver {
    constructor() {
        this.RAW_VALUE_TO_TYPE = new Map();
        this.RAW_VALUE_TO_TYPE.set("0", CONSTANT_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("1", CONSTANT_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("2", CONSTANT_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("(", OPEN_BRACKET_LEXEME);
        this.RAW_VALUE_TO_TYPE.set(")", CLOSED_BRACKET_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("!", OPERATION_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("-", OPERATION_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("|", OPERATION_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("&", OPERATION_LEXEME);
        this.RAW_VALUE_TO_TYPE.set("~", OPERATION_LEXEME);
    }

    resolve(lexeme) {
        if (this.RAW_VALUE_TO_TYPE.has(lexeme.rawValue)) {
            lexeme.type = this.RAW_VALUE_TO_TYPE.get(lexeme.rawValue);
        }
        if (lexeme.rawValue.match(/[A-Z]/g) != null) {
            lexeme.type = VARIABLE_LEXEME;
        }
        return lexeme;
    }
}

class LexemePriorityResolver {
    constructor() {
        this.TYPE_TO_PRIORITY = new Map();
        this.TYPE_TO_PRIORITY.set(CONSTANT_LEXEME, 1);
        this.TYPE_TO_PRIORITY.set(VARIABLE_LEXEME, 1);
        this.TYPE_TO_PRIORITY.set(OPEN_BRACKET_LEXEME, 2);
        this.TYPE_TO_PRIORITY.set(CLOSED_BRACKET_LEXEME, 2);
        this.OPERATION_TO_PRIORITY = new Map();
        this.OPERATION_TO_PRIORITY.set("~", 3);
        this.OPERATION_TO_PRIORITY.set("-", 4);
        this.OPERATION_TO_PRIORITY.set("|", 5);
        this.OPERATION_TO_PRIORITY.set("&", 6);
        this.OPERATION_TO_PRIORITY.set("!", 7);
    }

    resolve(lexeme) {
        if (this.TYPE_TO_PRIORITY.has(lexeme.type)) {
            lexeme.priority = this.TYPE_TO_PRIORITY.get(lexeme.type);
        }
        if (this.OPERATION_TO_PRIORITY.has(lexeme.rawValue)) {
            lexeme.priority = this.OPERATION_TO_PRIORITY.get(lexeme.rawValue);
        }
        return lexeme;
    }
}

class Validator {
    constructor() {
        this.SYMBOL = "(([A-Z01])|(\\(![A-Z01]\\)))";
        this.BINARY_OPERATION = "([~&\\|])";
        this.COMBINE_OPERATION = "(->)";
        this.BINARY_FORMULA = `\\((${this.SYMBOL}(${this.BINARY_OPERATION}|${this.COMBINE_OPERATION})${this.SYMBOL})\\)`;
        this.SIMPLIFIED_SYMBOL = "S";
    }

    validate(expression) {
        if (this.simplify(expression, new RegExp(this.SYMBOL)) === this.SIMPLIFIED_SYMBOL ||
            this.simplify(expression, new RegExp(this.BINARY_FORMULA)) === this.SIMPLIFIED_SYMBOL) {
            return expression;
        } else {
            throw new SyntaxError("Not valid formula");
        }
    }

    simplify(expression, regex) {
        let previousLength;
        do {
            previousLength = expression.length;
            expression = expression.replace(regex, this.SIMPLIFIED_SYMBOL);
        } while (previousLength !== expression.length);
        return expression;
    }
}
