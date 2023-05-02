// function range(from , to) {
//     let current = to ? from : 0
//     let last = from
//     return {
//         [Symbol.iterator](){
//             return this
//         },

//         next(){
//             if(current < last){
//                 return {done: false, value: current++}
//             }else{
//                 return {done: true}
//             }
//         },
//         from: current, to:last
//     }
// }


function range(from, to){
    current = to ? from : 0
    let last = to ?? from
    return {
        *[Symbol.iterator](){
            for(let value = current; value<last; value++){
                yield value
            }
        },
    }
}

for(let num of range(1, 5)){
    console.log(num)
}

function* pseduoRandomSequence(seed){
    let v = seed;

    while(true){
        v = v  * 21 % 12341
        yield v
    }
}

let r = pseduoRandomSequence(10)
console.log(r.next().value)
console.log(r.next().value)
console.log(r.next().value)
console.log(r.next().value)
console.log(r.next().value)
console.log()

r = pseduoRandomSequence(1)
console.log(r.next().value)
console.log(r.next().value)
console.log(r.next().value)
console.log(r.next().value)
console.log(r.next().value)