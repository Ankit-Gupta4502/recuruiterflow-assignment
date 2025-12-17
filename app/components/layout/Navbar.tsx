import React from 'react'
import { classNameMerger } from '~/utils'
import { Link, useLocation } from 'react-router'
const Navbar = () => {
    const { pathname } = useLocation()
    return (
        <div className="bg-gray-50 px-1 md:px-0 ">
            <div className=' py-6 flex items-center justify-between container mx-auto' >
                <h1 className=' font-medium lg:text-3xl text-sm' >Shipping Calculator</h1>

                <div className="flex items-center space-x-1 md:space-x-4">
                    <Link to="/" className={classNameMerger(' rounded-md text-xs  md:text-sm  px-2.5 md:px-4 py-2', pathname === "/" ? "bg-blue-950  text-white" : " text-dark  ")} >
                        Add Box
                    </Link>

                    <Link to="/orders" className={classNameMerger(' text-xs  md:text-sm  rounded-md px-2.5  md:px-4 py-2', pathname === "/orders" ? "bg-blue-950  text-white" : " text-dark  ")}>
                        View Boxes
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar