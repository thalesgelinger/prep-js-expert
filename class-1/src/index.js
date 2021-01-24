// const EntityBase = require('./EntityBase')

const assert = require('assert')
const Employee = require('./Employee')
const Manager = require('./manager')
const Util = require('./util')

const GENDER = {
    male: 'male',
    female: 'female'
}

{
    const employee = new Employee({
        name: 'Xuxa da Silva',
        gender: GENDER.female
    })

    assert.throws(() => employee.birthYear, { message: 'You must define age firt!!' })

}

const CURRENT_YEAR = 2021
Date.prototype.getFullYear = () => CURRENT_YEAR

{
    const employee = new Employee({
        name: 'Thales Gelinger',
        age: 22,
        gender: GENDER.male
    })

    assert.deepStrictEqual(employee.name, 'Mr. Thales Gelinger')
    assert.deepStrictEqual(employee.age, undefined)
    assert.deepStrictEqual(employee.gender, undefined)
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40))
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32))

    const expectYear = 1999
    assert.deepStrictEqual(employee.birthYear, expectYear)
    
    //nao tem set logo é impossível mudar o valor de birthYear
    employee.birthYear = new Date().getFullYear() - 80
    assert.deepStrictEqual(employee.birthYear, expectYear)
    
    employee.age = 80
    assert.deepStrictEqual(employee.birthYear, 1941)

}

{
    const manager = new Manager({
        name: 'Mariazinha',
        age: 18,
        gender: GENDER.female
    })

    assert.deepStrictEqual(manager.name, 'Ms. Mariazinha')
    assert.deepStrictEqual(manager.age, undefined)
    assert.deepStrictEqual(manager.gender, undefined)
    assert.deepStrictEqual(manager.birthYear, 2003)
    assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40))
    assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000))
    assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32))

}