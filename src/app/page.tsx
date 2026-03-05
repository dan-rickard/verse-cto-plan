import { InteractivePlan } from "@/components/cto-plan/InteractivePlan";
import { PasswordGate } from "@/components/PasswordGate";
import { ctoPlanContent } from "@/data/ctoPlanContent";

export default function Home() {
  return (
    <PasswordGate>
      <InteractivePlan content={ctoPlanContent} />
    </PasswordGate>
  );
}
