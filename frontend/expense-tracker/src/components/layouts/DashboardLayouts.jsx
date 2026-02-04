import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar'
import SideMenu from './SideMenu'

const DashboardLayouts = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext)

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        {user && (
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
        )}

        <div className="grow mx-5">
          {children}   {/* ✅ HOME will show */}
        </div>
      </div>
    </div>
  )
}


export default DashboardLayouts
