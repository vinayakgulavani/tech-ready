import React from 'react'
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Contact from './pages/Contact';
import About from './pages/About';
import PrivateRoute from './Components/Routes/Private';
import Dashboard from './pages/user/Dashboard';
import AdminRoutes from './Components/Routes/AdminRoutes';
import AdminDashboard from './pages/Admin/AdminDahboard'
import Users from './pages/Admin/Users';
import ViewUser from './pages/Admin/ViewUser';
import EditUser from './pages/Admin/EditUser';
import EditProfile from './pages/user/EditProfile';
import CoursesPage from './pages/user/CoursesPage';
import Courses from './pages/Admin/Courses';
import AddCourses from './pages/Admin/AddCourses';
import UpdateCourse from './pages/Admin/UpdateCourse';
import Notes from './pages/Notes';
import Languages from './pages/Admin/Languages';
import AddLanguage from './pages/Admin/AddLanguage';
import Technology from './pages/Admin/Technology';
import AddTechnology from './pages/Admin/AddTechnology';
import UpdateTechnology from './pages/Admin/UpdateTechnology';
import UpdateLanguage from './pages/Admin/UpdateLanguage';
import AddCourseNotes from './pages/Admin/AddCourseNotes';
import AddCourseVideos from './pages/Admin/AddCourseVideos';
import UpdateCourseNotes from './pages/Admin/UpdateCourseNotes';
import UpdateCourseVideo from './pages/Admin/UpdateCourseVideo';
import AddCourseMockTest from './pages/Admin/AddCourseMockTest';
import UpdateCourseMockTest from './pages/Admin/UpdateCourseMockTest';
import AddLanguageNotes from './pages/Admin/AddLanguageNotes';
import UpdateLanguageDetails from './pages/Admin/UpdateLanguageDetails';
import UpdateLanguageNotes from './pages/Admin/UpdateLanguageNotes';
import UpdateCourseDetails from './pages/Admin/UpdateCourseDetails';
import AddLanguageMockTest from './pages/Admin/AddLanguageMockTest';
import UpdateLanguageMockTest from './pages/Admin/UpdateLanguageMockTest';
import CourseMockTest from './pages/CourseMockTest';
import LanguageMockTest from './pages/LanguageMockTest';
import CourseDetails from './pages/CourseDetails';
import Course from './pages/Course';
import LearnCourse from './pages/LearnCourse';
import CourseNotes from './pages/CourseNotes';
import CourseVideo from './pages/CourseVideo';

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/about" element={<About />} />
				<Route path="/notes/:lang/:notes" element={<Notes />} />
				<Route path="/lang-mocktest/:lang/:mocktest" element={<LanguageMockTest key={window.location.pathname} />} />
				<Route path="/get-course/:course" element={<CourseDetails />} />
				<Route path="/access-course/:course/:name" element={<Course />} />
				<Route path="/start-course/:course/:name" element={<LearnCourse />} />

				<Route path="/course-notes/:course/:notes" element={<CourseNotes key={window.location.pathname} />} />
				<Route path="/course-mocktest/:course/:mocktest" element={<CourseMockTest key={window.location.pathname} />} />
				<Route path="/course-lecture/:course/:video" element={<CourseVideo key={window.location.pathname} />} />
				<Route path="/*" element={<PageNotFound />} />

				<Route path="/profile" element={<PrivateRoute />}>
					<Route path=":id" element={<Dashboard />} />
					<Route path=":id/edit" element={<EditProfile />} />
					<Route path=":id/courses" element={<CoursesPage />} />
				</Route>

				<Route path="/dashboard" element={<AdminRoutes />}>
					<Route path="admin" element={<AdminDashboard />} />

					{/* users */}
					<Route path="admin/users" element={<Users />} />
					<Route path="admin/users/view/:id" element={<ViewUser />} />
					<Route path="admin/users/edit/:id" element={<EditUser />} />

					{/* languages */}
					<Route path="admin/language" element={<Languages />} />
					<Route path="admin/add-language" element={<AddLanguage />} />
					<Route path="admin/update-languageName/:lang" element={<UpdateLanguage />} />
					<Route path="admin/update-language/:lang" element={<UpdateLanguageDetails />} />
					<Route path="admin/add-notes/:lang" element={<AddLanguageNotes />} />
					<Route path="admin/update-notes/:lang/:notes" element={<UpdateLanguageNotes />} />
					<Route path="admin/add-languageMocktest/:lang" element={<AddLanguageMockTest />} />
					<Route path="admin/update-languageMocktest/:lang/:mocktest" element={<UpdateLanguageMockTest />} />

					{/* technology */}
					<Route path="admin/technology" element={<Technology />} />
					<Route path="admin/add-technology" element={<AddTechnology />} />
					<Route path="admin/update-technology/:tech" element={<UpdateTechnology />} />

					{/* course */}
					<Route path="admin/courses" element={<Courses />} />
					<Route path="admin/add-course" element={<AddCourses />} />
					<Route path="admin/update-courseName/:course" element={<UpdateCourse />} />
					<Route path="admin/update-course/:course" element={<UpdateCourseDetails />} />
					<Route path="admin/add-courseNotes/:course" element={<AddCourseNotes />} />
					<Route path="admin/update-courseNotes/:course/:notes" element={<UpdateCourseNotes />} />
					<Route path="admin/add-courseVideo/:course" element={<AddCourseVideos />} />
					<Route path="admin/update-courseVideo/:course/:video" element={<UpdateCourseVideo />} />
					<Route path="admin/add-courseMocktest/:course" element={<AddCourseMockTest />} />
					<Route path="admin/update-courseMocktest/:course/:mocktest" element={<UpdateCourseMockTest />} />
				</Route>

			</Routes>
		</>
	);
}

export default App;