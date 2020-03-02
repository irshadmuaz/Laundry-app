import dbs from './DbManager'

const utilities = {
  insertClient: a => {
    return dbs.clientDB.insert(a)
  },
  getClients: () => {
    return dbs.clientDB().get()
  },

  insertTask: task => {
    // Ensure no dublicate exists
    return dbs.taskDB.insert(task)
  },

  updateTask: task => {
    return dbs.taskDB(task.___id).update(task)
  },
  getTasks: (query) => {
    return dbs.taskDB(query).get()
  },
  getTask: (id) => {
    return dbs.taskDB(id).first()
  },
  deleteTask: (id) => {
    return dbs.taskDB(id).remove()
  },

  insertRequest: (request) => {
    return dbs.requestDB.insert(request)
  }
}

export default utilities
