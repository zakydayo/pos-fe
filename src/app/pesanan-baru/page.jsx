'use client'

import OrderCards from "@/components/card/OrderCards";
import Layout from "@/components/layout/Layout";
import OrderSummary from "@/components/pages/order/OrderSummary";
import { getItemList, setCart } from "@/reducers/order";
import { KUE_LIST } from "@/utils/Constants";
import { map } from "lodash";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const PesananBaruPage = () => {
  const router = useRouter();
  const tracksRef = useRef(null);
  const initItemList = useSelector(getItemList);
  const dispatch = useDispatch();

  const [data, setData] = useState(initItemList);
  const [search, setSearch] = useState('');

  const onScrollUpdate = (values) => {
    const { scrollTop, scrollHeight, clientHeight } = values;
    const pad = 8; // padding before reach bottom
    const t = (scrollTop + pad) / (scrollHeight - clientHeight);

    // if (t > 1 && !isFetching) {
    //   setLoading(false);
    // }
  };

  const dataList = useMemo(() => 
    data.filter((item) => item.name.toLowerCase().includes(search)),
    [data, search]
  );

  return (
    <Layout 
      title="Pesanan Baru"
      fullscreen
      logoutBtn={false}
      extraContent={<>
        <button
          className="text-nowrap w-min h-min transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          onClick={() => {
            router.push('/');
            dispatch(setCart([]));
          }}
        >
          Kembali
        </button>
      </>}
    >

      <div className="flex flex-row">
        <div className="lg:w-9/12 md:w-full w-full">

          <div className="flex justify-end px-3">
            <div className="lg:w-3/12 md:w-full w-full">
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
                <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                  <BsSearch />
                </span>
                <input 
                  type="text" 
                  className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:transition-shadow" 
                  placeholder="Cari..." 
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Scrollbars
            className="container mx-auto"
            autoHide
            autoHeight
            autoHeightMin="98vh"
            universal={true}
            onUpdate={onScrollUpdate}
            ref={tracksRef}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 overflow-y-auto h-full px-3 py-5">
              {map(dataList, (item, index) => (
                <OrderCards data={item} key={index} />
              ))}
            </div>
          </Scrollbars>
        </div>
        <div className="lg:w-3/12 md:w-full w-full border-l-2 pl-2 h-dvh">
          <OrderSummary />
        </div>
      </div>
    </Layout>
  );
};

export default PesananBaruPage;