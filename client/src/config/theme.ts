// Material Ui 5 theme

export default function getDesignTokens(mode : string) : object {
   return {
      palette: {
         mode,
         primary: {
            main: '#af2d2d',
         },
         secondary: {
            main: '#17a2b8',
         },
         background: {
            ...(mode === 'dark'
               ? {
                    default: '#131313',
                    paper: '#272727',
                 }
               : {
                    default: '#f2f2f2',
                    paper: '#fff',
                 }),
         },
         text: {
            ...(mode === 'dark'
               ? {
                    primary: '#ffffff',
                 }
               : {
                    primary: '#000000',
                 }),
         },
      },
      props: {
         MuiAppBar: {
            color: 'default',
         },
      },
      shape: {
         borderRadius: 9,
      },
   };
}
