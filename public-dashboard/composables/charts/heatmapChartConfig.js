export const heatmapChartConfig = {
    chart: {
        type: 'heatmap',
        toolbar: {
            show: true
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
    dataLabels: {
        enabled: false
    },
    colors: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
    xaxis: {
        type: 'category',
        categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        title: {
            text: 'Hour of Day'
        },
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
        type: 'category',
        categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        title: {
            text: 'Day of Week'
        },
        labels: {
            style: {
                colors: '#6B7280',
                fontSize: '12px',
                fontFamily: 'inherit'
            }
        }
    },
    plotOptions: {
        heatmap: {
            shadeIntensity: 0.5,
            radius: 0,
            useFillColorAsStroke: true,
            colorScale: {
                ranges: [
                    { from: 0, to: 0, color: '#F8FAFC', name: 'No Data' },
                    { from: 0.1, to: 1, color: '#E3F2FD', name: 'Very Low' },
                    { from: 1, to: 2, color: '#BBDEFB', name: 'Low' },
                    { from: 2, to: 3, color: '#90CAF9', name: 'Moderate' },
                    { from: 3, to: 4, color: '#64B5F6', name: 'High' },
                    { from: 4, to: 5, color: '#42A5F5', name: 'Very High' },
                    { from: 5, to: 10, color: '#2196F3', name: 'Peak' }
                ]
            }
        }
    },
    tooltip: {
        theme: 'light',
        y: {
            formatter: (value) => `${value} people`
        }
    },
    legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '14px',
        fontFamily: 'inherit',
        labels: {
            colors: '#374151'
        }
    }
};