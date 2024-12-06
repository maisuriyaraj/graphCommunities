// TopArticles.js
import React, { useEffect, useState } from "react";
import blog1 from '../../assets/blog1.png';

const TopArticles = (props) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(props.questions)
  }, [props]);
  return (
    <div className="mx-auto mt-6">
      <div className="px-10">
        {/* This is an example component */}
        <section className="flex flex-row flex-wrap mx-auto">
          {/* Card Component */}
          {
            [1, 2, 3, 4, 5, 6].map((x) => (
              <>
                <div className="transition-all duration-150 flex w-full px-4 py-6 md:w-1/2 lg:w-1/3">
                  <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg ">
                    <div className="md:flex-shrink-0">
                      <img
                        src={blog1}
                        alt="Blog Cover"
                        className="object-cover w-full rounded-lg rounded-b-none md:h-56"
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                      <span className="text-xs font-medium text-blue-600 uppercase">
                        Web Programming
                      </span>
                      <div className="flex flex-row items-center">
                        <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                          <i className="bi bi-eye text-[14px]"></i>
                          <span className="mx-2">1.5k</span>
                        </div>
                        <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                          <i className="bi bi-chat-left-text text-[14px]"></i>
                          <span className="mx-2">25</span>
                        </div>
                        <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
                          <i className="bi bi-hand-thumbs-up text-[14px]"></i>
                          <span className="mx-2">7</span>
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-300" />
                    <div className="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
                      <a href="#" className="hover:underline">
                        <h2 className="text-2xl font-bold tracking-normal text-gray-800">
                          Ho to Yawn in 7 Days
                        </h2>
                      </a>
                    </div>
                    <hr className="border-gray-300" />
                    <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, magni
                      fugiat, odit incidunt necessitatibus aut nesciunt exercitationem
                      aliquam id voluptatibus quisquam maiores officia sit amet accusantium
                      aliquid quo obcaecati quasi.
                    </p>
                    <hr className="border-gray-300" />
                    <section className="px-4 py-2 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <img
                            className="object-cover h-10 rounded-full"
                            src="https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"
                            alt="Avatar"
                          />
                          <div className="flex flex-col mx-2">
                            <a
                              href=""
                              className="font-semibold text-gray-700 hover:underline"
                            >
                              Fajrian Aidil Pratama
                            </a>
                            <span className="mx-1 text-xs text-gray-600">28 Sep 2020</span>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-600">9 minutes read</p>
                      </div>
                    </section>
                  </div>
                </div>
              </>
            ))
          }
        </section>
      </div>


    </div>
  );
};

export default TopArticles;
