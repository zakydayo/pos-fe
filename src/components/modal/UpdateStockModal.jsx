'use client'

import { Modal } from "../components";
import Container from "../layout/Container";
import { TbRefresh } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import Papa from 'papaparse';
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getItemList, getLastUpdateItemList, setItemList, setLastUpdateItemList } from "@/reducers/order";
import { useState } from "react";
import dayjs from "dayjs";
import Helper from "@/utils/Helper";

const UpdateStockModal = (props) => {
  const { open, onOK, onCancel } = props;
  const dispatch = useDispatch();
  const lastUpdateItemList = useSelector(getLastUpdateItemList);
  const initItemList = useSelector(getItemList);

  const [itemList, setInitItemList] = useState(initItemList);
  const [loadingFetchData, setLoadingFetchData] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleUpdateStockData = async () => {
    setLoadingFetchData(true);

    await Papa.parse(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmJWF2qqow9DnZjcr1lw5C4nxElTxFcXrDGe5mVwqevOtgGd0TIe-6x6rIX5bByD9LDsbddoYJoQzg/pub?output=csv',
      {
        download: true,
        header: true,
        complete: async (results) => {
          const dt = Array.from(results.data);
          const x = map(
            dt.filter((x) => x.is_active.toLowerCase() === 'true'),
            (item) => {
              return {
                id: Number(item?.id) ?? null,
                name: item?.name,
                src: item?.img !== 'null' ? item?.img : null,
                supplierId: Number(item?.supplier_id) ?? null,
                unitPrice: Number(item?.unit_price) ?? 0,
                qty: 0,
                total: 0,
              };
            }
          );

          dispatch(setItemList(x));
          dispatch(setLastUpdateItemList(dayjs().format('DD-MM-YYYY HH:mm:ss')));
          setLoadingFetchData(false);
        }
      }
    );
  };

  const setSearch = (event) => {
    setSearchTerm(event.target.value);
    const element = document.getElementById(event.target.value);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputQty = (e, index) => {
    e.preventDefault();
    let initialItemList = [...initItemList];
    let initIndex = initialItemList[index];
    initIndex.qty = +e.target.value;
    initialItemList[index] = initIndex;
    setInitItemList(initialItemList);
  };

  const handleSubmit = () => { 
    dispatch(setItemList(itemList));
    onOK();
  };

  if (open) return (
    <Modal
      toggle={onCancel}
      footer={
        <>
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onCancel}
          >
            Tutup
          </button>
          <button
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </>
      }
    >
      <Container>
        <div className="m-full flex justify-between">
          <h3 class="text-3xl font-semibold">Stok</h3>

          <div className="flex flex-col items-end">
            <button
              className="flex items-start text-nowrap w-min h-min transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              type="button"
              onClick={handleUpdateStockData}
              >
              <TbRefresh style={{ fontSize: 16, animation: loadingFetchData ? 'spin 2s linear infinite' : '' }} />&nbsp; Perbarui Stok
            </button>
            <span className="text-xs mt-2">
              pembaharuan terakhir {lastUpdateItemList}
            </span>
          </div>
        </div>

        <hr className="my-2" />

        <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease">
          <span className="text-sm ease leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
            <BsSearch />
          </span>
          <input 
            type="text" 
            className="pl-9 text-sm focus:shadow-primary-outline ease w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-red-500 focus:outline-none focus:transition-shadow" 
            placeholder="Cari..." 
            onChange={setSearch}
            value={searchTerm}
          />
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {map(itemList, (item, index) => {
            return (
              <div id={item?.name?.toLowerCase()} key={item?.id} className="my-2">
                <span>{item?.name}</span>
                <input
                  id="qty"
                  name="qty"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Qty"
                  value={Helper.formatMoney(item?.qty)}
                  onChange={(e) => handleInputQty(e, index)}
                />
              </div>
            )
          })}
        </div>
      </Container>
    </Modal>
  );

  else return (<></>);
};

export default UpdateStockModal;