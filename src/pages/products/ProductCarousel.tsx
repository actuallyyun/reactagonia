import { Carousel } from 'flowbite-react'

export default function ProductCarousel({
  images
}: {
  images: string[] | undefined
}) {
  if (!images) {
    return null
  }
  return (
    <div className='h-96'>
      <Carousel>
        {images &&
          images.map((img) => {
            return (
              <div className='flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white'>
                <img src={img} alt='product' key={img} />
              </div>
            )
          })}
      </Carousel>
    </div>
  )
}
