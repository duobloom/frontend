import { forwardRef } from "react";

const IconDotHorizontal = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="icn-dot-horizontal">
      <circle id="Vector" cx="12" cy="12" r="2" fill="#212721" />
      <circle id="Vector_2" cx="5" cy="12" r="2" fill="#212721" />
      <circle id="Vector_3" cx="19" cy="12" r="2" fill="#212721" />
    </g>
  </svg>
));
IconDotHorizontal.displayName = "IconDotHorizontal";

export default IconDotHorizontal;
