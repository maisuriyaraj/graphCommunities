import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashLoaderComponent } from '../../components/loader';
// import { getQuestionsList } from '../../redux/DashboardSlices/getQuestions';

export default function Articles() {

    const [articles, setArticles] = useState([]);
    // const [currentPage , setPage] = useState(1);
    // const [pageLimit,setLimit] = useState(10);
    const dispatch = useDispatch();
    const { response, status } = useSelector((state) => state.getQuestions);

    useEffect(() => {
        getQuestions();
    }, []);

    const TopArticles = lazy(() => import('./article'));

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
        <Suspense fallback={<div className='w-full flex justify-center items-center'><HashLoaderComponent /> </div>}>
            <TopArticles articles={articles} />
        </Suspense>
    )
}
