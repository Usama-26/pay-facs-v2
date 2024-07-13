import LoginForm from "@/components/LoginForm";
import AuthLayout from "@/layouts/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-3xl font-bold text-center">PayFacs</h1>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
