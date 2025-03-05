// TopQuestions.js
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Pagination } from "../../components/Pagination";
import { useSelector } from "react-redux";

const TopQuestions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const infiniteLoaderRef = useRef(null);

  const { loader } = useSelector((state) => state.getQuestions);

  useEffect(() => {
    setQuestions(props.questions);
    setTotalPages(props.totalPages);
  }, [props]);

  const isItemLoaded = (index) => index < questions.length;

  const loadMoreItems = () => {
    if (!props?.hasMore) return;
    // setCurrentPage(props.currentPage + 1);
    props.handlePageChange(props.currentPage + 1);
  };

  return (
    <div className="mx-auto mt-6">
      <div className="px-10">

        <InfiniteScroll
          dataLength={questions.length}
          next={loadMoreItems}
          hasMore={props?.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {questions.map((x) => (
          <div className="border border-l-8 border-green-500 shadow rounded-lg mt-8 mb-8 overflow-hidden" key={x._id}>
            <h5 className="text-3xl font-bold mx-5 my-2">{x.title || "N/A"}</h5>
            <p className="text-gray-700 text-sm mx-5 my-2">{x.description || "N/A"}</p>
            <div className="bg-gray-100 pt-5 pb-5 border">
              <a href={x.link} target="_blank" className="text-sm ml-5 mr-5 text-green-600 font-semibold hover:text-green-500 hover:underline cursor-pointer">
                View
              </a>
            </div>
          </div>
        ))}
        </InfiniteScroll>

        {/* Uncomment if you want pagination alongside infinite scroll */}
        {/* {questions.length !== 0 && (
          <Pagination
            totalPages={totalPages}
            props.currentPage={props.currentPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              props.handlePageChange(page);
            }}
          />
        )} */}
      </div>
    </div>
  );
};

export default TopQuestions;
