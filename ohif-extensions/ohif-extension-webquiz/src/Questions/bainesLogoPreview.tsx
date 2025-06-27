import React from 'react';
import baineslogo from '../../assets/BainesTransparentTiny.png';

type ImageIconProps = React.ImgHTMLAttributes<HTMLImageElement>;

// for debugging the display of the logo
// render the logo without adding it to the Icons list
const BainesLogoPreview = () => {
  const BainesLogoIcon = (props: ImageIconProps) => {
    const { width = 22, height = 22, ...rest } = props;
    return <img src={baineslogo} width={width} height={height} {...rest} />;
  };

  return (
    <div>
      <h4>Logo Preview:</h4>
      <BainesLogoIcon />
    </div>
  );
};

export default BainesLogoPreview;