<script>
    export default {
        name: "Expends",
        components: {},
        inject: {dbService: 'dbService'},
        methods: {
            submitNewPosition() {
                let today = new Date();
                const date = today.getDate();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                this.dbService.expends.push({
                    date: `${date}/${month}/${year}`,
                    name: this.item.name,
                    price: this.item.price
                });
                this.item.price = "";
                this.item.name = "";
                this.$refs.productName.focus();
            }
        },
        mounted() {
            this.dbService.expends.on("value", x => {
                this.rawPositions = x.val();
            });
        },
        data: () => {
            return {
                item: {
                    name: "",
                    price: ""
                },
                rawPositions: null
            };
        },
        computed: {
            positions() {
                const result = [];
                for (const entry in this.rawPositions) {
                    result.push(this.rawPositions[entry]);
                }
                return result.reverse();
            },
            datesRange() {
                const poss = this.positions;
                if (poss.length) {
                    return `${poss[0].date} --- ${poss[poss.length - 1].date}`;
                }
                return null;
            },
            summaryExpends() {
                return (
                    Math.round(
                        this.positions.reduce((acc, curr) => +curr.price + acc, 0) * 100
                    ) / 100
                );
            },
            lastDayExpends() {
                const today = new Date();

                const lastDayPositions = this.positions.filter(elem => {
                    return (
                        elem.date ===
                        `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`
                    );
                });
                return (
                    Math.round(
                        lastDayPositions.reduce((acc, curr) => +curr.price + acc, 0) * 100
                    ) / 100
                );
            }
        }
    };
</script>
<template>
    <div class="expends">
        <form>
            <input class="input name"
                   ref="productName"
                   placeholder="item"
                   v-model="item.name"/>
            <input type="number"
                   class="input price"
                   v-model="item.price"
                   placeholder="amount"
                   @keyup.enter="submitNewPosition"/>
        </form>
        <div class="table elevation-1"
             v-if="rawPositions!==null">
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
                    {{ item.date }}
                </div>
                <div class="cell">
                    {{ item.name || item.title }}
                </div>
                <div class="cell">
                    {{ item.price }}
                </div>
            </div>
            <div class="row footer">
                <div class="cell">
                    {{ datesRange }}
                </div>
                <div class="cell"></div>
                <div class="cell total-expends">₴ {{ summaryExpends }}</div>
            </div>
        </div>
        <img v-else src="../assets/spinner.gif">
    </div>
</template>

<style lang="scss">
    .expends {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        overflow: auto;
        padding: 5px;

        .spent-today {
            background-color: #555555;
        }

        form {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            min-width: 300px;

            .name {
                flex: 4;
                margin-right: 10px;
            }

            .price {
                width: 50px;
                flex: 5;
            }
        }

        .table {
            display: inline-flex;
            flex-direction: column;
            position: relative;
            background-color: white;
            border-radius: 5px;
            overflow: auto;
            margin-bottom: 5px;

            .row {
                display: flex;
                flex-direction: row;
                align-items: center;
                width: 100%;
                font-size: 1em;
                min-height: 40px;
                cursor: pointer;

                &:not(.header):not(.footer):hover {
                    background-color: #efefef;
                }

                .cell {
                    display: inline-block;
                    min-width: 30px;

                    width: 33.3%;
                    text-align: center;
                    padding: 5px;
                    line-height: 15px;
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

        .day-expends {
            margin-left: 30px;
            font-size: 2rem;
            color: green;
        }

        .expends-overflow {
            color: red;
        }
    }
</style>
