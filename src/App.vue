<template>
    <div id="app">
        <div class="content-block">
            <h3 class="title">Potracheno</h3>
            <form>
                <input class="input name"
                       placeholder="item"
                       v-model="item.name">
                <input class="input price"
                       v-model="item.price"
                       placeholder="amount"
                       @keyup.enter="submitNewPosition">
            </form>
            <DynamicCombobox></DynamicCombobox>
            <div class="table elevation-1">
                <div class="row header">
                    <div class="cell">
                        Date
                    </div>
                    <div class="cell">
                        Category
                    </div>
                    <div class="cell">
                        Amount
                    </div>
                </div>
                <div class="row" v-for="(item, index) of positions" :key="index">
                    <div class="cell">
                        {{item.date}}
                    </div>
                    <div class="cell">
                        {{item.name||item.title}}
                    </div>
                    <div class="cell">
                        {{item.price}}
                    </div>
                </div>
                <div class="row footer">
                    <div class="cell">
                        {{datesRange}}
                    </div>
                    <div class="cell">

                    </div>
                    <div class="cell">
                        ₴ {{summaryExpends}}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import DatabaseService from './database.service';
    import DynamicCombobox from "./components/PositionItem";

    const dbService = DatabaseService.getInstance();

    export default {
        name: 'app',
        components: {DynamicCombobox},
        methods: {
            submitNewPosition() {
                let today = new Date();
                const date = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                dbService.expends.push(
                    {
                        date: `${date}/${month}/${year}`,
                        name: this.item.name,
                        price: this.item.price
                    });
                this.item.price = '';
                this.item.name = '';
            }
        },
        mounted() {
            dbService.expends.on('value', (x) => {
                this.rawPositions = x.val();
            })
        },
        data: () => {
            return {
                item: {
                    name: '',
                    price: '',
                },
                rawPositions: {}
            }
        },
        computed: {
            positions() {
                const result = [];
                for (const entry in this.rawPositions) {
                    result.push(this.rawPositions[entry]);
                }
                return result;
            },
            datesRange() {
                const poss = this.positions;
                if (poss.length) {
                    return `${poss[0].date} --- ${poss[poss.length - 1].date}`
                }
                return null
            },
            summaryExpends() {
                return Math.round(this.positions.reduce((acc, curr) => +curr.price + acc, 0) * 100) / 100;
            }
        }
    }
</script>

<style lang="scss">
    .content-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: aliceblue;
        width: 60%;
        height: 100%;

        .title {
            min-height: 50px;
            font-size: 2.5em;
            height: 10%;
        }

        form {
            width: 90%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;

            .input {
                padding: 5px;
                outline: none;
                font-size: 1.2em;
                border-radius: 5px;
                border: 1px solid #dedbdb;
                box-shadow: 0 0 2px 0 #d8d1d1;
            }

            .name {
                flex: 6;
            }

            .price {
                width: 50px;
                flex: 1;
            }
        }
    }

    .table {
        display: inline-flex;
        flex-direction: column;
        width: 100%;
        position: relative;
        background-color: white;
        border-radius: 5px;
        overflow: auto;
        margin-bottom: 5px;

        .row {
            display: flex;
            flex-direction: row;
            width: 100%;
            font-size: 1.1em;
            min-height: 40px;

            .cell {
                display: inline-block;
                min-width: 30px;

                width: 33.3%;
                text-align: center;
                padding: 5px;
            }
        }

        .footer {
            position: sticky;
            bottom: 0;
            min-height: 40px;
            background-color: white;
            box-shadow: darkgrey 0 -1px 3px -1px;
            padding: 5px 0;
        }

        .header {
            position: sticky;
            top: 0;
            min-height: 40px;
            background-color: white;
            padding: 5px 0;
            font-size: 1.2em;
            box-shadow: darkgrey 0 1px 3px -1px;
        }
    }

    .elevation-1 {
        box-shadow: darkgrey 0 2px 5px 1px;
    }

    .elevation-2 {
        box-shadow: darkgrey 0 2px 5px 1px;
    }

    #app {
        display: flex;
        justify-content: center;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: grenze-regular, sans-serif;
    }

    @font-face {
        font-family: grenze-regular;
        src: url("assets/fonts/Grenze-Regular.ttf");
    }

    @font-face {
        font-family: granze-large;
        src: url("assets/fonts/Grenze-Bold.ttf");
    }
</style>
