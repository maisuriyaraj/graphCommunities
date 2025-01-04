"use client";
import React, { useEffect } from 'react';
// import avatar from '../../../../../public/user.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { removeCookies } from '../../../utils/CookiesService';
// import '../../global.css';
export default function SideNav() {

  const navigate = useNavigate();
  const path = useLocation().pathname;

  function goToHome(path) {
    navigate(path);
  }

  function logOutUser() {
    removeCookies();
    navigate('/signin');
    window.location.reload();
  }

  function openCloseSideNav() {
    let nav = document.getElementById('sideNav');
    if (nav) {
      nav.classList.add('hide');
      nav.classList.remove('show');
    }
  }


  return (

    <>
      <div className='bg-white fixed border top-0 border-solid border-r-[#e5e7eb] left-0 h-[100vh] py-4 show z-50' id='sideNav'>
        <div className="p-6 flex justify-center items-center cursor-pointer text-start space-x-3">
        </div>
        <div className='flex flex-col items-center justify-center border-b mt-2 p-8 cursor-pointer relative'>
          <div className='border image-section rounded-[50%] p-2' >
            <img src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="rounded-[50%] object-cover" alt='avatar' width={100} />
          </div>
          <div className='text-center mt-1'>
            {/* <p className='font-bold text-xl'>{userData?.userName}</p> */}
            <span className='text-sm font-semibold text-gray-600'>Co-Manager</span>
          </div>
        </div>
        <div className="flex flex-col border-b">
          <ul className='p-2'>
            {/* <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path === '/dashboard' ? 'text-white' : ''} mt-1`}>
              <Link href="/dashboard"><p className='flex justify-between cursor-pointer'>
                Dashboard
                <i className="bi bi-body-text"></i>
              </p></Link>
            </li> */}
            <li className={`p-3 rounded-lg transition-all nav-link-1 cursor-pointer  ${path === '/questions' ? 'text-white bg-green-500' : 'hover:bg-gray-200'} mt-1`}>
              <Link to="/questions"><p className='flex justify-between cursor-pointer'>
                Questions
                <i className="bi bi-patch-question"></i>
              </p></Link>
            </li>
            <li className={`p-3 rounded-lg transition-all nav-link-1 cursor-pointer  ${path === '/feed' ? 'text-white bg-green-500' : 'hover:bg-gray-200'} mt-1`}>
              <Link to="/feed"><p className='flex justify-between cursor-pointer'>
                Explore
                <i className="bi bi-compass"></i>
              </p></Link>
            </li>
            <li className={`p-3 rounded-lg transition-all nav-link-1 cursor-pointer  ${path === '/articles' ? 'text-white bg-green-500' : 'hover:bg-gray-200'} mt-1`}>
              <Link to="/articles"><p className='flex justify-between cursor-pointer'>
                Articles
                <i className="bi bi-layout-text-sidebar-reverse"></i>
              </p></Link>
            </li>
            <li className={`p-3 rounded-lg transition-all nav-link-1 cursor-pointer  ${path === '/collections' ? 'text-white bg-green-500' : 'hover:bg-gray-200'} mt-1`}>
              <Link to="/collections" ><p className='flex justify-between cursor-pointer'>
                Collections
                <i className="bi bi-collection-play"></i>
              </p></Link>
            </li>
            <li className={`p-3 rounded-lg transition-all nav-link-1 cursor-pointer  ${path === '/communities' ? 'text-white bg-green-500' : 'hover:bg-gray-200'} mt-1`}>
              <Link to="/communities"><p className='flex justify-between cursor-pointer'>
                Community
                <i className="bi bi-people"></i>
              </p></Link>
            </li>
            <li className={`p-3 rounded-lg transition-all nav-link-1 cursor-pointer  ${path === '/graphAI' ? 'text-white bg-green-500' : 'hover:bg-gray-200'} mt-1`}>
              <Link to="graphAI">
                <p className='flex justify-between cursor-pointer'>
                  GraphAI
                  <i className="bi bi-robot"></i>
                </p>
              </Link>
            </li>
            <li className={`p-3 rounded-lg transition-all nav-link-1 cursor-pointer hover:bg-gray-200 mt-1`}>
              <a type='button' onClick={logOutUser}>
                <p className='flex justify-between cursor-pointer'>
                  Logout
                  <i className='bi bi-box-arrow-left'></i>
                </p></a>
            </li>
          </ul>
        </div>
      </div>
    </>


  )
}
