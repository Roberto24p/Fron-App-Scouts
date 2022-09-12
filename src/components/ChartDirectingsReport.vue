<template>
    <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>

</template>
<script>
export default {
    name: 'chartDirectingsReport',
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
                }],
                title: {
                    text: 'Dirigentes por grupo',
                    floating: true,
                    offsetY: 330,
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                },

            },
        }
    },
    beforeMount: async function () {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/graphicreport/directings/registers/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        },)
        const data = await response.json()
        console.log(data.groups)
        for (let i = 0; i < data.groups.length; i++) {
            this.series.push(data.groups[i].size)
            this.chartOptions.labels.push(data.groups[i].name)
        }

        // data.forEach(element => {
        // this.series.push(element.size)
        // this.chartOptions.labels.push(element.type)

    }

}
</script>