import DataTable from 'react-data-table-component';
import Card from "@/components/card/Card";
import { useSelector } from 'react-redux';
import { getOrderList } from '@/reducers/order';
import { map } from 'lodash';

const OrderListTable = () => {
  const orderList = useSelector(getOrderList);

  const columns = [
    {
      name: 'Order Id',
      selector: row => row.id,
    },
    {
      name: 'Tanggal',
      selector: row => row.date,
    },
    {
      name: 'Items',
      selector: row => {
        let items = [];
        map(row.items.carts, (item, idx) => {
          items.push(item?.name);
        });

        return (
          <span>{items.toString().replace(',', ', ')}</span>
        );
      },
    },
  ];

  return (
    <>
      <h3 className='text-3xl font-semibold'>Daftar Pesanan</h3>

      <Card>
        <DataTable
          columns={columns}
          data={orderList}
        />
      </Card>
    </>
  );
};

export default OrderListTable;