import LoginForm from "@/components/login-form";

const Login = ({ onLogin }: { onLogin: (data: { token: string; user: any }) => void }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm onLogin={onLogin} className="w-full max-w-md" />
    </div>
  );
};

export default Login;
