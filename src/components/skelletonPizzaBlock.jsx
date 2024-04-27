import React from "react";
import ContentLoader from "react-content-loader";

const Skeletone = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" />
    <rect x="0" y="293" rx="16" ry="16" width="280" height="28" />
    <rect x="-2" y="336" rx="15" ry="15" width="280" height="70" />
    <rect x="1" y="419" rx="15" ry="15" width="133" height="20" />
    <rect x="145" y="412" rx="25" ry="25" width="119" height="50" />
  </ContentLoader>
);

export default Skeletone;
