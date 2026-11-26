import type { SVGProps } from 'react';

export interface LogoEmblemProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

const SCALLOP_10_PATH =
  'M24 3C26.4 3 28.4 4.6 30.2 5.4C32.2 6.3 34.7 5.7 36.4 7.1C38.1 8.5 38.2 11.1 39.4 12.8C40.7 14.6 43.2 15.6 43.8 17.8C44.4 20 42.9 22.3 42.9 24.5C42.9 26.7 44.4 29 43.8 31.2C43.2 33.4 40.7 34.4 39.4 36.2C38.2 37.9 38.1 40.5 36.4 41.9C34.7 43.3 32.2 42.7 30.2 43.6C28.4 44.4 26.4 46 24 46C21.6 46 19.6 44.4 17.8 43.6C15.8 42.7 13.3 43.3 11.6 41.9C9.9 40.5 9.8 37.9 8.6 36.2C7.3 34.4 4.8 33.4 4.2 31.2C3.6 29 5.1 26.7 5.1 24.5C5.1 22.3 3.6 20 4.2 17.8C4.8 15.6 7.3 14.6 8.6 12.8C9.8 11.1 9.9 8.5 11.6 7.1C13.3 5.7 15.8 6.3 17.8 5.4C19.6 4.6 21.6 3 24 3Z';

export function LogoEmblem({ size = 36, ...rest }: LogoEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
      {...rest}
    >
      <path
        d={SCALLOP_10_PATH}
        fill="#F2BEB3"
        stroke="#32221F"
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={24}
        cy={24.5}
        r={14.5}
        fill="#FDFBF8"
        stroke="#B6493B"
        strokeWidth={1.2}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M17.5 29C19.5 22.5 28.5 22.5 30.5 29"
        stroke="#32221F"
        strokeWidth={1.6}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={24}
        cy={19.5}
        r={2.5}
        fill="#C89F62"
        stroke="#32221F"
        strokeWidth={1.2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
