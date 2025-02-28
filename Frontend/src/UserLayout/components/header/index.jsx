import './header.css'
export default function MainHeader(props) {

  return (
    <div className='z-[1111] bg-white border border-solid  fixed top-0 py-4' id="headerMain">
      <nav className="w-screen flex justify-between items-center px-4">
        <div className="cursor-pointer text-start space-x-3">
          <h2 className=" logo" id='logo'>
            Graph <span>Community</span>
          </h2>
        </div>
        <div className="w-auto flex items-center justify-end h-12">
          <div className="mx-3 flex gap-2 relative cursor-pointer lg:hidden">
            <button ><i className="bi bi-list text-3xl"></i></button>
          </div>
          <div className="mx-3 flex gap-2 relative cursor-pointer">
            <i className="bi bi-search text-2xl"></i>
          </div>
          <div className="mx-3 flex gap-2 relative cursor-pointer">
            <button>
             <i className="bi bi-calendar4-range text-2xl" ></i>
            </button>
          </div>

          <div className="mx-2 relative cursor-pointer">
            <i className="bi bi-bell text-2xl"></i>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-600"></div>
          </div>
            <button className='bg-green-600 rounded-lg text-sm text-white py-3 px-3 font-semibold'>Add Post</button>
        </div>
      </nav>
    </div>
    
  )
}
