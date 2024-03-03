import { useSelector } from 'react-redux'
import { selectAllCategories } from '../category/categorySlice'
import { Link } from 'react-router-dom'

import catImg from '../../images/pacto-visual-cWOzOnSoh6Q-unsplash.jpg'
import styles from './styles.module.css'

export default function HeroWithImage() {
  const categories = useSelector(selectAllCategories)
  return (
    <section className='bg-white dark:bg-black'>
      <div className='grid px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 grid-cols-12'>
        <div className={`${styles.hero_content} grid place-content-around	`}>
          <div
            className={`px-2 md:mx-auto justify-items-center ${styles.grid_center}`}
          >
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white'>
              One-Up the Weather
            </h1>

            <p className='text-center max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-white'>
              What you’re doing, where you’re going and how much you can pack
              are all serious considerations when deciding what kind of
              insulation you need. Our line of insulated jackets covers every
              kind of cold.
            </p>
            {categories && (
              <div className='grid grid-cols-2 gap-4 md:gap-8'>
                <Link
                  to={`/shop/${categories[0].id}`}
                  className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 rounded-full bg-white focus:ring-4 focus:ring-gray-100'
                >
                  {categories[0].name}
                </Link>
                <Link
                  to={`/shop/${categories[1].id}`}
                  className='inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900  rounded-full bg-white focus:ring-4 focus:ring-gray-100'
                >
                  {categories[1].name}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className={`lg:mt-0 col-span-12 lg:flex ${styles.hero_img}`}>
          <img src={catImg} alt='hero cat image' />
        </div>
      </div>
    </section>
  )
}
