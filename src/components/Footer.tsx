import { footerData } from "@/constants";
import Container from "./Container";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-bgLight py-4">
      <Container className="py-10">
        <Logo className="mb-5 w-fit" />
        <div className=" grid grid-cols-2 lg:grid-cols-4 gap-5">
        {footerData.map((item) => (
          <div key={item?._id}>
            <h3 className="text-darkOrange/90 text-base lg:text-lg font-semibold mb-1 lg:mb-2">
              {item?.title}
            </h3>
            <div className="flex flex-col lg:gap-0.5">
              {item?.listItem?.map((list) =>
                list?.listData?.map((data) => (
                  <Link
                    key={data.title}
                    href={data.href}
                    className="py-1 text-accent font-medium hover:text-darkOrange hoverEffect text-sm lg:text-base"
                  >
                    {data.title}
                  </Link>
                ))
              )}
            </div>
          </div>
        ))}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
