<template>
    <div>
        <table class="table">
            <thead>
                <tr class="table__row table__row--head">
                    <td><b>Dessert(100g serving)</b></td>
                    <td>Calories</td>
                    <td>Fat (g)</td>
                    <td>Carbs (g)</td>
                    <td>Protein (g)</td>
                    <td>Iron (%)</td>
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
        }
    },
    computed: {
        ...mapGetters({
            items: 'getItems'
        }),
        completeList() {
            const index = this.currentPage * this.rowsLength - this.rowsLength
            return this.items.slice(index, index + this.rowsLength)
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
    }

    td {
        border-bottom: 1px solid #ddd;
    }
}
</style>