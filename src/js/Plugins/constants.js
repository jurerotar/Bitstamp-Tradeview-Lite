export const breakpoints = {
    'sm': 600,
    'md': 768,
    'lg': 1020,
    'xl': 1280,
    '2xl': 1536
}

export const graphOptions = {
    layout: {
        backgroundColor: '#18191B'
    },
    timeScale: {
        timeVisible: true,
    },
    priceScale: {
        position: 'left',
        mode: 2,
        autoScale: true,
        invertScale: true,
        alignLabels: false,
        borderVisible: false,
        borderColor: '#555ffd',
        scaleMargins: {
            top: 0.30,
            bottom: 0.25,
        },
    },
    grid: {
        vertLines: {color: '#ccc', lineStyle: 2, visible: true,},
        horzLines: {color: '#ccc', lineStyle: 2, visible: true,}
    }
}