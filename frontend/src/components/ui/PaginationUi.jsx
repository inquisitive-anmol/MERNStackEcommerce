import React from 'react'
import {Pagination} from "@nextui-org/react";

const PaginationUi = ({ productsCount, resultPerPage, currentPage, setCurrentPageNo }) => {

  let total = (Math.ceil(productsCount / resultPerPage)) < 4 ? (Math.ceil(productsCount / resultPerPage)) :
  4;

    return (
        <Pagination loop showControls color="warning" total={total} initialPage={1}
        onChange={(e) => setCurrentPageNo(e)}
        page={currentPage}
        />
      );
}

export default PaginationUi


