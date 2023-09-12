 const plugin = require('tailwindcss/plugin');
module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'nunito': ['nunito', 'sans-serif'],
            'montserrat': ['Montserrat'],
            'monument': ['Monument'],
        },
        extend: {
            backgroundImage: {
                'avg-icon': "url('/images/avgscore.png')",
                'filter-icon': "url('/images/filterBlack.png')",
                'search-icon': "url('/images/icons/Search.svg')"
            },
            width: {
                '133px': '133px',
            },
            height: {
                '135px': '135px',
                '14px' : '14px',
                '108' : '28rem',
                '128': '32rem',
                '130': '34rem',
            },
            margin: {
                '15': '60px',
                '13': '54px',
                '-negative-38': '-38rem',
            }
        },
        colors: {
            indigo: {
                light: '#2A2C42',
                DEFAULT: '#5c6ac4',
                dark: '#161623',
                gray: '#212127',
                lightgray: '#808394',
                navy: '#36384D',
                blue: '#024799',
                bluegrad: '#81C4FF',
                purple: '#552583',
                purplegrad: '#E3B2FF',
                darkblue: '#1B155C',
                darkbluegrad: '#8479FF',
                buttonblue: '#3B62F6',
                black: '#000000',
                white: '#FFFFFF',
                red: '#922020',
                green: '#61CD73',
                navbargrad1: '#4DBEEE',
                navbargrad2: '#5556A5',
                lightgreen: '#64D17A',
                darkgray: '#282828',
                lightblue: '#E6EFFF',
                yellow: '#F2C946',
                slate: '#E4E4E4'
            },
            white: {
                light: '#FFFFFF'
            },
            green: {
                pastel: '#5FE3A1'
            },
            red: {
                pastel: '#FF6565'
            },
            black: {
                dark: '#000000'
            },
            fontFamily: {
                monserat: ['Montserrat']
            }

        },
        rotate: {
            '-180': '-180deg',
            '-90': '-90deg',
            '-45': '-45deg',
            '0': '0',
            '45': '45deg',
            '90': '90deg',
            '135': '135deg',
            '180': '180deg',
            '270': '270deg',
        },
        screens: {
            'iphone5': '320px',
            'iphoneX' : '375px',
            'md' : '768px',
            'lg' : '1920px',
            'xl' : '2560px',
            '2xl' : '3840px',
        },
        animation: {
            'bounce' : 'bounce 0.75s infinite'
        },
        keyframes: {
            'bounce' : {
            '0%, 100%' : {
                'transform': 'translateY(-10.5%)',
                'animationTimingFunction': 'cubic-bezier(0.8, 0, 1, 1)'
              },
              '50%' : {
                'transform': 'translateY(0)',
                'animationTimingFunction': 'cubic-bezier(0, 0, 0.2, 1)'
              }
            }
        },
        scale: {
            '200':'2',
            '100':'1',
            '85':'.85',
            '70':'.70',
            '65':'.65',
            '60':'.60',
            '55':'.55',
        }
    },
    variants: {
        extend: {},
        scrollSnapType: ['responsive'],
    },
    plugins: [
        [require('tailwindcss-scroll-snap')],
        plugin(function({ addUtilities }){
            addUtilities({
                '.no-scrollbar::-webkit-scrollbar' : {
                    'display' : 'none',
                },
                '.no-scrollbar' : {
                    '-ms-overflow-style' : 'none',
                    'scrollbar-width': 'none',
                },
            })
        })
    ],
    content: ['./styles/globals.css'],
};
