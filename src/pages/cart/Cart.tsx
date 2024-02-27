import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Table } from 'flowbite-react'

import ClearCart from '../../components/cart/ClearCart'
import { selectAllItems, updateQuantity } from '../../components/cart/cartSlice'
import RemoveFromCart from '../../components/cart/RemoveFromCart'
import { CartItem } from '../../misc/type'

import { useGetSingleProductQuery } from '../../services/fakeStore'
import { removeItem } from '../../components/cart/cartSlice'

export type CartItemProp = {
  item: CartItem
}
export const CartItemCard = ({ item }: CartItemProp) => {
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity((prev) => (prev = parseInt(e.target.value)))
  }
  const dispatch = useDispatch()
  const handleUpdate = (id: number) => {
    dispatch(
      updateQuantity({
        productId: id,
        quantity: quantity
      })
    )
  }
  const { data } = useGetSingleProductQuery(item.productId)

  const handleRemove = (id: number) => {
    dispatch(removeItem(id))
  }

  return (
    <>
      <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
        <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
          {data?.title}
        </Table.Cell>
        <Table.Cell>{data?.category.name}</Table.Cell>
        <Table.Cell>${data?.price}</Table.Cell>
        <Table.Cell>
          <input
            type='number'
            value={quantity}
            max={10}
            min={1}
            onChange={handleQuantityChange}
            name={data?.title}
          />
        </Table.Cell>
        <Table.Cell>
          <button
            onClick={() => handleUpdate(item.productId)}
            className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          >
            Update
          </button>
          <button onClick={() => handleRemove(item.productId)}>Remove</button>
        </Table.Cell>
      </Table.Row>
    </>
  )
}

export default function Cart() {
  const items = useSelector(selectAllItems)
  return (
    <div className='overflow-x-auto '>
      {!items.length && <p>Your cart is empty</p>}
      {items.length && (
        <Table hoverable className=''>
          <Table.Head>
            <Table.HeadCell>Product name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>
              <span className='sr-only'>Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className='divide-y'>
            {items.length &&
              items.map((item) => {
                return <CartItemCard item={item} key={item.productId} />
              })}
          </Table.Body>
        </Table>
      )}
      <div className='container py-6 w-9/12'>
        <div className='grid grid-cols-2 gap-4'>
          <ClearCart />
          <Link
            to='/'
            className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}


