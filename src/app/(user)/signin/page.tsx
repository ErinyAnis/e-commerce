import { auth, signIn } from "@/auth";
import Container from "@/components/Container";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <Container className="py-20 flex flex-col justify-center items-center">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/" });
        }}
      >
        <button className="flex items-center border border-blue-500 font-semibold bg-blue-50 px-4 py-2 rounded-sm hover:bg-blue-800/85 hoverEffect hover:text-white">
          <FcGoogle className="w-8" fontSize={22} />
          Signin with Google
        </button>
      </form>
    </Container>
  );
};

export default SignInPage;
