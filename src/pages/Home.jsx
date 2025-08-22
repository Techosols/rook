import Banner from "../components/Banner";
import Tab from "../components/Tab";
import TabController from "./Tabs/TabController";
import ProfilePercentageBanner from "../components/ProfilePercentageBanner";

import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../hooks/useAuth";

function Home() {
  const { isLoggedIn } = useAuth();
  const { isAuthenticated } = useAuth0();
  console.log("isAuthenticated: ", isAuthenticated);

  return (
    <div>
      {isLoggedIn ? <ProfilePercentageBanner /> : <Banner />}
      <Tab />
      <TabController />
    </div>
  );
}

export default Home;
