import {useState} from 'react';
import {TiCancel} from 'react-icons/ti';

type Props = {
    onCancel: () => void;
}

function CancelButton({onCancel}: Props) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <button type="button" onClick={() => setShowConfirm(true)} title="Cancel"
                    className="cursor-pointer border-0">
                <TiCancel size={28} className="text-red-400"/>
            </button>
            {showConfirm && (
                <div className="z-99 fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                    <div className="bg-primary p-4 rounded-lg">
                        <div className="text-xl font-semibold italic">Are you sure you want to cancel?</div>
                        <div className="flex gap-6 mt-4 justify-center">
                            <button
                                type="button"
                                className="cursor-pointer bg-green-400 button"
                                onClick={() => {
                                    onCancel();
                                    setShowConfirm(false);
                                }}>
                                Yes
                            </button>
                            <button type="button" onClick={() => setShowConfirm(false)}
                                    className="cursor-pointer bg-red-400 button">
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default CancelButton;