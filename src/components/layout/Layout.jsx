'use client'

import Breadcrumb from "../breadcrumb/breadcrumb";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";

const Layout = (props) => {
  const router = useRouter();
  const { breadcrumb, title, children, fullscreen = false, extraContent = null, logoutBtn = true } = props;

  const handleLogOut = () => {
    router.push('/auth');
  };

  return (
    <div>
      {!fullscreen && <SideBar />}
      <div className="pt-2" style={{ marginLeft: fullscreen ? '.5rem' : '18rem', marginRight: '.5rem' }}>
        <div className="flex justify-between">
          <div>
            {breadcrumb && <Breadcrumb paths={breadcrumb} />}
            {title && <span className="font-semibold text-lg">{title}</span>}
          </div>

          <div className="flex gap-2">
            {extraContent}
            
            {logoutBtn && <button
              className="w-min h-min transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={handleLogOut}  
            >
              Keluar
            </button>}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Layout;