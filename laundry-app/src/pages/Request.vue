<template>
  <div>
    <q-dialog v-model="showDialog">
      <a-banner>User {{params.name}} successfully Added</a-banner>
    </q-dialog>
    <q-tabs v-model="tab" inline-label class="bg-grey-2 text-teal shadow-2">
      <q-tab name="create" icon="group_add" label="New Request" />
      <q-tab name="allusers" icon="group" label="All Requests" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="create">
        <div class="row justify-center full-height full-width">
          <create-request @change="onSubmit"></create-request>
        </div>
      </q-tab-panel>

      <q-tab-panel name="allusers">
        <div class="row justify-center full-height full-width">
          <all-clients></all-clients>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import dbService from '../store/DBStore/DBService'
import allClients from '../components/client/AllClients'
import createRequest from '../components/request/CreateRequest'

export default {
  name: 'Client',

  data () {
    return {
      leftDrawerOpen: false,
      params: {},
      tab: 'create',
      showDialog: false
    }
  },
  components: {
    'all-clients': allClients,
    'create-request': createRequest
  },
  methods: {
    onSubmit (params) {
      dbService.insertClient(params)
      this.params = {}
    },
    onReset () {
      this.params = {}
    }
  }
}
</script>
