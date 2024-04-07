'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'
import { Link} from "react-router-dom";
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/transparent bg_Bharat_DNS.png'


const menuItems = [
  {
    name: 'Home',
    href: '/bharatdns-frontend/',
  },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const {userLoggedIn} = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await doSignOut(); // Sign out the user
      navigate('/bharatdns-frontend/signin'); // Redirect to the signing page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const handleSignIn = async () => {
    navigate('/bharatdns-frontend/signin')
  };


  return (
    <div className="relative w-full bg-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <img src={logo} height={50} width={50} />
          </span>
          <span className="font-bold">Bharat DNS</span>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <span className='text-sm font-semibold text-gray-200 hover:text-gray-100'>
                    <Link
                    to={item.href}
                    >
                    {item.name}
                    </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
            {(userLoggedIn) ? (
              <>
                <div className='flex justify-end align-bottom'>
                  <button
                    type="button"
                    className="rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-red-800 shadow-sm hover:bg-red-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    onClick={handleSignOut}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : <>
              <div className='flex justify-end align-bottom'>
                <button
                  type="button"
                  className="rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-green-800 shadow-sm hover:bg-green-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
            </>
            }
        </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className='bg-black rounded-full '>
                      <img src={logo} height={50} width={50} />
                    </span>
                    <span className="font-bold text-black text-xl">Bharat DNS</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                {(userLoggedIn) ? (
                  <>
                    <div className='flex justify-end align-bottom'>
                      <button
                        type="button"
                        className="rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-red-800 shadow-sm hover:bg-red-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        onClick={handleSignOut}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : <>
                <div className='flex justify-end align-bottom'>
                  <button
                    type="button"
                    className="rounded-md bg-green-300 px-3 py-2 text-sm font-semibold text-green-800 shadow-sm hover:bg-green-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                </div>
              </>
              }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default Header;