export const lineChartConfig = {
    chart: {
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
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
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
    stroke: {
        curve: 'smooth'
    },
    fill: {
        type: 'solid',
        opacity: 0.8
    },
    xaxis: {
        type: 'datetime',
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
        },
        tooltip: {
            enabled: false
        }
    },
    yaxis: {
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