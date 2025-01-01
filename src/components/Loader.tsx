import Image from "next/image";

const Loader = ({ title }: { title?: string }) => {
  return (
    // <div className="flex items-center justify-center h-screen">
    //   <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    // </div>

    <div className="w-full min-h-[78vh] items-center flex flex-col justify-center z-50">
      <Image src={"/Spinner.gif"} alt="spinner" width={130} height={130} />
      <h3 className="mt-[-10px]">{title}</h3>
    </div>
  );
};

export default Loader;
