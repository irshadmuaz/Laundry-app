<template>
      <div class="qa-pa-md" style="width:500px; margin-top:20px;">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="clientForm">
          <q-input
            filled
            v-model="params.name"
            label="Name *"
            hint="Name and Surname"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a valid name']"
          ></q-input>
          <q-input
            filled
            v-model="params.address"
            label="Address *"
            hint="Residential Address"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a valid address']"
          ></q-input>
          <q-input
            filled
            v-model="params.phoneNumber"
            label="Phone"
            hint="Phobe Number"
            lazy-rules
            :rules="[val => ((val && val.match(/\d/g)) || !val) || 'Please type a valid Phone Number']"
          ></q-input>
          <q-input
            filled
            v-model="params.email"
            label="Email Address *"
            hint="Valid Email Address"
            lazy-rules
            :rules="[val => (!val || (val && val.match(/[@]/g))) || 'Please type a valid Email Address']"
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
export default {
  name: 'Clients',

  data () {
    return {
      params: {}
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
      this.params = {}
      console.log('here is the db content', dbService.getClients())
    }
  }
}
</script>
