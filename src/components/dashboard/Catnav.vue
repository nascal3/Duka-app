<template>
    <div>
        <h3 class="catTitle">Categories</h3>
        <div class="sideNav">
            <ul v-if="setCategories.length > 0">
                <li :class="{ active: currentCategory === null }" @click="sendCategory(null)">All Categories</li>
                <li v-for="cat in setCategories" :class="{ active: cat.id === currentCategory }" @click="sendCategory(cat)">{{cat.category_name}}</li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                setCategories: [],
                currentCategory: null
            }
        },
        props: {
            videos: {
                type: Array
            },
        },
        watch: {
            videos(newValue) {

                if (newValue.length > 0) {
                    const categories = [];
                    let catID = [];

                    newValue.forEach(video => {

                        if ( !catID.find( e => {return e === video.category}) ) {
                            categories.push( { "id": video.category, "category_name": video.category_name } );
                            catID.push(video.category);
                        }
                    });

                    this.setCategories = categories;
                }

            }
        },
        methods: {
            sendCategory(category) {
                this.$emit('getCategory', category);
                if (category === null) return this.currentCategory = null;
                this.currentCategory = category.id;
            }
        },

    }
</script>

<style lang="scss" scoped>

    .catTitle {
        padding-left: 10px;
        width: 17%;
    }

    .sideNav {

        background-color: #ddd;

        @media( max-width: 779px) {
            width: 40%;
        }

        & h3 {
            background-color: transparent;
        }

        & ul {
            padding-left: 0;
            margin: 0;

            & li {
                position: relative;
                padding: 15px 0 15px 10px;
                list-style: none;
                cursor: pointer;
                background-color: #f3efec;
                left: 0;
                border-bottom: solid 1px #f9f4f1;
                transition: all .5s;

                &:hover {
                    background-color: #ddd;
                    left: 7px;
                }

                &.active {
                    background-color: #ddd;
                    left: 7px;
                }
            }
        }
    }

</style>
