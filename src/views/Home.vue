<template>
  <div class="container">
    <div class="row columns">
      <div class="col col-12">
        <table-example
          :rowsLength="rowsLength"
          :nextPage="currentPage"
          @update-pagination="updatePagination">
        </table-example>
        
        <div class="controls">
          <div class="controls__item">
            <span>Rows per page:</span>
            <select 
              class="select"
              v-model="rowsLength">
              <option
                v-for="(num, index) in 10"
                :key="index"
                :selected="num === 1" 
                :value="num">{{ num }}</option>
            </select>
          </div>
          <div class="controls__item"></div>
            <span>{{ currentPage }}-{{ pages }} of {{ pages }}</span>
            <div class="controls__btns">
              <button 
                class="btn" 
                :disabled="currentPage === 1"
                @click="goToPrev()">
                ⬅️
              </button>
              <button 
                class="btn"
                :disabled="currentPage === pages"
                @click="goToNext()">
                ➡️
              </button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const tableExample = () => import('@/components/Table')

export default {
  components: { tableExample },
  data() {
    return {
      rowsLength: 1,
      pages: 1,
      currentPage: 1
    }
  },
  methods: {
    updatePagination(data) {
      this.pages = data.pages
      this.currentPage = data.currentPage
    },
    goToPrev() {
      this.currentPage--
    },
    goToNext() {
      this.currentPage++
    }
  }
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;

  &__item {
    margin-left: 24px
  }

  .select,
  &__btns {
    margin-left: 16px;
  }
}
</style>
