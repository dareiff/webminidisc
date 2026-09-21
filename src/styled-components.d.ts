// styled-components v6 ships its own types, where `DefaultTheme` is empty by
// default. The win95 UI puts react95's theme (plus a couple of extras) on the
// ThemeProvider, so declare that here to get `useContext(ThemeContext)` typed.
import 'styled-components';
import { Theme as React95Theme } from 'react95/dist/types';

declare module 'styled-components' {
    export interface DefaultTheme extends React95Theme {
        selectedTableRow: {
            background: string;
            color: string;
        };
    }
}
