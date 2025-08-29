import Banner from "../components/Banner";
import Tab from "../components/Tab";
import TabController from "./Tabs/TabController";
import ProfilePercentageBanner from "../components/ProfilePercentageBanner";

import useAuth from "../hooks/useAuth";

function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? <ProfilePercentageBanner /> : <Banner />}
      <Tab />
      <TabController />
    </div>
  );
}

export default Home;
