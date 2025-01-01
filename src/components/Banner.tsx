import { getBannersData } from "@/lib/getData";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Button from "./Button";
import { BannerData } from "../../type";
import Link from "next/link";
import FormattedPrice from "./FormattedPrice";

const Banner = async () => {
  const banners = await getBannersData();
  // console.log(banners);
  const singleBanner = banners[0];
  return (
    <div className="grid md:grid-cols-3 gap-5 md:gap-10">
      {/* left half- single image */}
      <div className="bg-bgLight md:col-span-2 relative flex flex-col lg:flex-row items-center justify-center lg:justify-end rounded-lg overflow-hidden group p-4 lg:p-6 gap-4 lg:gap-0">
        <div className="lg:h-full z-10 lg:absolute lg:p-0 left-10 top-0 flex flex-col justify-center items-start gap-5 lg:gap-10">
          <div className="flex flex-col gap-1 md:gap-3 m-auto">
            <button className="bg-green-500 text-white rounded-full w-20 py-1 text-xs lg:text-sm font-semibold hover:bg-green-600 hoverEffect">
              Sale {singleBanner?.price}
            </button>
            <p className="text-xl md:text-3xl font-semibold">
              {singleBanner?.title}
            </p>
            <h2 className="text-3xl md:text-6xl font-bold">
              {singleBanner?.subtitle}
            </h2>
            <p className="md:text-sm text-black/60 font-medium lg:max-w-44 max-w-52">
              {singleBanner?.description}
            </p>
            <Button className="px-4 py-2 text-sm w-fit mt-4 lg:mt-6">
              Shop Now
            </Button>
          </div>
        </div>

        <Image
          src={urlFor(singleBanner?.image).url()}
          alt={singleBanner?.title}
          width={380}
          height={380}
          className="object-contain h-32 md:h-44 lg:h-60 lg:ml-auto max-h-[500px] group-hover:scale-105 hoverEffect lg:mr-[-18px]"
        />
      </div>

      {/* right half- double image  */}
      <div className="flex flex-col space-y-5 md:space-y-10 h-auto">
        {banners.slice(1, 3).map((item: BannerData) => (
          <div
            key={item?._id}
            className="group h-full lg:h-1/2 bg-bgLight rounded-lg overflow-hidden flex flex-col lg:flex-row justify-center items-center lg:p-6 p-5"
          >
            <div className="lg:w-1/2 flex flex-col">
              <div>
                <p className="text-xl font-semibold">{item?.title}</p>
                <p className="text-2xl font-bold">{item?.subtitle}</p>
              </div>
              <p className="mt-2 lg:mt-3 font-medium text-black/60">
                From
                <FormattedPrice
                  amount={item?.price}
                  className="text-lightRed font-bold"
                />
              </p>
              <Link
                href={"/shop"}
                className="mt-2 mb-3 lg:mt-5 font-bold underline underline-offset-2 decoration-[1px] hover:text-lightRed hoverEffect block"
              >
                Shop now!
              </Link>
            </div>
            <Image
              src={urlFor(item?.image).url()}
              alt={item?.title}
              width={300}
              height={300}
              className="object-contain h-32 lg:h-44 lg:w-1/2 group-hover:scale-105 hoverEffect m-auto lg:m-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
