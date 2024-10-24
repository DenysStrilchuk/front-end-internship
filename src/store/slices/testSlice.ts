import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ITestState {
    testString: string;
}

const initialState: ITestState = {
    testString: 'Initial test string',
};

const testSlice = createSlice({
    name: 'testSlice',
    initialState,
    reducers: {
        setTestString: (state, action: PayloadAction<string>) => {
            state.testString = action.payload;
        },
    },
});

const { reducer: testReducer, actions } = testSlice;

const testActions = {
    ...actions,
};

export {
    testReducer,
    testActions,
};
