export const gaussianChartConfig = {
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
        },
        y: {
            formatter: (value) => `${value} people`
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: 'category',
        categories: ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM'],
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
            text: 'Average Queue Length'
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
        show: false
    }
};