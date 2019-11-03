let TAFFY = require('taffy')
const clientDB = TAFFY()
clientDB.store('clientdb')
clientDB.settings({ template: { audit: { created: Date(), modified: Date() } } })

const requestDB = TAFFY()
requestDB.store('requestdb')
requestDB.settings({ template: { audit: { created: Date(), modified: Date() } } })

const accountDB = TAFFY()
accountDB.store('accountdb')
accountDB.settings({ template: { audit: { created: Date(), modified: Date() } } })

const taskDB = TAFFY()
taskDB.store('taskdb')
taskDB.settings({ template: { audit: { created: Date(), modified: Date() } } })
taskDB()
const dbs = { clientDB, accountDB, requestDB, taskDB }
export default dbs
