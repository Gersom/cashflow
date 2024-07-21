<script setup>
import { ref, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';


const series = ref([44, 55, 41, 17, 15]);


const chartOptions = ref({
    legend: {
        show: false
    },
    
    chart: {
        type: 'donut',
    },
    responsive: [{
        breakpoint: 400,
    }],
    plotOptions: {
        pie: {
            customScale: 1,
            donut: {
                size: '80%',
                background: 'transparent',
                labels: {
                    show: true,
                    total: {
                        show: true,
                        label: 'Gastos 2024',
                        fontSize: '100%',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        color: 'var(--text-color)',
                        formatter: function (w) {
                            if (Array.isArray(w.globals.seriesTotals)) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0)+ ' $';
                            }
                            return 0;
                        }
                    },
                    value: {
                        show: true,
                        fontSize: '100%', 
                        fontFamily: 'Helvetica, Arial, sans-serif', 
                        fontWeight: 600,  
                        offsetY: 3, 
                        color: '#00eca6',
                          formatter: function (val) {
                            return val + ' $'; 
                          }
                    },

                }
            },
            total: {
                show: true,
            }
        }
    },
    dataLabels: {
        enabled: false,

    },
    stroke: {
        width: 0
    },
    labels: []
});


</script>

<template>
        <apexchart type="donut" :options="chartOptions" :series="series"></apexchart>
</template>

<style scoped>

</style>