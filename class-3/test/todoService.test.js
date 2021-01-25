const { describe, it, before, afterEach, beforeEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')
const TodoService = require('../src/todoService')
const Todo = require('../src/todo')


describe('todoService', () => {

  let sandbox

  before(() => {
    sandbox = createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#list', () => {

    const mockDatabase = [
      {
        name: 'XuxaDaSilva',
        age: 90,
        meta: { revision: 0, created: 1611514964558, version: 0 },
        '$loki': 1
      }
    ]

    let todoService
    beforeEach(() => {

      const dependencies = {
        todoRepository: {
          list: sandbox.stub().returns(mockDatabase)
        }
      }

      todoService = new TodoService(dependencies)
    })

    it('should return data on specific format', () => {

      const result = todoService.list()
      const [{ meta, $loki, ...expected }] = mockDatabase 

      expect(result).to.be.deep.equal([expected])

    })

  })

  describe('#create', () => {

    let todoService
    beforeEach(() => {

      const dependencies = {
        todoRepository: {
          create: sandbox.stub().returns(true)
        }
      }

      todoService = new TodoService(dependencies)
    })

    it('shouldn\'t save todo item with invalid data', () => {
      const data = new Todo({
        test: '',
        when: ''
      })

      Reflect.deleteProperty(data, 'id')
      const expected = {
        error: {
          message: 'Invalid data',
          data
        }
      }
      
      const result = todoService.create(data)
      expect(result).to.be.deep.equal(expected)

    })

    it('should save todo item with late status when the property is further than today', () => {

      const properties = {
        text: 'I must walk my dog',
        when: new Date('2020-12-01 12:00:00 GMT-0')
      }

      const expectId = '00001'
      
      const uuid = require('uuid')
      const fakeUUID = sandbox.fake.returns(expectId)
      sandbox.replace(uuid, 'v4', fakeUUID)

      const data = new Todo(properties)
      
      const today = new Date("2020-12-02")
      sandbox.useFakeTimers(today.getTime())

      todoService.create(data)

      const expectCallWith = {
        ...data,
        status: 'late'
      }

      expect(todoService.todoRepository.create.calledOnceWithExactly(expectCallWith)).to.be.ok

    })
    it('should save todo item with pending status', () => {
      const properties = {
        text: 'I must walk my dog',
        when: new Date('2020-12-10 12:00:00 GMT-0')
      }

      const expectId = '00001'
      
      const uuid = require('uuid')
      const fakeUUID = sandbox.fake.returns(expectId)
      sandbox.replace(uuid, 'v4', fakeUUID)

      const data = new Todo(properties)
      
      const today = new Date("2020-12-02")
      sandbox.useFakeTimers(today.getTime())

      todoService.create(data)

      const expectCallWith = {
        ...data,
        status: 'pending'
      }

      expect(todoService.todoRepository.create.calledOnceWithExactly(expectCallWith)).to.be.ok
    })

  })

})