import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="129" cy="120" r="108" /> 
    <rect x="26" y="247" rx="0" ry="0" width="210" height="32" /> 
    <rect x="23" y="288" rx="0" ry="0" width="224" height="74" /> 
    <rect x="26" y="376" rx="0" ry="0" width="124" height="30" /> 
    <rect x="165" y="378" rx="0" ry="0" width="83" height="27" />
  </ContentLoader>
)

export default MyLoader