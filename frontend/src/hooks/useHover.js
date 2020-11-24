import {useState, useEffect, useRef} from "react";

function useHover(element) {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    // console.log(ref)
    function enter() {
        setHovered(true);
    }

    function leave() {
        setHovered(false);
    }

    useEffect(() => {
        ref.current.addEventListener('mouseenter', enter);
        ref.current.addEventListener('mouseleave', leave);

        return () => {
            if (ref.current) {
                ref.current.removeEventListener('mouseenter', enter);
                ref.current.removeEventListener('mouseleave', leave);
            }
        }
    }, [ref]);

    return [hovered, ref];
        
}

export default useHover;