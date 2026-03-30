import { createTheme } from '@mui/material/styles';
import shadow from './shadow';
import typography from './typography';
import { alphaZoneColors, alphaZoneRadius } from '../../lib/alphaZone';

/**
 * LIGHT THEME (DEFAULT)
 */
const light = {
	palette: {
		mode: 'light' as const,
		background: {
			default: alphaZoneColors.canvas,
			paper: '#FFFFFF',
		},
		primary: {
			contrastText: alphaZoneColors.ink,
			main: alphaZoneColors.mint,
		},
		secondary: {
			contrastText: '#FFFFFF',
			main: alphaZoneColors.slate,
		},
		text: {
			primary: alphaZoneColors.ink,
			secondary: alphaZoneColors.textSoft,
		},
		divider: alphaZoneColors.line,
	},
	shape: {
		borderRadius: alphaZoneRadius,
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: alphaZoneRadius,
					backgroundImage: 'none',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: alphaZoneRadius,
					backgroundImage: 'none',
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 999,
					paddingInline: '1.4rem',
					paddingBlock: '0.78rem',
				},
				containedPrimary: {
					color: alphaZoneColors.ink,
					backgroundColor: alphaZoneColors.mint,
					'&:hover': {
						backgroundColor: alphaZoneColors.mintStrong,
					},
				},
				containedSecondary: {
					backgroundColor: alphaZoneColors.slate,
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: alphaZoneRadius,
					backgroundColor: 'rgba(255,255,255,0.9)',
				},
				notchedOutline: {
					borderColor: 'rgba(69,123,157,0.12)',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: 999,
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					minHeight: 52,
					borderRadius: 999,
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%', scrollBehavior: 'smooth' },
				body: {
					background:
						'radial-gradient(circle at top, rgba(168,218,220,0.28) 0%, rgba(247,251,248,1) 38%, rgba(241,250,238,1) 100%)',
					height: '100%',
					minHeight: '100%',
				},
				'#root': {
					minHeight: '100%',
				},
			},
		},
	},
	shadow,
	typography,
};

// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

export default theme;
