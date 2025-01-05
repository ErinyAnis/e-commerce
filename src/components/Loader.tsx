import Image from "next/image";

const Loader = () => {
  return (
    // <div className="flex items-center justify-center h-screen">
    //   <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    // </div>

    <div className="relative h-screen w-full items-center flex flex-col justify-center z-[500]">
      <Image src={"/Spinner.gif"} alt="spinner" width={150} height={150} className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      {/* <h3 className="mt-[-20px]">{title}</h3> */}
    </div>
  );
};

export default Loader;
