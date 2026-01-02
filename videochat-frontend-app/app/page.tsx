import Header from "../shared/components/Header";
import HomeMenu from "../modules/HomeMenu/HomeMenu.component";

export default function Home() {

  return (
    <div>
      <Header title="Welcome to the Video Chat Application" size={2} />
      <HomeMenu/>
    </div>
  );
}
