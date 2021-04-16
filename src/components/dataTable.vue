<template>
 <!-- data table component -->
  <div>
    <Filters @filter="filter" :items="filterItems" />
    <table id="dataTable">
      <th>
        <i @click="sortSeriesIds" class="sort"></i>
        <span>seriesId</span>
      </th>
      <th>
        <i @click="sortDates" class="sort"></i>
        <span>date</span>
      </th>
      <th>
        <i @click="sortScreens" class="sort"></i>
        <span>screen</span>
      </th>
      <th>
        <i @click="sortViews" class="sort"></i>
        <span>views</span>
      </th>
      <tr v-for="(item, index) in showItems" :key="index">
        <td>{{ item.seriesId }}</td>
        <td>{{ item.date }}</td>
        <td>{{ item.screen }}</td>
        <td>{{ item.views }}</td>
      </tr>
    </table>
    <Loading v-if="isLoading" />
  </div>
</template>

<script>
import Filters from '@/components/filters'
import Loading from '@/components/loading'
import csvToJson from '@/mixins/global'
export default {
  name: 'dataTable',
  mixins: [csvToJson],
  components: {
    Filters,
    Loading
  },
  data() {
    return {
      items: [],
      showItems: [],
      seriesIdAscending: false,
      dateAscending: false,
      screenAscending: false,
      viewsAscending: false,
      isLoading: false
    }
  },
  mounted(){
    //getting parsed json datas
    JSON.parse(this.csvToJson()).map(item  => {
      if (item['seriesId,date,screen,views'] !== "" && item['seriesId,date,screen,views'] !==
        undefined) {
        let itemArray = item['seriesId,date,screen,views'].split(',')
        this.items.push({seriesId: itemArray[0].substring(1), date: Number(itemArray[1]), screen: itemArray[2], views:
          Number(itemArray[3])})
      } 
    })
    this.showItems = this.items
  },
  computed: {
    filterItems() {
      return this.items
    }
  },
  methods: {
    filter(val) {
      this.showItems = val
    },
    sortSeriesIds(){
      this.isLoading = true
      this.seriesIdAscending ? this.showItems.sort(this.dynamicSort('seriesId')) :
        this.showItems.sort(this.dynamicSort('-seriesId'))
      this.seriesIdAscending = !this.seriesIdAscending
      setTimeout(() => { this.isLoading = false }, 1000 ) 
    },
    sortDates(){
      this.isLoading = true
      this.dateAscending ? this.showItems.sort(this.dynamicSort('date')) :
        this.showItems.sort(this.dynamicSort('-date'))
      this.dateAscending = !this.dateAscending
      setTimeout(() => { this.isLoading = false }, 1000 ) 
    },
    sortScreens(){
      this.isLoading = true
      this.screenAscending ? this.showItems.sort(this.dynamicSort('screen')) :
        this.showItems.sort(this.dynamicSort('-screen'))
      this.screenAscending = !this.screenAscending
      setTimeout(() => { this.isLoading = false }, 1000 ) 
    },
    sortViews(){
      this.isLoading = true
      this.viewsAscending ? this.showItems.sort(this.dynamicSort('views')) :
        this.showItems.sort(this.dynamicSort('-views'))
      this.viewsAscending = !this.viewsAscending
      setTimeout(() => { this.isLoading = false }, 1000 ) 
    },
    dynamicSort(property) {
      var sortOrder = 1
      if(property[0] === "-") {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (first, second) {
        var result = (first[property] < second[property]) ? -1 : (first[property] > second[property]) ? 1 : 0
        return result * sortOrder
      }
    } 
  }
}
</script>

