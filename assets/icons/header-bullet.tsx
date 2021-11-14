import * as React from "react"

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.3}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.47 2.97a2.068 2.068 0 00-.43-.41v5.72c0 .376.312.68.697.68h4.423l-4.69-5.99zm-4.91 26.47a4.48 4.48 0 004.049-2.56H13.44a5.76 5.76 0 01-5.76-5.76V7.04c0-.202.01-.402.03-.599a4.48 4.48 0 00-3.87 4.439v14.08a4.48 4.48 0 004.48 4.48h10.24z"
        fill="#121354"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.76 2.56v5.76c0 1.06.86 1.92 1.92 1.92h4.48v10.88a4.48 4.48 0 01-4.48 4.48H13.44a4.48 4.48 0 01-4.48-4.48V7.04a4.48 4.48 0 014.48-4.48h8.32z"
        fill="#121354"
      />
    </svg>
  )
}

export default SvgComponent
