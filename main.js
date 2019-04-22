import { sum } from 'npm:lodash';
import { addTax } from './checkout'

console.log('====================================');
console.log('it works');
addTax(20);
console.log(sum([1,2,3]));
console.log('====================================');