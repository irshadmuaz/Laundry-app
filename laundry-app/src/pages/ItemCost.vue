<template>
  <div>
    {{error}}
    <div class="row">
      <div class="col">
        <q-card class="fit">
          <q-card-section>
            <div class="text-h6">Manage Tasks</div>
            <div class="text-subtitle2">Create, Edit and Delete</div>
          </q-card-section>

          <q-separator />

          <q-form ref="form">
            <q-card-section>
              <q-input
                outlined
                bottom-slots
                v-model="taskItem.garment"
                label="Garment"
                hint="Garment type"
                dense
                class="on-right"
                :rules="[val => val && val.length > 0 || 'Must type in a garment name']"
                style="width:150px; display:inline-block;"
              ></q-input>
              <q-input
                outlined
                bottom-slots
                v-model="taskItem.price"
                label="Price"
                hint="Set Price"
                dense
                type="number"
                class="on-right"
                :rules="[val => val && val.length > 0 || 'Must type in a price']"
                style="width:150px; display:inline-block;"
              ></q-input>
            </q-card-section>

            <q-card-section>
              <q-chip
                v-for="(item,index) in taskItem.tasks"
                :key="item"
                removable
                @remove="removeTask(index)"
                icon="bookmark"
              >{{item}}</q-chip>
            </q-card-section>

            <q-card-section>
              <q-input
                outlined
                bottom-slots
                v-model="task"
                label="Add Task"
                hint="Task type"
                dense
                class="on-right"
                style="width:150px; display:inline-block;"
                :rules="[val => taskItem.tasks && taskItem.tasks.length > 0 || 'Must have atleast 1 task']"
                v-on:keyup.enter.native="addTask"
              >
                <template v-slot:append>
                  <q-btn round dense flat icon="add" @click="addTask" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions class="on-right" align="left">
            <q-btn class="on-rigt" @click="saveTask">Save</q-btn>
            <q-btn @click="cancelTask">Cancel</q-btn>
          </q-card-actions>
          </q-form>
        </q-card>
      </div>

      <div class="col">
        <tasks class="fit" :tasks="allTasks" @deleteTask="deleteTask" @editTask="editTask" />
      </div>
    </div>
  </div>
</template>

<script>
import dbService from '../store/DBStore/DBService'
import Task from '../components/request/Task'
import $ from 'jquery'
export default {
  data () {
    return {
      task: '',
      task_models: [],
      taskItem: {},
      allTasks: dbService.getTasks(),
      error: ''
    }
  },

  components: {
    tasks: Task
  },
  methods: {
    addTask () {
      if (this.task) {
        const newTask = this.task.toLowerCase()
        if (this.taskItem.tasks && this.taskItem.tasks.includes(newTask)) {
          this.error = 'The task "' + newTask + '" already exists!'
          return
        }
        this.taskItem.tasks ? this.taskItem.tasks.push(newTask) : this.taskItem.tasks = [newTask]
        this.success('addTask')
      }
      this.task = ''
    },
    removeTask (index) {
      this.taskItem.tasks.splice(index, 1)
    },
    saveTask () {
      this.$refs.form.validate().then(status => {
        if (status) {
          this.$emit('change', this.params)
        }
      })
      if (
        this.taskItem.price &&
        this.taskItem.tasks.length > 0 &&
        this.taskItem.garment
      ) {
        // if has id then update
        if (this.taskItem.___id) {
          dbService.updateTask(this.taskItem)
          return this.success('updateTask')
        }
        // Ensure no dublicate tasks exist
        const filter = { garment: { isnocase: this.taskItem.garment } }

        let dublicate = dbService.getTasks(filter)

        dublicate = dublicate.filter(x => {
          if (
            $(x.tasks).not(this.taskItem.tasks).length === 0 &&
            $(this.taskItem.tasks).not(x.tasks).length === 0
          ) {
            return x
          }
        })
        if (dublicate.length > 0) {
          this.error = 'A task with the same parameters already exists'
          return
        }
        // upsert, if id exists then update else insert

        const resp = dbService.insertTask(this.taskItem)
        this.success('saveTask')
        this.allTasks = dbService.getTasks()
        console.log(resp)
        console.log(dbService.getTasks())
      }
    },
    deleteTask (id) {
      console.log('id', id, dbService.deleteTask(id))
      this.allTasks = dbService.getTasks()
    },
    editTask (task) {
      console.log('edittask', task)
      this.taskItem = JSON.parse(JSON.stringify(task))
    },
    success (type) {
      switch (type) {
        case 'saveTask':
          this.taskItem = {}
          this.$refs.form.reset()
          break
        case 'updateTask':
          this.taskItem = {}
          this.$refs.form.reset()
          this.allTasks = dbService.getTasks()
          break
      }
    },
    cancelTask () {
      this.taskItem = {}
      this.$refs.form.reset()
    }
  }
}
</script>
