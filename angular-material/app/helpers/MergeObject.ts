export function MergeObject<A>(a: A): A;
export function MergeObject<A, B>(a: A, b: B): A & B;
export function MergeObject<A, B, C>(a: A, b: B, c: C): A & B & C;
export function MergeObject<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
export function MergeObject(...args: any[]) {
    const newObj = {};
    for (const obj of args) {
        for (const key in obj) {

            (newObj as any)[key] = obj[key];
        }
    }
    return newObj;
}