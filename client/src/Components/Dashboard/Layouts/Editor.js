import React, { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Editor = (props) => {
    const editor = useRef(null);
    const config = {};

    return useMemo(
        () => (
            <JoditEditor
            
                ref={editor}
                value={props.value}
                config={config}
                onChange={props.onChange}
            />
        ),
        // eslint-disable-next-line
        []
    );
};

export default Editor;
