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
        :rules="[val => params.client||'Must select a client' ]"
        @filter="filterFn"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
      </q-select>
      <!-- Todo: this needs to be a component select tasks -->
      <q-select
        filled
        v-model="params.task"
        clearable
        use-input
        input-debounce="0"
        label="Select Task"
        :rules="[val => data.length > 0 || 'Must have atleast 1 task']"
        :options="taskItems"
        @input="taskSelected"
        @filter="filterTasks"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">No results</q-item-section>
          </q-item>
        </template>
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
            <q-item-section>
              <q-item-label>{{scope.opt.garment}}</q-item-label>
              <q-item-label caption lines="2">{{scope.opt.tasks.join(', ')}}</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-badge color="teal" :label="scope.opt.price"></q-badge>
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-table title="Tasks" dense :data="data" :columns="columns" row-key="___id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="garment" :props="props">{{props.row.garment}}</q-td>
            <q-td key="tasks" :props="props">
              <q-chip v-for="(tsk) in props.row.tasks" :key="tsk" dense>{{tsk}}</q-chip>
            </q-td>
            <q-td key="price" :props="props">{{ props.row.price }}</q-td>
            <q-td key="quantity" :props="props">
              {{ props.row.quantity }}
              <q-popup-edit v-model="props.row.quantity" buttons :validate="quantityValidation">
                <q-input
                  v-model="props.row.quantity"
                  type="number"
                  dense
                  autofocus
                  counter
                  :rules="[val=>val > 0 || 'Quantity must be atleast 1']"
                ></q-input>
              </q-popup-edit>
            </q-td>
            <q-td key="op" :props="props">
              <q-btn
                round
                color="deep-orange"
                icon="remove"
                type="textarea"
                size="xs"
                @click="removeTask(props.row)"
              ></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <q-input
        filled
        v-model="params.additionalDetails"
        label="Details"
        hint="Any additional information"
        lazy-rules
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
    this.taskItems = dbService.getTasks()
    console.log(this.taskItem)
    // .map(x => ({ label: x.taskItem.join(' + '), value: x.___id }))
    this.allTaskItems = this.taskItems
  },

  data () {
    return {
      params: { client: '', task: '' },

      clients: [],
      allTaskItems: [],
      taskItems: [],
      columns: [
        { name: 'garment', align: 'left', label: 'Garment', field: 'garment' },
        {
          name: 'tasks',
          label: 'Tasks',
          align: 'left',
          field: 'tasks'
        },
        { name: 'price', align: 'center', label: 'Cost/item', field: 'price' },
        { name: 'quantity', align: 'center', label: 'Qnt', field: 'quantity' },
        { name: 'op', align: 'right', label: '', field: 'op' }
      ],
      data: [],
      allClients: [],
      taskDict: {},
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
    quantityValidation (val) {
      console.log(val)
      if (val < 1) {
        return false
      }
      return true
    },
    onSubmit () {
      this.$refs.clientForm.validate().then(status => {
        if (status) {
          this.$emit('change', this.params)
          const req = { client: this.params.client, taskItems: this.data, ...this.params }
          console.log(req)
          dbService.insertRequest(req)
        }
      })
    },
    onReset () {
      this.params = { client: '', task: '' }
      this.data = []
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
          this.taskItems = this.allTaskItems
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.taskItems = this.allTaskItems.filter(
          v =>
            v.garment.toLowerCase().indexOf(needle) > -1 ||
            v.tasks
              .join(',')
              .toLowerCase()
              .indexOf(needle) > -1
        )
      })
    },
    taskSelected (task) {
      // const tsk = dbService.getTask(task.___id)
      // console.error('here is the tsk', tsk, task)
      const index = this.data.findIndex(x => x.___id === task.___id)
      if (index > -1) {
        this.data[index].quantity += 1
      } else {
        this.data.push({ ...task, quantity: 1 })
      }
      this.params.task = ''
    },
    removeTask (task) {
      const index = this.data.findIndex(x => x.___id === task.___id)
      this.data.splice(index, 1)
    }
  }
}
</script>
