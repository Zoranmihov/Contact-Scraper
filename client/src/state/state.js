import { createGlobalState } from 'react-hooks-global-state';

 const {setGlobalState, useGlobalState} = createGlobalState({
    companyData: null
 })

 export {setGlobalState, useGlobalState}