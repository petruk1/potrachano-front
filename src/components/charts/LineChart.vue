<script>
    import {Line, mixins} from 'vue-chartjs';
    import annotationPlugin from 'chartjs-plugin-annotation';

    const {reactiveProp} = mixins;

    export default {
        extends: Line,
        props: ['chartData', 'options'],
        mixins: [reactiveProp],
        name: "LineChart",
        mounted() {
            this.addPlugin(annotationPlugin);
            this.renderChart(this.chartData, this.options)
        }
    }
</script>
