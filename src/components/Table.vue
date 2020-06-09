<template>
    <div>
        <table class="table">
            <thead>
                <tr class="table__row table__row--head">
                    <td 
                        @click="setSort('name')" 
                        :class="['td', { 'td--sort': sorting === 'name' }]">
                        <b>Dessert(100g serving)</b>
                    </td>
                    <td @click="setSort('cal')">Calories</td>
                    <td @click="setSort('fat')">Fat (g)</td>
                    <td @click="setSort('carbs')">Carbs (g)</td>
                    <td @click="setSort('protein')">Protein (g)</td>
                    <td @click="setSort('iron')">Iron (%)</td>
                </tr>    
            </thead>
            <tbody>
                <tr
                    class="table__row"
                    v-for="(item, index) in completeList"
                    :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories && item.calories.value }}</td>
                    <td>{{ item.fat && item.fat.value }}</td>
                    <td>{{ item.carbs && item.carbs.value }}</td>
                    <td>{{ item.protein && item.protein.value }}</td>
                    <td>{{ item.iron && item.iron.value }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    props: {
        rowsLength: {
            type: Number,
            default: 1,
            required: true
        },
        nextPage: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            currentPage: 1,
            sorting: '',
            pages: 0
        }
    },
    methods: {
        updatePagination(data) {
            this.pages = data.pages
            this.$emit('update-pagination', { 
                pages: data.pages, 
                currentPage: data.currentPage
            })
        },
        setSort(value) {
            if (this.sorting === value) {
                this.sorting = ''
            } else {
                this.sorting = value
            }
        },
        ...mapActions(['getItems'])
    },
    watch: {
        'rowsLength': function(value) {
            const num = Math.ceil((this.items.length / value) * 100) / 100

            this.updatePagination({
                pages: Math.ceil(num),
                currentPage: 1
            })
        },
        'nextPage': function(value) {
            this.currentPage = value
        },
        'sorting': function(oldVal, newVal) {
            if (oldVal !== newVal) {
                this.updatePagination({
                    pages: this.pages,
                    currentPage: 1
                })
            }
        }
    },
    computed: {
        ...mapGetters({
            items: 'getItems'
        }),
        completeList() {
            const index = this.currentPage * this.rowsLength - this.rowsLength

            if (this.sorting === 'calories') {
                const sortArr = this.items.slice().sort((a, b) => a.calories.value - b.calories.value)
                return sortArr.slice(index, index + this.rowsLength)
            } else if (this.sorting === 'fat') {
                const sortArr = this.items.slice().sort((a, b) => {
                    const num1 = Math.ceil(a.fat.value) * 100 / 100
                    const num2 = Math.ceil(b.fat.value) * 100 / 100
                    return num1 - num2
                })
                return sortArr.slice(index, index + this.rowsLength)
            } else if (this.sorting === 'carbs') {
                const sortArr = this.items.slice().sort((a, b) => {
                    const num1 = Math.ceil(a.carbs.value) * 100 / 100
                    const num2 = Math.ceil(b.carbs.value) * 100 / 100
                    return num1 - num2
                })
                return sortArr.slice(index, index + this.rowsLength)
            } else if (this.sorting === 'protein') {
                const sortArr = this.items.slice().sort((a, b) => {
                    const num1 = Math.ceil(a.protein.value) * 100 / 100
                    const num2 = Math.ceil(b.protein.value) * 100 / 100
                    return num1 - num2
                })
                return sortArr.slice(index, index + this.rowsLength)
            } else if (this.sorting === 'iron') {
                const sortArr = this.items.slice().sort((a, b) => {
                    const num1 = Math.ceil(a.iron.value) * 100 / 100
                    const num2 = Math.ceil(b.iron.value) * 100 / 100
                    return num1 - num2
                })
                return sortArr.slice(index, index + this.rowsLength)
            } else if (this.sorting === 'name') {
                const sortArr = this.items.slice().sort((a, b) => {
                    const num1 = a.name
                    const num2 = b.name

                    if (num1 == num2) return 0
                    if (num1 > num2) return 1
                    if (num1 < num2) return -1
                })
                return sortArr.slice(index, index + this.rowsLength)
            } else {
                return this.items.slice(index, index + this.rowsLength)
            }
        }
    },
    mounted() {
        this.getItems()
        this.pages = Math.ceil(this.items.length / this.rowsLength)
    }
}
</script>

<style lang="scss" scoped>
.table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 10px 0 20px;

    &__row {
        background: transparent;
        transition: background .2s ease-in-out;
        height: 50px;
        line-height: 50px;

        &:nth-child(2n) {
            background: rgb(226, 226, 226);
        }

        &:last-child td {
            border-bottom: none;
        }

        &:not(.table__row--head):hover {
            background: #ccc;
            cursor: pointer;
        }

        &--head td {
            cursor: pointer;
        }
    }

    td {
        border-bottom: 1px solid #ddd;
    }

    .td {
        position: relative;
        &:before {
            content: '↓';
            font-size: 16px;
            color: #ccc;
            position: relative;
            left: 170px;
        }
        
        &--sort:before {
            content: '↑';
        }
    }
}
</style>