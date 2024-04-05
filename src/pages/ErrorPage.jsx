'use client'

import React from 'react'
import { Menu, X, ArrowLeft } from 'lucide-react'
import logo from '../assets/transparent bg_Bharat_DNS.png'
import { Link } from 'react-router-dom'

const menuItems = [
  {
    name: 'Home',
    href: '/bharatdns-frontend/',
  },
]

export function ErrorPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-2 md:px-4">
      <div className="my-12 flex items-center justify-center px-2 md:my-24 md:px-0">
        <div className="lg:flex lg:items-center lg:space-x-10">
          <img
            src="https://illustrations.popsy.co/white/resistance-band.svg"
            alt="question-mark"
            className="h-[300px] w-auto"
          />
          <div>
            <p className="mt-6 text-sm font-semibold text-white">404 error</p>
            <h1 className="mt-3 text-2xl font-semibold text-gray-200 md:text-3xl">
              We can&apos;t find that page
            </h1>
            <p className="mt-4 text-gray-500">
              Sorry, the page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="mt-6 flex items-center space-x-3">
              <Link to={'/bharatdns-frontend/'}>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft size={16} className="mr-2" />
                Go back
              </button>
              </Link>
              <a type='button' 
              href='https://www.linkedin.com/in/sarthak-gupta-webdev/' 
              target='_blank'
              className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              rel="noopener noreferrer"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* footer */}
      <div className="mx-auto flex max-w-7xl justify-center">
      </div>
    </div>
  )
}
