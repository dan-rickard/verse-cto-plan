import { InteractivePlan } from "@/components/cto-plan/InteractivePlan";
import { ctoPlanContent } from "@/data/ctoPlanContent";

export default function Home() {
  return <InteractivePlan content={ctoPlanContent} />;
}
