// TopQuestions.js
import React, { useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination";

const TopQuestions = (props) => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(0); // Replace with your total pages

  useEffect(() => {
    setQuestions(props.questions);
    setTotalPages((props.totalRecords / 5) - 1);
  }, [props]);

  function handlePageChange(page) {
    setCurrentPage(page)
    props.handlePageChange(page);
  }

  return (
    <div className="mx-auto mt-6">
      <div className="px-10">
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

        { questions.length !== 0 &&   <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />}
      </div>



    </div>
  );
};

export default TopQuestions;
