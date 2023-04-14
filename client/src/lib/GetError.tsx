import { FC } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Danger, Success, Warning } from './Alerts';

interface ErrorProps {
    error: FetchBaseQueryError | SerializedError | undefined;
    danger?: Boolean;
    success?: Boolean;
    warning?: Boolean;
}

const GetError: FC<ErrorProps> = ({ error, danger, success, warning }) => {
    if (error) {
        if ('data' in error) {
            const errMsg = (error as { data: { msg?: string } }).data?.msg
            return (
                <>
                    {danger && <Danger error={errMsg} />}
                    {success && <Success error={errMsg} />}
                    {warning && <Warning error={errMsg} />}
                    {(!danger && !warning && !success) &&
                        <span className="text-red-500 pb-3 font-poppins text-center font-medium">{errMsg}</span>
                    }
                </>
            );
        } else {
            return null;
        }
    } else {
        return null;
    }
};

export default GetError;
