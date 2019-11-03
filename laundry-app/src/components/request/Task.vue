<template>
  <!-- <q-item>
    <q-item-section avatar>
      <slot name="avatar">
        <q-icon name="bookmark" />
      </slot>
    </q-item-section>
    <q-item-section>
      <div>
        <q-chip v-for="(tsk) in task.tasks" :key="tsk" dense>{{tsk}}</q-chip>
      </div>
    </q-item-section>
    <q-item-section side>
      <q-badge color="orange" class="q-ml-sm">{{task.price}}</q-badge>
    </q-item-section>
  </q-item>-->
  <q-table
    title="Tasks"
    dense
    :data="tasks"
    :columns="columns"
    row-key="___id"
    table-style="max-height: 400px"
    virtual-scroll
    :pagination.sync="pagination"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="garment" :props="props">{{ props.row.garment }}</q-td>
        <q-td key="tasks" :props="props">
          <q-chip v-for="(tsk) in props.row.tasks" :key="tsk" dense>{{tsk}}</q-chip>
        </q-td>
        <q-td key="price" :props="props">{{ props.row.price }}</q-td>

        <q-td key="operations" :props="props">
          <q-btn-dropdown label="Edit" split size="xs" @click="editItem(props.row)">
            <q-list dense>
              <!-- <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Edit</q-item-label>
                </q-item-section>
              </q-item>-->
              <q-item clickable v-close-popup @click="deleteItem(props.row.___id)">
                <q-item-section>
                  <q-item-label>Delete</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
        <!-- <q-td key="quantity" :props="props">
            {{ props.row.quantity }}
            <q-popup-edit v-model="props.row.quantity">
              <q-input v-model="props.row.quantity" dense autofocus counter />
            </q-popup-edit>
        </q-td>-->
      </q-tr>
    </template>
  </q-table>
</template>

<script>
export default {
  name: 'Task',
  props: {
    tasks: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 100
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'garment',
          label: 'Garment',
          field: 'garment',
          align: 'left'
        },
        { name: 'tasks', align: 'left', label: 'Tasks', field: 'tasks' },
        { name: 'price', align: 'left', label: 'Cost', field: 'price' },
        { name: 'operations', align: 'right', label: '', field: 'operations' }
        // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
      ]
    }
  },
  methods: {
    deleteItem (id) {
      this.$emit('deleteTask', id)
      // taskDB.deleteTask(id)
    },
    editItem (task) {
      this.$emit('editTask', task)
    }
  }
}
</script>
