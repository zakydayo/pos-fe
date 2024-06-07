'use client'

import { useState } from "react";
import OrderModal from "../modal/OrderModal";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getSelectedOrderItem, setCart, setSelectedOrderItem } from "@/reducers/order";
import { findIndex, isArray } from "lodash";

const OrderCards = (props) => {
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
      dispatch(setSelectedOrderItem(data));
    };
  };

  const onOK = (e, item) => {
    e.preventDefault();
    let crt = isArray(carts) ? carts : [];
    const checkExistingItem = findIndex(crt, (x) => x.id === item.id);
    let tempData = [...crt];
    if (checkExistingItem > -1) {
      tempData[checkExistingItem] = item;
    } else {
      tempData = [...tempData, item];
    };
    dispatch(setCart(tempData));
    setModal(false);
  };

  const onCancel = () => {
    setModal(false);
  };

  return (
    <>
      <div
        className="flex flex-col items-center rounded-lg overflow-hidden shadow-lg p-4 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group cursor-pointer"
        onClick={onOpenModal}
      >
        <img className="rounded-md" src={data?.src ?? 'assets/images/noimgavail.png'} alt="" width={113} />
        <span className="mt-1 text-sm">{data?.name}</span>
      </div>

      {modal && <OrderModal data={selectedOrderItem} open={modal} onOK={onOK} onCancel={onCancel} />}
    </>
  );
};

export default OrderCards;