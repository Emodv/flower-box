import { ColumnDef } from "@tanstack/react-table";
import { ProductTypes } from "@/types/types";
// import { Description } from "@radix-ui/react-toast";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export const columns: ColumnDef<ProductTypes.Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Product title",
  },
  // {
  //   accessorKey: "description",
  //   header: "Description",
  //   cell: ({ row }) => {
  //     const description:string = row.getValue("description");
  //     return <div className="w-64">{description}asdf</div>;
  //   },
  // },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },
  // {
  //   accessorKey: "tags",
  //   header: "Tags",
  //   cell: ({ row }) => {
  //     const tags: string[] = row.getValue("tags");
  //     return (
  //       <div className="flex w-40 flex-wrap gap-1 font-medium">
  //         {tags?.map((tag) => {
  //           return (
  //             <span
  //               key={tag}
  //               className="rounded-md bg-primary p-1 text-white shadow-sm"
  //             >
  //               {tag}
  //             </span>
  //           );
  //         })}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "categories",
  //   header: "Categories",
  //   cell: ({ row }) => {
  //     const categories: string[] = row.getValue("categories");
  //     return (
  //       <div className="flex w-40 flex-wrap gap-1 font-medium">
  //         {categories?.map((category) => {
  //           return (
  //             <span
  //               key={category}
  //               className="rounded-md bg-primary p-1 text-white shadow-sm"
  //             >
  //               {category}
  //             </span>
  //           );
  //         })}
  //       </div>
  //     );
  //   },
  // },
  {
    accessorKey: "assets",
    header: "Assets",
    cell: ({ row }) => {
      const assets: string[] = row.getValue("assets");
      console.log(assets);
      return (
        <div className="flex h-14 w-full flex-wrap gap-1 font-medium">
          {/* {assets?.map((assetUrl: string) => {
            return ( */}
              <div className="w-14" key={assets[0]}>
                  <Image
                    src={assets[0]}
                    width={100}
                    height={100}
                    alt={`preview`}
                    className="h-full w-full object-cover"
                  />
              </div>
             {/* ); */}
           {/* })} */}
        </div>
      );
    },
  },
];
