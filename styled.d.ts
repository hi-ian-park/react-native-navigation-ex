// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    text: string;
    background: string;
    tint: string;
    inactive: string;
    textInputBackground: string;
    textInputText: string;
  }
}
