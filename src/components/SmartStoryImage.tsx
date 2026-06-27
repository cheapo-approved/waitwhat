"use client";

import { useState } from "react";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

export default function SmartStoryImage({
  folder,
  name,
  alt,
  className,
}: {
  folder: string;
  name: string;
  alt: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  const src = `/images/${folder}/${name}.${EXTENSIONS[index]}`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        if (index < EXTENSIONS.length - 1) {
          setIndex(index + 1);
        }
      }}
    />
  );
}