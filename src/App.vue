<template>
  <!--app.vue-->
  <div id="app">
    <Header />
    <DataTable/>
  </div>
</template>

<script>
import Header from './components/header.vue'
import DataTable from './components/dataTable.vue'

export default {
  name: 'App',
  components: {
    Header,
    DataTable
  }
}
</script>

<style lang="scss">
@import './styles/main';
</style>
