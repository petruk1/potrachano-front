<script>
    import LineChart from "./charts/LineChart";
    import * as  moment from 'moment';

    const dateFormat = 'DD/MM/YYYY';
    export default {
        name: 'Statistic',
        inject: {dbService: 'dbService'},
        components: {LineChart},
        data: () => {
            return {
                originalData: null,
                dataCollection: null,
                discoveryDate: moment().add(-7, 'days').format('YYYY-MM-DD'),
                daysQTY: 7,
                averagePrice: 0,
                options: {
                    tooltips: {
                        mode: 'index',
                        intersect: true
                    },
                    annotation: {
                        annotations: [{
                            type: 'line',
                            mode: 'horizontal',
                            scaleID: 'y-axis-0',
                            value: 80,
                            borderColor: 'red',
                            borderWidth: 1,
                            label: 'Day money'
                        }]
                    }
                }
            }
        },
        mounted() {
            this.fetchExpends();
        },
        computed: {
            dateInInnerFormat() {
                return moment(moment(this.discoveryDate, 'YYYY-MM-DD').toISOString())
            }
        },
        methods: {
            log(e) {
                console.log(e.target.value)
            },
            handleExpends() {
                const dirtyData = [];
                let labels = [];
                for (const key of Object.keys(this.originalData)) {
                    const date = moment(this.originalData[key].date, dateFormat);
                    for (let i = 0; i < this.daysQTY; i++) {
                        const current = moment(this.dateInInnerFormat).add(i, 'days');
                        if (date.format(dateFormat) === current.format(dateFormat)) {
                            dirtyData.push(this.originalData[key]);
                            labels.push(this.originalData[key].date);
                        }
                    }
                }

                labels = labels.reduce((acc, e) => {
                    if (!acc.includes(e)) {
                        acc.push(e)
                    }
                    return acc;
                }, []);
                const data = [];
                labels.forEach((label) => {
                    const c = dirtyData.filter((exp) => exp.date === label);
                    data.push(c.reduce((acc, i) => {
                        return parseFloat(i.price) + acc;
                    }, 0));
                });
                this.dataCollection = {
                    labels,
                    datasets: [{
                        label: 'Expends by date', backgroundColor: 'rgb(161, 230, 255)',
                        data
                    }]
                };
            },
            fetchExpends() {
                this.dbService.expends.on('value', (snapshot) => {
                    this.originalData = snapshot.val();
                    this.handleExpends();
                });
            },
        }
    }
</script>
<template>
    <div class="statistic">
        <div class="time-controls">
            <input type="date"
                   class="input discovery-date"
                   @input="fetchExpends"
                   v-model="discoveryDate">
            <input type="number"
                   class="input days-count"
                   @input="fetchExpends"
                   v-model="daysQTY"
                   min="1"></div>
        <div class="charts-container"
             v-if="dataCollection!==null">
            <LineChart
                    class="chart"
                    :chartData="dataCollection"
                    :options="options">

            </LineChart>
            <LineChart
                    class="chart"
                    :chartData="dataCollection"
                    :options="options">

            </LineChart>
        </div>
        <img v-else src="../assets/spinner.gif">
    </div>
</template>
<style lang="scss">
    .statistic {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;

        .time-controls {
            display: flex;
            justify-content: center;
            margin-bottom: 10px;

            & > * {
                margin: 0 5px;
            }

            .discovery-date {
                width: 130px;
            }

            .days-count {
                width: 50px;
            }
        }

        .charts-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
            height: 100%;
            overflow: auto;

            .chart {
                width: 300px;

                canvas {
                    width: inherit;
                }
            }


        }
        @media (max-width: 1080px) {
            .charts-container{
                height: 300px !important;
            }
            .chart {
                width: 300px;
                canvas {
                    width: inherit;
                }
            }

        }

    }
</style>

