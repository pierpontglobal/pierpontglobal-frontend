import { createMuiTheme } from '@material-ui/core';

export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://192.168.1.6:3000' : 'https://api.pierpontglobal.com';
export const StripeKey = process.env.NODE_ENV === 'development' ? 'pk_test_mPENMxq3MENOAxDxZDVUZajS' : 'pk_live_Rnf6s2eReIqXTzHhZGFvFvMA';
export const DefaultTheme = createMuiTheme({
  palette: {
    primary: { main: '#3A3E43' }, // Purple and green play nicely together.
    secondary: { main: '#FAFAFA' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});
export const CountriesList = [
  { key: 'DO', name: { en: 'Dominican Republic', es: 'República Dominicana' } },
  { key: 'US', name: { en: 'United States', es: 'Estados Unidos' } },
];
