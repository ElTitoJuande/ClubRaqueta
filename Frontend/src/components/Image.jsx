import React from "react";

const Image = ({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
  priority = false,
  objectFit = "cover",
}) => {
  const imgStyle = {
    objectFit: objectFit,
    ...(fill && {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    }),
  };

  // Atributos de carga prioritaria si es necesario
  const priorityProps = priority ? { fetchPriority: "high", loading: "eager" } : {};

  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      style={imgStyle}
      {...priorityProps}
    />
  );
};

export default Image;
