import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="135" cy="135" r="125" />
    <rect x="2" y="269" rx="14" ry="14" width="280" height="20" />
    <rect x="3" y="299" rx="15" ry="15" width="280" height="88" />
    <rect x="95" y="344" rx="0" ry="0" width="1" height="0" />
    <rect x="15" y="406" rx="14" ry="14" width="95" height="30" />
    <rect x="128" y="400" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
