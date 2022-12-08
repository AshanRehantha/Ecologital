import React, { useState } from 'react';

const useInputs = callback => {
    const [value, setValue] = useState(() => {});
    return {
        value,
        onchange:e => {
            setValue({
                ...value,
                [e.target.name]: e.target.value
            })
        }
    }
}

export default useInputs;
