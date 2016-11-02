export default class Person {
    constructor(firstName, lastName){
        this.firstName = firstName
        this.lastName = lastName
    }
    static isPerson(person){
        return person instanceof this
    }
    fullName(){
        return `${this.firstName} ${this.lastName}`
    }
}