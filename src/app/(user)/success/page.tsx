import SuccessContainer from "@/components/SuccessContainer";
import { redirect } from "next/navigation";

// interface Props {
//   searchParams: {
//     session_id: string | null;
//   };
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SuccessPage = ({ searchParams }: any) => {
  const id = searchParams?.session_id;
  if (!id) {
    redirect("/");
  }

  return (
    <div>
      <SuccessContainer id={id} />
    </div>
  );
};

export default SuccessPage;
