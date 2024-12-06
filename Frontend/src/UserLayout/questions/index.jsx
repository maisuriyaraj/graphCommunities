import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsList } from '../../redux/DashboardSlices/getQuestions';
import { HashLoaderComponent } from '../../components/loader';

export default function Questions() {

    const [questions, setQuestions] = useState([]);
    const [totalRecords , setTotalRecords] = useState(0);
    const dispatch = useDispatch();
    const { response, tsatus } = useSelector((state) => state.getQuestions);

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        if (response?.statusCode === 201) {
            setQuestions(response?.data?.mainData || []);
            setTotalRecords(response?.data?.count || 0);
        }
    }, [response]);

    const TopQuestions = lazy(() => import('./questions'));

    const getQuestions = async (currentPage = 1, pageLimit = 5) => {
        const payload = {
            page: currentPage,
            limit: pageLimit
        }
        dispatch(getQuestionsList(payload));
    }

    const handlePageChange = (page) => {
        getQuestions(page);
    }

    return (
        <Suspense fallback={<div className='w-full flex justify-center items-center'><HashLoaderComponent /> </div>}>
            <TopQuestions questions={questions} totalRecords = {totalRecords} handlePageChange={handlePageChange} />
        </Suspense>
    )
}
