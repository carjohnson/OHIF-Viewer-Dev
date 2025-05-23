import React from "react";
import { Button, Label } from '@ohif/ui';

function BtnComponent() {

  const handleButtonClick = () => {
    alert('Button was clicked');

  }

    return (
      <div>
        <div>
          <Label>Quiz questions here</Label>
        </div>
        <br/>
        <div>
          <Button onClick={handleButtonClick}>Submit</Button>
        </div>
   </div>
  );
}

export default BtnComponent
