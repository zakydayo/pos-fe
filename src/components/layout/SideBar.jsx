'use client'

import { MENU_LIST } from "@/utils/Constants";
import { map } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import dayjs from 'dayjs';
import { AiFillHeart } from 'react-icons/ai';

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickMenu = (url) => {
    if (url) router.push(url);
    return;
  };

  const activeMenuClass = 'bg-red-500 rounded-lg py-2 px-4';

  return (
    <div className="fixed">
      <div className="flex flex-col bg-gray-800 text-white w-64  rounded-xl m-2 py-2 px-3">
        {map(MENU_LIST, (item, index) => {
          const isActive = item?.url === pathname;

          return (
            <span className={`transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group duration-500 ease-in-out font-medium my-2 cursor-pointer ${isActive ? activeMenuClass : ''} hover:bg-red-500 rounded-lg py-2 px-4`} onClick={() => handleClickMenu(item?.url)} key={index}>{item?.name ?? '-'}</span>
          );
        })}
      </div>

      <div className="text-center">
        <span className="text-xs flex justify-center items-center">
          developed with <AiFillHeart style={{ color: '#f397ae', fontSize: 14 }} />
          <a href="https://twitter.com/zakydayo" target="_blank" rel="noopener">@zakydayo</a>
        </span>
      </div>
    </div>
  );
};

export default SideBar;
