import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails";
import ArticleList from "./components/ArticleList";
import Layout from "./layout/Layout";
import CreateArticle from "./pages/CreateArticle";
import EditProfile from "./pages/EditProfile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Paths } from "./config/path";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={Paths.ARTICLE_LIST} element={<Layout />}>
          <Route path={Paths.SIGN_IN} element={<SignIn />} />
          <Route path={Paths.SIGN_UP} element={<SignUp />} />
          <Route index element={<ArticleList />} />
          <Route path={Paths.ARTICLE_DETAILS} element={<ArticleDetails />} />
          <Route path={Paths.NEW_ARTICLE} element={<CreateArticle />} />
          <Route path={Paths.EDIT_PROFILE} element={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
