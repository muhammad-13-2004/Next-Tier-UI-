import botIcon from "@/assets/nexttier-icon.png";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";

const AiTutorCard = () => {

    const navigate = useNavigate();

    return (
      <div className="bg-(--background-color) border border-(--subtext-color)/10 rounded-3xl p-5">
        
        <div className="flex items-center gap-2 mb-4">
          <img src={botIcon} className="w-8" />
          <h3 className="font-bold text-lg mb-2">Owly</h3>
        </div>
  
        <p className="text-sm text-(--subtext-color) mb-4">
          Not sure where to start? I’ll find the right path in seconds.
        </p>
  
        <Button onClick={() => navigate('/dashboard/ai-tutor')} variant = "default" size='lg' className='w-full' >
          Chat with Owly
        </Button>
      </div>
    );
  };
  
  export default AiTutorCard;