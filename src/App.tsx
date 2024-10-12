import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ArticleDetails from "./components/ArticleDetails/ArticleDetails";
import ArticleList from "./components/ArticleList/ArticleList";
import CreateArticle from "./pages/CreateArticle";
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route index element={<ArticleList />} />
          <Route path="/new-article" element={<CreateArticle />}></Route>
          <Route path="/profile" element={<EditProfile />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
