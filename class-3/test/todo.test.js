const { describe, it, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const Todo = require('../src/todo')
const { createSandbox } = require('sinon')
describe('todo', () => {

    let sandbox

    beforeEach(() => {
        sandbox = createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('#isValid', () => {

        it('should return invalid when creating an object without text', () => {

            const data = {
                text: '',
                when: new Date("2020-12-01")
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok

        })

        it('should return invalid when creating an object using the "when" property invalid', () => {

            const data = {
                text: 'Hello World',
                when: new Date("20-12-01")
            }

            const todo = new Todo(data)
            const result = todo.isValid()
            expect(result).to.be.not.ok

        })

        it('should have "id", "test", "when" and "status" properties after creating object', () => {

            const data = {
                text: 'Hello World',
                when: new Date("2020-12-01")
            }

            const expectId = '00001'

            const uuid = require('uuid')
            const fakeUUID = sandbox.fake.returns(expectId)
            sandbox.replace(uuid, 'v4', fakeUUID)

            const todo = new Todo(data)

            const expectedItem = {
                text: data.text,
                when: data.when,
                status: '',
                id: expectId
            }

            const result = todo.isValid()
            expect(result).to.be.ok
            expect(uuid.v4.calledOnce).to.be.ok
            expect(todo).to.be.deep.equal(expectedItem)

        })


    })

})
