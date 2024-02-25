import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'

import { Category } from '../../misc/type'
import styles from './category.module.css'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className={`max-w-sm ${styles.cardOverlay_wrapper}`}>
      <img
        alt={category.name}
        src={category.image}
        className={styles.overlayImg_transform}
      />
      <div className={`${styles.overlay} ${styles.overlay_0}`}>
        <div className={`grid gap-4 ${styles.overlayContent_transform}`}>
          <h3 className={`text-center tracking-tight text-white `}>
            {category.name}
          </h3>
          <div className={`${styles.overlay_transform} flex justify-center`}>
            <button className=' text-gray-900  bg-white focus:ring-4 focus:ring-gray-100 px-5 py-2.5 text-center text-sm font-medium rounded-full'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
