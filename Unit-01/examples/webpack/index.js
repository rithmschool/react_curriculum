import { sayHi, sayBye, instructor,instructor2,instructor3 } from './helpers/functions';
import Person from './helpers/default'

sayHi()
sayBye()

console.log(instructor)
console.log(instructor2)
console.log(instructor3)

const p = new Person('Elie', 'Schoppik')

console.log(Person.isPerson(p))

console.log(p.fullName())

console.log(printStudents())

