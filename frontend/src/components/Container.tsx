import {mergeClassName} from '../utils.ts';

interface CustomComponentProps {
    children?: React.ReactNode
    className?: string
}

function Container(props: CustomComponentProps) {
    return (
        <div className={mergeClassName("px-6 py-3 max-w-screen-lg mx-auto", props.className)}>
            {props.children}
        </div>
    );
}

export default Container;