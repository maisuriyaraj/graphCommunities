// TopArticles.js
import React, { useEffect, useState } from "react";
import blog1 from '../../assets/blog1.png';
import CustomDynamicTabs from "../../components/Tabs";

const TopPosts = (props) => {
  const [questions, setQuestions] = useState([]);
  const tabItems = ["Top Questions","Top Articles", "Top Collections" , "Top Communities"];
  const [activeTab, setActiveTab] = useState(0);
  const [search,setSearch] = useState('');

  useEffect(() => {
    setQuestions(props.questions)
  }, [props]);
  return (
    <div className="mx-auto px-16 mt-6">
        <div className="flex items-center relative">
          <i className="bi bi-search top-[10px] left-[10px] text-2xl absolute"></i>
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} className="px-12 w-full rounded-lg py-4 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
        </div>
        <CustomDynamicTabs tabItems={tabItems} handleChangeActiveTab={(e) => setActiveTab(e)} activeTab={activeTab}  />
    </div>
  );
};

export default TopPosts;
