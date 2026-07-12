import { useDashboard } from "@/hooks/useDashboard";
import {Trophy} from 'lucide-react'

const FriendshipRankCard = () => {
  
 const { profile } = useDashboard();
 const fullName = profile?.full_name ?? "You";
 const xp = profile?.xp ?? 0;
 const avatar = profile?.avatar_url;

 return (
    <>
    <div className="bg-white border border-(--subtext-color)/10 rounded-3xl p-5 w-full max-w-sm">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-lime-400" />
        <h3 className="font-semibold text-(--primary-color) text-lg">
          Friendship Rank
        </h3>
      </div>

      {/* Your Rank */}
      <div className="flex items-center justify-between bg-green-50 rounded-2xl p-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg">1</span>
          
          <img
            src={avatar}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          
          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {fullName} (You)
            </p>
          </div>
        </div>

        <p className="font-semibold text-gray-800 text-sm">
          {xp.toLocaleString()} <span className="text-gray-500">XP</span>
        </p>
      </div>

      {/* Rank List */}

      {/* Footer */}
      <div className="text-center mt-6">
        <button className="text-xs tracking-widest text-gray-400 font-semibold">
          SEE FULL LEADERBOARD
        </button>
      </div>
    </div>
    </>
  );
};

export default FriendshipRankCard;
