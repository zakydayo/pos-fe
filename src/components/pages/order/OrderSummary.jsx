'use client'

import OrderSummaryItems from "@/components/card/OrderSummaryItems";
import { getCart, getTotalPrice } from "@/reducers/order";
import Helper from "@/utils/Helper";
import { map } from "lodash";
import { useSelector } from "react-redux";
import { BsFillPrinterFill } from "react-icons/bs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Building } from "@/utils/Constants";
import { printSummary } from "@/utils/SummaryPrint";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const OrderSummary = () => {
  const carts = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const handlePrintSummary = () => {
    pdfMake.createPdf(printSummary({ carts, totalPrice })).print();
  };

  return (
    <div className="flex flex-col justify-between h-[94vh]">
      <div>
        <span className="font-semibold">Rincian</span>

        <div className="mt-2">
          {map(carts, (cartItem, index) => {
            return (
              <OrderSummaryItems data={cartItem} key={index} />
            )
          })}
        </div>
      </div>

      <div className="w-full">
        {/* <div class="block min-h-6 pl-7">
          <label>
            <input id="checkbox-1" class="w-5 h-5 ease text-base -ml-7 rounded-1.4  checked:bg-gradient-to-tl checked:from-blue-500 checked:to-violet-500 after:text-xxs after:font-awesome after:duration-250 after:ease-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-150 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100" type="checkbox" />
            <label for="checkbox-1" class="cursor-pointer select-none text-slate-700">Checkbox</label>
          </label>
        </div> */}

        <div className="flex justify-between my-2">
          <span>Total</span>
          <span className="font-semibold">Rp {Helper.formatMoney(totalPrice)}</span>
        </div>

        <button
          className="w-full h-min flex items-center transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={handlePrintSummary}
        >
          <BsFillPrinterFill />&nbsp; Print
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;