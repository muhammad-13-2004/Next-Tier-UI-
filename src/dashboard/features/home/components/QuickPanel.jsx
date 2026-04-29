import SetupCard from "./SetupCard";
import AiTutorCard from "./AiTutorCard";
import FriendshipRankCard from "./FriendshipRankCard";
import InternshipCard from "./InternshipCard";

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