import { map } from "lodash";
import Helper from "./Helper";

const renderTableBody = (data) => {
  const list = data?.carts ?? [];

  const bd = map(list, (item, index) => {
    const totalLength = list.length - 1 === index;

    return [
      {
        text: `${item?.name}\n ${Helper.formatMoney(item?.qty)} x Rp ${Helper.formatMoney(item?.unitPrice)}`,
        border: totalLength ? [false, false, false, true] : [false]
      },
      {
        text: `Rp ${Helper.formatMoney(item?.total)}`,
        border: totalLength ? [false, false, false, true] : [false],
        bold: true,
        alignment: 'right'
      },
    ]
  });

  const toReturn = {
    table: {
      widths: ['50%', '50%'],
      body: bd
    }
  };

  return toReturn;
};

export const printSummary = (data) => {
  let dd = {
    pageOrientation: 'portrait',
    pageSize: {
      width: 380,
      height: 'auto'
    },
    info: {
      title: 'awesome Document',
      author: 'john doe',
      subject: 'subject of document',
      keywords: 'keywords for document',
    },
    content: [
      {
        text: 'Kue Basah Bu Eva',
        style: 'header',
      },
      { 
          text: [
              'Jl. Tata Surya No. 41\n', 
              'Kota Bandung Jawa Barat\n',
              'Telp. 082125484241\n',
              'Senin, 13 Mei 2024 - 18:43\n\n'
          ]
      },
      renderTableBody(data),
      {
        table: {
          widths: ['50%', '50%'],
          body: [
            [
                {
                    text: 'Total',
                    border: [false],
                    bold: true
                    
                },
                {
                    text: `Rp ${Helper.formatMoney(data?.totalPrice ?? 0)}`,
                    border: [false],
                    alignment: 'right',
                    bold: true
                    
                },
              ],
          ]
        }
      },
      {
          text: '*Harga sudah termasuk PPn 11%',
          bold: true,
          marginTop: 8
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        marginBottom: 8,
      },
    },
  };

  return dd;
};