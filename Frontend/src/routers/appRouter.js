import { Route, Routes, HashRouter, Navigate } from "react-router-dom";
import Home from "../publicLayout/Home";
import SignIn from "../publicLayout/signin";
import SignUp from "../publicLayout/signup";
import ForgotPassword from "../publicLayout/forgotPassword";
import NotFound from "../publicLayout/PageNotFound";
import ResetPassword from "../publicLayout/resetPassword";
import VerifyOtp from "../publicLayout/verifyOtp";
import { isAuthorizedPerson } from "../utils/CookiesService";
import PrimaryLayout from "../UserLayout/PrimaryLayout";
import Questions from "../UserLayout/questions";
import ProtectedRoute from "../components/ProtectedComponent";
import Articles from "../UserLayout/articles";
import TopFeed from "../UserLayout/explores";
import AddPostComponent from "../UserLayout/addPost";
import GraphAI from "../UserLayout/graphAI/v2";

export function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={!isAuthorizedPerson() ? <SignIn /> : <Navigate to="/questions" replace />} />
                <Route path="/signup" element={!isAuthorizedPerson() ? <SignUp /> : <Navigate to="/questions" replace />} />
                <Route path="/forgotPassword" element={!isAuthorizedPerson() ? <ForgotPassword /> : <Navigate to="/questions" replace />} />
                <Route path="/resetPassword" element={!isAuthorizedPerson() ? <ResetPassword /> : <Navigate to="/questions" replace />} />
                <Route path="/verifyOtp" element={!isAuthorizedPerson() ? <VerifyOtp /> : <Navigate to="/questions" replace />} />
                <Route path="*" element={<NotFound />} />
                {/* Protected Routes */}
                <Route path="/" element={<PrimaryLayout />}>
                    <Route path="questions" element={
                        <ProtectedRoute>
                            <Questions />
                        </ProtectedRoute>
                    } />
                    <Route path="articles" element={
                        <ProtectedRoute>
                            <Articles />
                        </ProtectedRoute>
                    } />
                    <Route path="feed" element={
                        <ProtectedRoute>
                            <TopFeed />
                        </ProtectedRoute>
                    } />

                    <Route path="addPost" element={
                        <ProtectedRoute>
                            <AddPostComponent />
                        </ProtectedRoute>
                    } />

                    <Route path="graphAI" element={
                        <ProtectedRoute>
                            <GraphAI />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </HashRouter>
    )
}