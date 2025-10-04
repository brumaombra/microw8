export const barChartConfig = {
    chart: {
        type: 'bar',
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        },
        fontFamily: 'inherit',
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800
        },
        background: 'transparent'
    },
    colors: ['#3B82F6'],
    plotOptions: {
        bar: {
            borderRadius: 4,
            columnWidth: '60%'
        }
    },
    grid: {
        borderColor: '#E5E7EB',
        strokeDashArray: 4,
        xaxis: {
            lines: {
                show: true
            }
        },
        yaxis: {
            lines: {
                show: true
            }
        }
    },
    tooltip: {
        theme: 'light',
        x: {
            show: true
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: 'category',
        categories: [],
        labels: {
            style: {
                colors: '#6B7280',
                fontSize: '12px',
                fontFamily: 'inherit'
            }
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        title: {
            text: 'Queue Length'
        },
        labels: {
            style: {
                colors: '#6B7280',
                fontSize: '12px',
                fontFamily: 'inherit'
            }
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '14px',
        fontFamily: 'inherit',
        labels: {
            colors: '#374151'
        }
    }
};