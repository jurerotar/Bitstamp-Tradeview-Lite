module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'gray-550': '#313337',
                'gray-750': '#1C1D20',
                'gray-1000': '#18191B',
                'green-default': '#159f49',
                'red-default': '#df4249',
            },
            gridTemplateRows: {
                'tablet-auto': 'auto auto auto'
            },
            height: {
                'min-content': 'min-content'
            },
            maxHeight: {
                '120': '30rem',
                'widescreen': 'calc(100vh - 112px)',
                'trades': 'calc(100vh - 154px)',
                'none': 'none',
            },
            minHeight: {
                'xs': '15rem'
            },
            maxWidth: {
                'pairs': '500px'
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
