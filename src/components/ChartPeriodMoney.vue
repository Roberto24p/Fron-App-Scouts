<template>
    <apexchart type="bar" width="380" :options="chartOptions" :series="series" ></apexchart>

</template>
<script>
export default {
    name: 'chartPeriodMoney',
    props: ['period'],
    data() {
        return {
            series: [{
                name: 'Inscripciones por Grupo',
                data: []
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    },
                    formatter: function (val) {
                        return `$${val}`;
                    }
                },

                xaxis: {
                    categories: [],
                    position: '',
                    axisBorder: {
                        show: true
                    },
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: false,
                    },
                    labels: {
                        show: true,
                    },


                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                        formatter: function (val) {
                            return `$${val}`;
                        }
                    }

                },
                title: {
                    text: 'Inscritos por grupo',
                    floating: true,
                    offsetY: 330,
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                }

            }
        }
    },
    mounted: async function () {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/graphicreport/periods/money/${this.period}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        },)
        const data = await response.json()
        this.series = [{
            data: data.size
        }]
        data.groups.forEach(g => {
            this.chartOptions.xaxis.categories.push(g)
        })
    }

}
</script>