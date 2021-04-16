<template>
 <!--filter component -->
  <div>
    <div class="filters">
      <input 
         type="text" 
         id="seriesIdFilter"
         placeholder="seriesId"
         v-model="seriesId" >
         <input 
         type="text" 
         id="date" 
         placeholder="date"
         v-model="date" >
         <input 
         type="text" 
         id="screen"
         placeholder="screen"
         v-model="screen" >
         <input 
         type="text" 
         id="views" 
         placeholder="views"
         v-model="views" >
      <button @click="onFilter">filter</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filters',
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      filterItems: this.items,
      seriesId: null,
      date: null,
      screen: null,
      views: null
    }
  },
  methods: {
    onFilter() {
      let seriesIdArray = []
      let datesArray = []
      let screensArray = []
      let viewsArray = []
      this.items.map(item => {
        if (this.seriesId && item.seriesId.indexOf(this.seriesId) !== -1) {
          seriesIdArray.push(item)
        }
        if (this.date && item.date.toString().indexOf(this.date) !== -1) {
          datesArray.push(item)
        }
        if (this.screen && item.screen.indexOf(this.screen) !== -1) {
          screensArray.push(item)
        }
        if (this.views && item.views === Number(this.views) ) {
          viewsArray.push(item)
        }
      })
      let resultArrays = []
      if (seriesIdArray.length > 0) resultArrays.push(seriesIdArray) 
      if (datesArray.length > 0) resultArrays.push(datesArray) 
      if (screensArray.length > 0) resultArrays.push(screensArray) 
      if (viewsArray.length > 0) resultArrays.push(viewsArray) 
      if (resultArrays.length > 0) {
        this.filterItems = resultArrays.shift().filter(v => {
          return resultArrays.every(a => {
            return a.indexOf(v) !== -1
          })
        })
      } else {
        this.filterItems = this.items
      }
      this.$emit('filter', this.filterItems)
    }
  }
}
</script>

