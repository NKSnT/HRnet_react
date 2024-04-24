import { createContext } from 'react';

export const DataContext = createContext({
    data: undefined,
    setData: () => {}
});
