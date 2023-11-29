import React from 'react'

const OutOfStock = ({name}) => {
  return (
    <div class="md:flex justify-center items-center">
      <img class="rounded mx-auto w-[90%] md:w-[50%] h-auto md:h-[50%] ring ring-1 ring-pink-500" src="/out_of_stock.jpeg" alt="" />
      <p class="mt-3 text-sm text-center mx-4 md:my-auto md:text-lg">Sorry, all the <span class="font-bold underline">{name}</span> are currently out of the stock.New stock are comming soon.Stay tuned!</p>
    </div>
  )
}

export default OutOfStock
