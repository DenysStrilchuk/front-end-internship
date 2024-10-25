import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from "../../hooks";
import {testActions} from "../../store/slices";

const TestComponent = () => {
    const testString = useAppSelector((state) => state.test.testString);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>('');

    return (
        <div>
            <h1>{testString}</h1>
            <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={() => dispatch(testActions.setTestString(inputValue))}>
                Change String
            </button>
        </div>
    );
};

export { TestComponent };
