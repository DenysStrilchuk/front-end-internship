import React, {useState} from 'react';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {testActions} from "../../store/slices";
import {checkStatus} from "../../api/status-api";

const TestComponent = () => {
    const testString = useAppSelector((state) => state.test.testString);
    const dispatch = useAppDispatch();
    const [inputValue, setInputValue] = useState<string>('');
    const [status, setStatus] = useState<{ code: number; detail: string; result: string } | null>(null);

    const checkServerStatus = async () => {
        try {
            const status = await checkStatus();
            setStatus({
                code: status.status_code,
                detail: status.detail,
                result: status.result
            });
        } catch (error) {
            console.error('Failed to check server health:', error);
            setStatus({
                code: -1,
                detail: 'Failed to retrieve status',
                result: 'Error'
            });
        }
    };

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

            <button onClick={checkServerStatus}>Check Server Health</button>

            {status && (
                <div>
                    <p>Server Health Status Code: {status.code}</p>
                    <p>Detail: {status.detail}</p>
                    <p>Result: {status.result}</p>
                </div>
            )}
        </div>
    );
};

export {TestComponent};
