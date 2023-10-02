function* gen() {
    for (let i = 0; i < 10; i++) {
       yield i * 2
    }
}

console.log(...gen())
