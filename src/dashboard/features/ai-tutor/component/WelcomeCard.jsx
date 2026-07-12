import { Bot, Lightbulb, HelpCircle, Code2, GraduationCap, Map, BookOpen } from "lucide-react";

const QUICK_ACTIONS = [
    {
        icon: Lightbulb,
        label: "Explaining concepts"
    },
    {
        icon: HelpCircle,
        label: "Solving doubts"
    },
    {
        icon: Code2,
        label: "Code help"
    },
    {
        icon: GraduationCap,
        label: "Learning guidance"
    },
    {
        icon: Map,
        label: "Roadmap advice"
    },
    {
        icon: BookOpen,
        label: "Resources & more"
    },
];
const WelcomeCard = () => {
    return (
        <>

            <div className=" p-5 items-start rounded-xl flex   border border-(--border-color) w-[75%] mx-auto  justify-content">
                <div className="p-3 bg-(--primary-color) rounded-full text-white mr-4 ">
                    <Bot />
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">
                        Hey Muhammad! 👋
                    </h3>
                    <p className="text-sm text-(--subtext-color) mb-3">
                        I'm your AI tutor. I can help you with:
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-3">
                        {QUICK_ACTIONS.map((action) => (
                            <button key={action.label} className="flex items-center gap-1.5 text-xs text-(--subtext-color) hover:text-(--primary-color) hover:bg-(--primary-light) border border-(--border-color) rounded-lg px-2 py-1.5 transition-colors text-left">
                                <action.icon size={13} className="flex-shrink-0" />
                                <span className="truncate">{action.label}</span>
                            </button>
                        ))}
                    </div>

                    <p className="text-xs text-(--subtext-color) mt-3">
                        Ask me anything about your enrolled courses!
                    </p>
                </div>
            </div>
        </>

    );
};

export default WelcomeCard;