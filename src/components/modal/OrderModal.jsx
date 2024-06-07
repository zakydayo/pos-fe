'use client'

import { useState } from "react";
import Modal from "./Modal";
import Helper from "@/utils/Helper";

const OrderModal = (props) => {
  const { open, onOK, onCancel, data } = props;

  const [dt, setDt] = useState({ ...data, qty: data?.qty > 0 ? data?.qty : 0, total: 0 });

  const handleIncrease = () => {
    setDt((prevState) => {
      const qty = prevState.qty + 1;
      return { ...prevState, qty, total: Helper.calculateTotalPrice(qty, prevState.unitPrice)};
    });
  };

  const handleDecrease = () => {
    if (Math.sign(dt.qty) > 0) setDt((prevState) => {
      const qty = prevState.qty - 1;
      return { ...prevState, qty, total: Helper.calculateTotalPrice(qty, prevState.unitPrice)};
    });
  };

  const handleInputQty = (e) => {
    e.preventDefault();
    let qty;
    let value = e.target.value;
    
    // if (dt?.qty === 0) {
    //   value = value.replace('/^0+/,');
    // };

    qty = +value;
    setDt({ ...dt, qty, total: Helper.calculateTotalPrice(qty, dt.unitPrice) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onOK(e, dt);
  };

  if (open) return (
    <Modal
      toggle={onCancel}
      title="Tambah Item"
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
      <div className="relative p-6 flex">
        <img src={data?.src ?? 'assets/images/noimgavail.png'} alt={data?.name} width={115} />
        <div className="flex flex-col">
          <span className="font-semibold text-xl">{data?.name}</span>
          <div className="flex items-center mt-3 gap-2">
            <div className="rounded-full bg-red-500 text-white px-3 py-1 cursor-pointer" onClick={handleDecrease}>-</div>
            <input
              id="qty"
              name="qty"
              type="text"
              required
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Qty"
              value={Helper.formatMoney(dt?.qty)}
              onChange={handleInputQty}
            />
            <div className="rounded-full bg-green-500 text-white px-3 py-1 cursor-pointer" onClick={handleIncrease}>+</div>
          </div>
        </div>
      </div>
    </Modal>
  );

  return <></>;
};

export default OrderModal;