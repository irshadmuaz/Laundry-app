<template>
  <div class="qa-pa-md" style="width:500px; margin-top:20px;">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="clientForm">
      <q-select
        filled
        v-model="params.client"
        map-options
        clearable
        use-input
        input-debounce="0"
        label="Select Client"
        :options="clients"
        @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        filled
        v-model="params.task"
        map-options
        clearable
        use-input
        input-debounce="0"
        label="Select Task"
        :options="tasks"
        @input="taskSelected"
        @filter="filterTasks"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-table
      title="Tasks"
      dense
      :data="data"
      :columns="columns"
      row-key="___id">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="tasks" :props="props">
            <q-chip v-for="(tsk) in props.row.tasks" :key="tsk" dense>{{tsk}}</q-chip>
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
          </q-td>
          <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
            <q-popup-edit v-model="props.row.quantity">
              <q-input v-model="props.row.quantity" dense autofocus counter />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
      </q-table>
      <!-- <q-tree :nodes="taskTree" node-key="label" default-expand-all>
        <template v-slot:header-generic="prop">
          <div style="width:100%;">
            <task :task="prop.node.task">
              <q-input v-model="prop.node.task.quantity" :value="1" slot="avatar" type="number" filled style="max-width: 50px" dense></q-input>
            </task>
          </div>
        </template>
      </q-tree> -->
      <q-input
        filled
        v-model="params.phoneNumber"
        label="Details"
        hint="Any additional information"
        lazy-rules
        :rules="[val => ((val && val.match(/\d/g)) || !val) || 'Please type a valid Phone Number']"
      ></q-input>
      <div>
        <q-btn label="Create" type="submit" color="primary"></q-btn>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"></q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
import dbService from '../../store/DBStore/DBService'
// import Task from '../../components/request/Task'
export default {
  name: 'Clients',
  components: {
    // task: Task
  },
  async mounted () {
    this.clients = dbService
      .getClients()
      .map(x => ({ label: x.name, value: x.___id }))
    this.allClients = this.clients
    this.tasks = dbService
      .getTasks()
      .map(x => ({ label: x.tasks.join(' + '), value: x.___id }))
    this.allTasks = this.tasks
  },

  data () {
    return {
      params: { client: '', task: '' },

      clients: [],
      allTasks: [],
      tasks: [],
      columns: [
        {
          name: 'tasks',
          required: true,
          label: 'Apparel',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        { name: 'price', align: 'center', label: 'Cost', field: 'price' },
        { name: 'quantity', align: 'center', label: 'Qnt', field: 'quantity' }
        // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      ],
      data: [],
      allClients: [],
      selected: 'Food',
      taskTree: [
        {
          label: 'Tasks',
          children: [{}]
        }
      ]
    }
  },
  watch: {
    taskTree () {
      console.log('this task tree', this.taskTree)
    }
  },
  methods: {
    onSubmit () {
      this.$refs.clientForm.validate().then(status => {
        if (status) {
          this.$emit('change', this.params)
        }
      })
    },
    onReset () {
      this.params = null
      console.log('here is the db content', dbService.getClients())
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.clients = this.allClients
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.clients = this.allClients.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterTasks (val, update) {
      if (val === '') {
        update(() => {
          this.tasks = this.allTasks
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.tasks = this.allTasks.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    taskSelected (task) {
      const tsk = dbService.getTask(task.value)
      console.error('here is the tsk', tsk)
      this.data.push({ ...tsk, quantity: 1 })
      this.params.task = ''
    }
  }
}
</script>
