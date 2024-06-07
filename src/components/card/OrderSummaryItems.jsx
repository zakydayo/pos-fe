'use client'

import { getCart, getSelectedOrderItem, setCart, setSelectedOrderItem } from "@/reducers/order";
import Helper from "@/utils/Helper";
import { filter, findIndex, isArray } from "lodash";
import { useState } from "react";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import OrderModal from "../modal/OrderModal";

const OrderSummaryItems = (props) => {
  const selectedOrderItem = useSelector(getSelectedOrderItem);
  const carts = useSelector(getCart);
  const dispatch = useDispatch();
  
  const { data } = props;

  const [modal, setModal] = useState(false);

  const onOpenModal = () => {
    setModal(true);
    const checkExistingItem = findIndex(carts, (x) => x.id === data.id);
    if (checkExistingItem > -1) {
      dispatch(setSelectedOrderItem(carts[checkExistingItem]));
    } else {
      console.log('no data available');
    };
  };

  const onOK = (e, item) => {
    e.preventDefault();
    let crt = isArray(carts) ? carts : [];
    const checkExistingItem = findIndex(crt, (x) => x.id === item.id);
    let tempData = [...crt];
    if (checkExistingItem > -1) {
      tempData[checkExistingItem] = item;
      dispatch(setCart(tempData));
    } else {
      console.log('no data available');
    };
    setModal(false);
  };

  const onCancel = () => {
    setModal(false);
  };

  const handleDelete = () => {
    const tempCart = [ ...carts ];
    const newData = filter(tempCart, (x) => x.id !== data.id);

    dispatch(setCart(newData));
  };

  return (
    <>
      <div className="flex justify-between items-start my-2">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{data?.name ?? '-'}</span>
          <span className="text-xs">{data?.qty ? `${data?.qty} x Rp ${Helper.formatMoney(data?.unitPrice)}` : '-'}</span>
          <span className="text-xs font-semibold">{data?.total ? `Rp ${Helper.formatMoney(data?.total)}` : 'Rp -'}</span>
        </div>
        <div className="flex flex-col gap-1">
          <button
            className="text-nowrap w-min h-min transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-cyan-500 border-cyan-500 hover:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
            onClick={onOpenModal}
          >
            <BsFillPencilFill />
          </button>
          <button
            className="text-nowrap w-min h-min transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-red-500 border-red-600 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={handleDelete}
          >
            <BsFillTrash3Fill />
          </button>
        </div>
      </div>

      {modal && <OrderModal data={selectedOrderItem} open={modal} onOK={onOK} onCancel={onCancel} />}
    </>
  );
};

export default OrderSummaryItems;