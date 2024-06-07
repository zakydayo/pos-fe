'use client'

import Layout from "@/components/layout/Layout";
import UpdateStockModal from "@/components/modal/UpdateStockModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const router = useRouter();

  const [modal, setModal] = useState(false);

  const handleOkUpdateStock = () => { 
    setModal(false);
  };

  const handleCancelUpdateStock = () => { 
    setModal(false);
  };

  return (
    <>
      <Layout
        title="Pesanan"
        // breadcrumb={['Pesanan']}
        extraContent={<>
          <button
            className="text-nowrap w-min h-min transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            onClick={() => setModal(true)}
          >
            Stok
          </button>
          <button
            className="text-nowrap w-min h-min transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => router.push('/pesanan-baru')}
          >
            Pesanan Baru
          </button>
        </>}
      >
        Hello
      </Layout>

      <UpdateStockModal open={modal} onOK={handleOkUpdateStock} onCancel={handleCancelUpdateStock} />
    </>
  );
};

export default Home;
