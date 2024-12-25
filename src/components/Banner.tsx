import { getBannersData } from "@/lib/getData";
import Container from "./Container";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const Banner = async () => {
  const banners = await getBannersData();
  const singleBanner = banners[0];
  return (
    <Container className="grid md:grid-cols-3 gap-5 md:gap-10 md:max-h-[600px]">
      {/* left half- single image */}
      <div className="bg-bgLight md:col-span-2 relative flex items-center justify-end rounded-lg overflow-hidden group">
        <div>
          <div>
            <button>Sale {singleBanner?.price}</button>
          </div>
        </div>
        <Image
          src={urlFor(singleBanner?.image).url()}
          alt={singleBanner?.title}
          width={500}
          height={500}
          className="object-contain h-72 md:h-full max-h-[600px] self-end group-hover:scale-105 hoverEffect"
        />
      </div>

      {/* right half- double image  */}
      <div></div>
    </Container>
  );
};

export default Banner;
