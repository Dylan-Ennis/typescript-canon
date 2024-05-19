import React from "react";
import { useState } from "react";

const Expand = () => {
    const [open, setOpen] = useState(false);

    const expand =() => {
        setOpen(!open);
    };

    return (
        <div>
            <button onClick={expand}>Expand</button>
            {open && <div>Expand Me</div>}
        </div>
    );
};

export default Expand;