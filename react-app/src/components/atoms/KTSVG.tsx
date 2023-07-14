import React from 'react';
import SVG from 'react-inlinesvg';

type Props = {
  path: string;
  className?: string;
  svgClassName?: string;
};

const KTSVG: React.FC<Props> = ({ className = '', path, svgClassName = 'mh-50px' }) => {
  return (
    <span className={`svg-icon ${className}`}>
      <SVG className={svgClassName} src={path} />
    </span>
  );
};

export { KTSVG };
