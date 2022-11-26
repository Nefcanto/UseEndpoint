const defaultTheme = require('tailwindcss/defaultTheme')
const xs = '360px'

const withOpacity = (colorVariable) => {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rbga(var(${colorVariable}), ${opacityValue})`
        }
        return `rgb(var(${colorVariable}))`
    }
}

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        screens: {
            'xs': xs,
            ...defaultTheme.screens,
        },
        extend: {
            animation: {
                wiggle: 'wiggle 5s infinite'
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': {
                        transform: 'translateY(0.5rem) scale(0.5)'
                    },
                    '50%': {
                        transform: 'translateY(0) scale(0.5)'
                    }
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
    important: true
}

const { sm, md, lg, xl } = defaultTheme.screens
const xxl = defaultTheme.screens['2xl']

module.exports.xs = xs.replace('px', '') * 1;
module.exports.sm = sm.replace('px', '') * 1;
module.exports.md = md.replace('px', '') * 1;
module.exports.lg = lg.replace('px', '') * 1;
module.exports.xl = xl.replace('px', '') * 1;
module.exports.xxl = xxl.replace('px', '') * 1;
module.exports.breakpoints = {
    'xs': xs,
    ...defaultTheme.screens,
}
