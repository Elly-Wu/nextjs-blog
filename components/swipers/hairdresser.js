import React, { useEffect, useState } from 'react'

export default function HairdresserSwiper() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    'images/hairdresser.png',
    'images/hairdresser2.png',
    'images/hairdresser3.png',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [currentImage])

  return (
    <>
      <div>
        <img src={images[currentImage]} className="mySwiper" alt="slider" />
      </div>

      <style jsx>
        {`
          .mySwiper {
            height: 260px;
            max-height: 22vh;
            width: 100%;
            -o-object-fit: cover;
              object-fit: cover;
            filter: grayscale(1);
          }
          .mySwiper:hover {
            filter: none;
          }
        `}
      </style>
    </>
  )
}
