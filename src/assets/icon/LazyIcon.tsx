// SVG 컴포넌트 Lazy Loading

import React, { Suspense } from "react";

type LazyIconProps = {
  name: string;
} & React.SVGProps<SVGSVGElement>;

const LazyIcon = ({ name, ...rest }: LazyIconProps) => {
  const IconComponent = React.lazy(() => import(`./${name}.svg?react`));

  return (
    <Suspense fallback={<div className="h-full w-full animate-pulse bg-gray-100" />}>
      <IconComponent {...rest} />
    </Suspense>
  );
};

export default LazyIcon;
