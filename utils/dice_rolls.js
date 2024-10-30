export function d2() {
    return getRandomInRangeInclusive(1, 2);
}

export function d4() {
    return getRandomInRangeInclusive(1, 4);
}

export function d6() {
    return getRandomInRangeInclusive(1, 6);
}

export function d8() {
    return getRandomInRangeInclusive(1, 8);
}

export function d10() {
    return getRandomInRangeInclusive(1, 10);
}

export function d12() {
    return getRandomInRangeInclusive(1, 12);
}

export function d20() {
    return getRandomInRangeInclusive(1, 20);
}

export function d100() {
    return getRandomInRangeInclusive(1, 100);
}

export function dRange(min, max) {
    return getRandomInRangeInclusive(min, max);
}

function getRandomInRangeInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}