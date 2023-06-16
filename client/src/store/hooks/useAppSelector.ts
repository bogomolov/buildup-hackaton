import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from 'src/store/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
