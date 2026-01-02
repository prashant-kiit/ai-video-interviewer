import AuthGuard from "@/shared/middlewares/AuthGuard";

export default function HomeMenu() {
  return (
    <AuthGuard>
      <div>Dash Board</div>
    </AuthGuard>
  );
}
