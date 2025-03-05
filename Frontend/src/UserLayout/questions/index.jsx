import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsList } from '../../redux/DashboardSlices/getQuestions';
import { HashLoaderComponent } from '../../components/loader';

export default function Questions() {

    const [questions, setQuestions] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [page, setCurrentPage] = useState(1);
    const { allData, currentPage } = useSelector((state) => state.getQuestions);

    const dispatch = useDispatch();

    useEffect(() => {
        if (allData.length === 0) {
            getQuestions();
        } else {
            setQuestions(allData);
            setCurrentPage(currentPage);
        }
    }, [dispatch]);

    const TopQuestions = lazy(() => import('./questions'));

    const getQuestions = async (currentPage = 1, pageLimit = 20) => {
        const payload = {
            page: currentPage,
            limit: pageLimit
        }
        dispatch(getQuestionsList({
            payload, onSuccess: (response) => {
                if (response?.statusCode === 200) {
                    setQuestions([...questions, ...response?.data?.questions]);
                    setTotalRecords(response?.data?.totalRecords);
                    setTotalPages(response?.data?.totalPages);
                    if (currentPage === response?.data?.totalPages) {
                        setHasMore(false);
                    }
                }
            },
            onError: (error) => {
                console.log(error);
            }
        }));
    }

    const handlePageChange = (page) => {
        getQuestions(page);
        setCurrentPage(page);
    }

    return (
        <>
            <Helmet>
                <title>Top Questions | Graph Community</title>
                <meta name="description" content="Find answers to the most frequently asked questions on our platform." />
                <meta name="keywords" content="questions, answers, discussion, help" />
                <meta property="og:title" content="Top Questions" />
                <meta property="og:description" content="Find answers to the most frequently asked questions on our platform." />
                <meta property="og:type" content="website" />
            </Helmet>
            <Suspense fallback={<div className='w-full flex justify-center items-center'><HashLoaderComponent /> </div>}>
                <TopQuestions questions={questions} currentPage={page} totalRecords={totalRecords} hasMore={hasMore} totalPages={totalPages} handlePageChange={handlePageChange} />
            </Suspense>
        </>

    )
}
