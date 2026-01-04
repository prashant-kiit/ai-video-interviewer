import NotFound from "../shared/components/NotFound";
import { GoBackButton } from "../shared/components/GoBackButton";

export default function NotFoundPage() {
  return (
    <div>
      <NotFound />
      <GoBackButton path="/" />
    </div>
  );
}
