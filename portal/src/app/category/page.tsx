import SearchBar from "@/components/search/seachbar";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div>
      <div className="my-20">
        <SearchBar></SearchBar>
      </div>
    </div>
  );
}

export default Page;
