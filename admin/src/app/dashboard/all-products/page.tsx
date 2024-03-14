"use client";

import { DataTable } from "@/components/DataTable";
import React from "react";
import { columns } from "./columns";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPaginatedProducts } from "@/services/adminService";
import PageTitle from "@/components/PageTitle";
import { ProductTypes } from "@/types/types";

type Props = {};

interface Product {
  data: {
    data : ProductTypes.Product;
  }
  // user: user;
}

function ProductList({}: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, error } = useQuery<Product>({
    queryKey: ["products", page, pageSize],
    queryFn: () => fetchPaginatedProducts({ page, pageSize }),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  
  console.log(data?.data.data, "data");

  return (
    <div className="flex w-full flex-col gap-5">
      <PageTitle title="Product list" />
      <DataTable columns={columns} data={data?.data?.data} />
    </div>
  );
}

export default ProductList;

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchPaginatedProducts } from "@/services/adminService";
// import PageTitle from "@/components/PageTitle";

// type Product = {
//   id: number;
//   name: string;
// };

// const ProductsPage: React.FC = () => {
//   const [page, setPage] = useState(1);
//   const pageSize = 10;

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["products", page, pageSize],
//     queryFn: () => fetchPaginatedProducts({ page, pageSize }),
//     refetchOnWindowFocus: false,
//   });

//   if (isLoading) return <div>Loading...</div>;
//   if (isError)
//     return (
//       <div>
//         Error: {error instanceof Error ? error.message : "An error occurred"}
//       </div>
//     );
//   console.log(data, "data");
//   return (
//     <div className="flex w-full flex-col gap-5">
//       <PageTitle title="Product list" />
//       <div className="container">
//         <ul>
//           {data?.data?.data.map((product: Product) => (
//             <li key={product.id}>{product.name}</li>
//           ))}
//         </ul>
//         <div>
//           <button
//             onClick={() => setPage((old) => Math.max(old - 1, 1))}
//             disabled={page === 1}
//           >
//             Previous Page
//           </button>
//           <button onClick={() => setPage((old) => old + 1)}>Next Page</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
