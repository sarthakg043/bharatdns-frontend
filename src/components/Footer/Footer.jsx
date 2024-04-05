import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { FaYoutube } from "react-icons/fa6";
import logo from '../../assets/transparent bg_Bharat_DNS.png'

function Footer() {
  return (
    <section className="relative overflow-hidden bg-gray-900 py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">
            <a href="#">
              <div className="inline-flex items-center">
                <img src={logo} height={200} width={200} />
                <span className="ml-4 text-lg font-bold">Bharat DNS</span>
              </div>
            </a>
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap items-center">
              <li className="p-5">
                <a className="font-medium text-gray-400 hover:text-gray-300" href="#">
                  Privacy Policy
                </a>
              </li>
              <li className="p-5">
                <a className="font-medium text-gray-400 hover:text-gray-700" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="w-auto p-8">
            <div className="-m-1.5 flex flex-wrap">             
              <div className="w-auto p-1.5">
                <a href="https://youtu.be/MPd8maJ8cZQ?si=ZaiKmVZq4Y6TDduQ">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <FaYoutube />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;