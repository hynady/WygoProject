import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailVerificationPage from './pages/EmailVerificationPage';
import RegistrationPage from "./pages/RegistrationPage";
import SearchResultPage from "./pages/SearchResultPage";
import Home from "./components/Home";
import EditProfile from "./components/Profile/EditProfile";
import ForgotPassword from "./components/Login/ForgotPassword";
import ReportPost from "./components/Report/ReportPost";
import Login from "./components/Login/Login";
import CommentForm from "./components/Comment/CommentForm";
import CommentLoader from "./components/Comment/CommentLoader";
import PostDetail_Report from "./components/ResultReport/PostDetail_Report";
import PersonalPage from "./components/Profile/PersonalPage";
import ViewAllPostReport from "./components/Admin/ViewAllPostReport";
import ViewAllUserReport from "./components/Admin/ViewAllUserReport";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ViewPostReport from "./components/Admin/ViewPostReport";

import UserInfoWrapper from "./components/Admin/UserInfoWrapper";
import ViewPostDetail from "./components/Post/ViewPostDetail";
import ReportUserForm from "./components/Report/ReportUserForm";


function App() {
    return (
        <Router>
            <div>

                <Routes>
                    {/* Configure route for the email verification page */}
                    <Route path="/email-verification" element={<EmailVerificationPage/>}/>
                    <Route path="/registration" element={<RegistrationPage/>}/>

                    <Route index element={<Login />} />
                    <Route path="home" element={<Home />} />

                    <Route path="profile/:username" element={<PersonalPage />} />
                    <Route path="/search/:query" element={<SearchResultPage/>}/>
                    <Route path="edit-profile" element={<EditProfile />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="view-user-report" element={<ViewAllPostReport />} />
                    <Route path="report-post" element={<ReportPost />} />
                    <Route path="report-user" element={<ReportUserForm />} />
                    <Route path="comment" element={<CommentForm />} />
                    <Route path="comment-loader" element={<CommentLoader />} />
                    <Route path="tes/:id" element={<PostDetail_Report />} /> {/* Truyền id vào địa chỉ URL */}

                    <Route path="a/1" element={<ViewAllPostReport  />} />
                    <Route path="a/2" element={<ViewAllUserReport />} />
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="/post/:id" element={< ViewPostReport/>} />
                    <Route path="/admin/urp/:username" element={<>
                                                                    <UserInfoWrapper>
                                                                    </UserInfoWrapper>
                                                                </>} />
                    <Route path="/posts/:id" element={<ViewPostDetail  />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
// import React from 'react';
//
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login/Login";
// import Home from "./components/Home";
// import EditProfile from "./components/EditProfile";
// import ForgotPassword from "./components/Login/ForgotPassword";
// import ViewAllUserReport from "./components/ViewAllUserReport";
// import ReportPost from "./components/ReportPost";
// import RegistrationPage from "./pages/RegistrationPage";
// import EmailVerificationPage from "./pages/EmailVerificationPage";
//
//
// const App = () => {
//     return (
//         // <Router>
//         //     <Routes>
//         //         <Route path="/" component={Login} />
//         //     </Routes>
//         // </Router>
//         <BrowserRouter>
//             <Routes>
//                 <Route index element={<Login />} />
//                 <Route path="home" element={<Home />} />
//                 <Route path="edit-profile" element={<EditProfile />} />
//                 <Route path="forgot-password" element={<ForgotPassword />} />
//                 <Route path="view-user-report" element={<ViewAllUserReport />} />
//                 <Route path="report-post" element={<ReportPost />} />
//                 <Route path="/registration" element={<RegistrationPage/>}/>
//                 <Route path="/email-verification" element={<EmailVerificationPage/>}/>
//
//
//             </Routes>
//         </BrowserRouter>
//     );
// }
//
// export default App;