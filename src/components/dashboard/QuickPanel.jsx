import SetupCard from "./SetupCard";
import AiTutorCard from "./AiTutorCard";
import FriendshipRankCard from "./tabs/FriendshipRankCard";
import InternshipCard from "./tabs/InternshipCard";

const QuickPanel = () => {
  return (
    <div className="space-y-5">
      <SetupCard />
      <FriendshipRankCard />
      <AiTutorCard />
      <InternshipCard />
    </div>
  );
};

export default QuickPanel;