import { ReactNode } from "react";

interface RotateStyleIF {
  className: string;
  rotate: number;
  translate: string;
  children: ReactNode;
  zIndex?: string;
}
const RotateStyle = ({
  className,
  rotate,
  translate,
  children,
  zIndex,
}: RotateStyleIF) => {
  const transform = `rotate(${rotate}deg) ${translate}`;

  return (
    <div className={className} style={{ transform, zIndex }}>
      {children}
    </div>
  );
};

export default RotateStyle;

RotateStyle.defaultProps = {
  zIndex: null,
};
