import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function MyPagination({ paginationDetails, setPaginationDetails, totalPosts }) {
  const { page, limit } = paginationDetails;
  const totalPages = Math.ceil(totalPosts / limit);
  const firstPost = totalPosts === 0 ? 0 : (page - 1) * limit + 1;
  const lastPost = firstPost + limit - 1;
  const currentPagePost = {
    start: firstPost,
    end: lastPost > totalPosts ? totalPosts : lastPost,
  };

  let pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (page + 2 > totalPages) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = Math.max(page - 2, 1); i <= page + 2; i++) {
        pages.push(i);
      }
    }
  }

  const nextPage = () => {
    page < totalPages &&
      setPaginationDetails({
        ...paginationDetails,
        page: paginationDetails.page + 1,
      });
  };

  const previousPage = () => {
    page > 1 &&
      setPaginationDetails({
        ...paginationDetails,
        page: paginationDetails.page - 1,
      });
  };

  const setActivePage = (page) => {
    setPaginationDetails({ ...paginationDetails, page: page });
  };

  useEffect(() => {
    if (firstPost > totalPosts) {
      setPaginationDetails((prev) => {
        return {
          ...prev,
          page: prev.page - 1,
        };
      });
    }
  }, [totalPosts]);

  // console.log("totalPosts", totalPosts);
  // console.log("totalPages", totalPages);
  // console.log("pages", pages);
  // console.log("currentPagePost", currentPagePost);
  // console.log("paginationDetails", paginationDetails);

  return (
    <div className="px-3 d-flex align-items-center justify-content-between cstmPagination flex-wrap mt-3 gap-10">
      <p className="m-0 fw-sbold">
        Showing {currentPagePost.start || 0} - {currentPagePost.end || 0} from {totalPosts || 0}{" "}
        data
      </p>
      <Pagination className="m-0 rounded-pill">
        <Pagination.Prev onClick={previousPage} />
        {pages.map((myPage) => (
          <Pagination.Item
            key={myPage}
            active={myPage === page}
            onClick={() => setActivePage(myPage)}
            className="pointer"
          >
            {myPage}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </div>
  );
}
