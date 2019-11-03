<template>
  <!-- <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header class="bg-white">
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="300" :breakpoint="600">
        <q-scroll-area
          style="height: calc(100% - 350px); margin-top: 200px; border-right: 1px solid #ddd"
        >
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="assignment_turned_in" />
              </q-item-section>
              <q-item-section>
                <router-link to="/request">
                  <q-btn flat text-color="black" label="Requests"></q-btn>
                </router-link>
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="account_circle" />
              </q-item-section>

              <q-item-section>
                <router-link to="/client">
                  <q-btn flat text-color="black" label="Clients"></q-btn>
                </router-link>
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="account_balance_wallet" />
              </q-item-section>

              <q-item-section>
                <router-link to="/account"><q-btn flat text-color="black" label="Accounts"></q-btn></router-link>
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="layers" />
              </q-item-section>

              <q-item-section>
                <router-link to="/itemCost">
                  <q-btn flat text-color="black" label="Items & Cost"></q-btn>
                </router-link>
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Laundry Management</div>
            <div>@Laundry Point</div>
          </div>
        </q-img>
      </q-drawer>

      <q-page-container id="q-app">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>-->
  <div class="q-pa-md doc-container">
    <div class="row items-center justify-center">
      <div class="col-2">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="assignment_turned_in" />
            </q-item-section>
            <q-item-section>
              <router-link to="/request">
                <q-btn flat text-color="black" label="Requests"></q-btn>
              </router-link>
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section>
              <router-link to="/client">
                <q-btn flat text-color="black" label="Clients"></q-btn>
              </router-link>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="account_balance_wallet" />
            </q-item-section>

            <q-item-section>
              <router-link to="/account">
                <q-btn flat text-color="black" label="Accounts"></q-btn>
              </router-link>
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="layers" />
            </q-item-section>

            <q-item-section>
              <router-link to="/itemCost">
                <q-btn flat text-color="black" label="Items & Cost"></q-btn>
              </router-link>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: true
    }
  }
}
</script>
