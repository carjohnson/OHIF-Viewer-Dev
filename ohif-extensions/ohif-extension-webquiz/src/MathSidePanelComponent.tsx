import React from 'react';
import { sqrt } from 'math.js';

function MathSidePanelComponent() {
    return (
        <div className="text-white w-full texst-center">
            {`The square root of four is ${sqrt(4)}`}
        </div>
    );
}

export default MathSidePanelComponent;