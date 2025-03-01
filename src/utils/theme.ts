// import { createTheme } from "@mui/material/styles";


// export const themeModes = {
//     dark: "dark",
//     light: "light",
// };

// export const lightTheme = createTheme({
//     palette: {
//         mode: "light",
//         primary: {
//             main: "#1976d2",
//             light: "#fff"
//         },
//         secondary: {
//             main: "#dc004e",
//         },
//         text: {
//             primary: '#111827',
//             secondary: '#4b5563'
//         },
//         background: {
//             default: '#ffffff',
//             paper: '#f3f4f6'
//         }
//     },
// });

// export const darkTheme = createTheme({
//     palette: {
//         mode: "dark",
//         primary: {
//             main: "#90caf9",
//         },
//         secondary: {
//             main: "#f48fb1",
//         },
//         text: {
//             primary: '#f9fafb',
//             secondary: '#d1d5db'
//         },
//         background: {
//             default: '#111827',
//             paper: '#1f2937'
//         }
//     },
// });
import { createTheme } from "@mui/material/styles";

export const themeModes = {
    dark: "dark",
    light: "light"
}

const themeConfigs = {
    custom: ({ mode }: any) => {
        const customPallete = mode === themeModes.dark ? {
            primary: {
                main: "#6b0303",
                button: "#a31414",
                contastText: "#ffffff"
            },
            secondary: {
                main: "#ff0000",
                contastText: "#ffffff"
            },
            background: {
                default: '#111827',
                paper: '#1f2937'
            },
            text: {
                primary: "#ffffff",
                secondary: "#a0a0a0"
            }
        } : {
            primary: {
                main: "#6b0303",
                button: "#a31414",
            },
            secondary: {
                main: "#ff0000",
            },
            background: {
                default: '#ffffff',
                paper: '#f3f4f6'
            },
            text: {
                primary: "#000000",
                secondary: "#a0a0a0"
            }
        }

        return createTheme({
            palette: {
                mode,
                ...customPallete
            },
            components: {
                MuiButton: {
                    defaultProps: { disableElevation: true }
                }
            }
        })
    }
}

export default themeConfigs;