'use client'

import Helper from "@/utils/Helper";

const Breadcrumb = ({ paths }) => {
  return (
    <nav className="text-gray-700 body-font" aria-label="Breadcrumb">
      <ol className="list-none p-0 flex justify-start">
        {paths.map((path, index) => (
          <li key={index} className="flex items-center">
            <a href={Helper.convertToURL(path)} className="text-gray-500">{path}</a>
            {index < paths.length - 1 && (
              <svg className="fill-current text-gray-500 mx-2" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 1.5l7 7-7 7" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;