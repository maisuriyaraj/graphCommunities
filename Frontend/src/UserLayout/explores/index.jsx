import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoaderComponent } from '../../components/loader';
// import { getQuestionsList } from '../../redux/DashboardSlices/getQuestions';

export default function TopFeed() {

    const [articles, setArticles] = useState([]);
    // const [currentPage , setPage] = useState(1);
    // const [pageLimit,setLimit] = useState(10);
    const dispatch = useDispatch();
    const { response, status } = useSelector((state) => state.getQuestions);

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        if (response?.statusCode === 201) {
            // setQuestions(response?.data || []);
        }
        console.log(response);
    }, [response]);

    const TopFeed = lazy(() => import('./explore'));

    const getQuestions = async (currentPage = 1, pageLimit = 10) => {
        const payload = {
            page: currentPage,
            limit: pageLimit
        }
        // dispatch(getQuestionsList(payload));
    }

    const handlePageChange = () => {
        getQuestions(2);
    }

    return (
        <>
            <Helmet>
                <title>Feed | Graph Community</title>
                <meta name="description" content="Find answers to the most frequently asked questions on our platform." />
                <meta name="keywords" content="questions, answers, discussion, help" />
                <meta property="og:title" content="Top Questions" />
                <meta property="og:description" content="Find answers to the most frequently asked questions on our platform." />
                <meta property="og:type" content="website" />
            </Helmet>
            <Suspense fallback={<div className='w-full flex justify-center items-center'><HashLoaderComponent /> </div>}>
                <TopFeed articles={articles} />
            </Suspense>
        </>
    )
}
