import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./api/auth";
import { Auth } from "./components/Auth/Auth";
import { Main } from "./components/Main/Main";
import { ProfileModal } from "./components/Profile/ProfileModal";
import { fetchUser } from "./store/auth/actionCreators";

function App() {

  const dispatch = useDispatch()
  const modal = useSelector(state => state.modals)
  const { isAuth } = useSelector(state => state.auth)

  useEffect(() => {
    const jwt = localStorage.getItem('jwt')

    if (jwt && jwt !== 'undefined') {
      dispatch(fetchUser())
    }
  }, [])

  const onFinish = async (values) => {
    try {
      const response = await auth(JSON.stringify(values))
      
      if (response.data) {
        const access_token = response.data.access_token
        localStorage.setItem('jwt', `Bearer ${access_token}`);
        dispatch(fetchUser())
      }
    } catch(e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      {isAuth
        ?
          <Main />
        :
          <Auth onFinish={onFinish} />
      }
      {modal.isOpen &&
        <ProfileModal/>}
    </div>
  );
}

export default App;
