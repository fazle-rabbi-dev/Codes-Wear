import { useEffect } from 'react'
import { FaTshirt } from 'react-icons/fa';
import { AiFillCar } from 'react-icons/ai';
import { BiMoneyWithdraw } from 'react-icons/bi';

const Home = () => {
  
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900"> Wear The Code </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="text-center xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-200 text-pink-500 mb-4">
                  <FaTshirt/>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Premium Tshirts</h2>
                <p className="leading-relaxed text-base">
                  Our T-Shirts are 100% made of cotton.
                </p>
              </div>
            </div>
            <div className="w-full text-center xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <AiFillCar/>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Free Shiping</h2>
                <p className="leading-relaxed text-base">
                  We ship all over India for FREE.
                </p>
              </div>
            </div>
            <div className="text-center xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <BiMoneyWithdraw/>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exciting Offers</h2>
                <p className="leading-relaxed text-base">
                  We provide amazing offers & discounts on our products.
                </p>
              </div>
            </div>
            <div className="text-center xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-6 h-6" viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
              </div>
            </div>
          </div>
        </div>
      </section>      
    </div>
  )
}

export default Home
