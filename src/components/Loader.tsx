import Image from "next/image";
import Container from "./Container";

const Loader = ({title}:{title?:string}) => {
  return (
    // <div className="flex items-center justify-center h-screen">
    //   <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
    // </div>

    <Container className="relative h-screen w-full items-center flex flex-col justify-center z-[500]">
      <Image src={"/Spinner.gif"} alt="spinner" width={150} height={150} className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-28 lg:max-h-40 object-contain" />
      <h3 className="mt-[60px] lg:mt-[80px] z-10 max-w-60 lg:max-w-72 text-center text-sm lg:text-base">{title}</h3>
    </Container>
  );
};

export default Loader;
