import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import React from 'react';

interface EmojiProps {
    setComment: (comment: string) => void;
    comment: string;
}

const Emoji: React.FC<EmojiProps> = ({ setComment, comment }) => {
    const handleEmojiSelect = (e: React.MouseEvent | React.TouchEvent) => {
        if ('native' in e) {
            setComment(comment + e.native);
        }
    };

    return (
        <>
            <Picker
                data={data}
                previewPosition='none'
                theme='light'
                showSkinTones={true}
                showPreview={false}
                onEmojiSelect={handleEmojiSelect}
            />
        </>
    );
};

export default Emoji;
