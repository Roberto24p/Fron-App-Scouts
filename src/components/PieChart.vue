<template>
    <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>

</template>
<script>
export default {
    name: 'pieChart',
    data() {
        return {
            series: [],
            chartOptions: {
                chart: {
                    width: 380,
                    type: 'pie',
                },
                labels: [],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
        }
    },
    beforeMount: async function () {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/graphicreport/inscriptions/unit/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        },)
        const data = await response.json()
       data.forEach(element => {
        this.series.push(element.size)
        this.chartOptions.labels.push(element.type)
       })
    }

}
</script>