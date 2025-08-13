import Banner from "../components/Banner";
import Tab from "../components/Tab";
import TabController from "./Tabs/TabController";
import ProfilePercentageBanner from "../components/ProfilePercentageBanner";

import useAuth from "../hooks/useAuth";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { isLoggedIn } = useAuth();
  const { isAuthenticated } = useAuth0();

  console.log('Is User Authenticated with AUTH0? ', isAuthenticated);

  console.log('Home Initialized with isLoggedIn: ', isLoggedIn);

  return (
    <div>
      {isLoggedIn ? <ProfilePercentageBanner /> : <Banner />}
      <Tab />
      <TabController />
    </div>
  );
}

export default Home;
