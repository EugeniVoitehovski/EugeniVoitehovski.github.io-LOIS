/*
Лабораторная работа 2 по дисциплине ЛОИС
гр. 721702
Выполнил студент: Войтеховский Евгений
Вариант8: построить — СКНФ для заданной формулы.
Источник основного кода: Лабораторная работа 2 по дисциплине ЛОИС Икбаева Е.
Источник по языку программирования javascript: https://learn.javascript.ru/ 
*/

const INITIAL_VALUE = 0;
const BASE_OF_BINARY_NUMBER = 2;
const DIFFERENCE_THRESHOLD = 0;
const EMPTY_BIT = 0;

class SourceDataGenerator {
    constructor() {
    }

    generate(variablesAmount) {
        let sourceData = [];
        for (let number = INITIAL_VALUE; number < Math.pow(BASE_OF_BINARY_NUMBER, variablesAmount); number++) {
            let binaryRepresentation = number.toString(BASE_OF_BINARY_NUMBER);
            let sequenceOfValues = this.normalize(binaryRepresentation, variablesAmount);
            sourceData.push(sequenceOfValues);
        }
        return sourceData;
    }

    normalize(binaryNumber, limit) {
        let sequence = [];
        binaryNumber.split("").map(bit => +bit).forEach(bit => sequence.push(bit));
        let difference = limit - binaryNumber.length;
        while (difference > DIFFERENCE_THRESHOLD) {
            sequence.unshift(EMPTY_BIT);
            difference--;
        }
        return sequence;
    }
}
