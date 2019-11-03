<template>
  <div class="full-height full-width justify-center">
    <q-table title="Clients" :data="clients" :columns="columns" row-key="__id" />
  </div>
</template>

<script>
import dbService from '../../store/DBStore/DBService'
export default {
  name: 'AllClients',
  data () {
    return {
      columns: [
        {
          name: '__id',
          label: 'Name',
          field: 'name',
          required: true,
          align: 'left',
          sortable: true,
          // style: 'width: 300px',
          classes: 'my-special-class'
        },
        {
          name: 'PhoneNumber',
          label: 'Phone Number',
          field: 'phoneNumber',
          sortable: true,
          align: 'left'
        },
        { name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' },
        { name: 'address', label: 'Address', field: 'address', align: 'left' }
      ],
      clients: dbService.getClients()
    }
  }
}
</script>
