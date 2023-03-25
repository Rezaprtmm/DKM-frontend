import Image from "next/image";
import Link from "next/link";
export default function SuccesRegist() {
  return (
    <div className="w-full bg-primary-500 lg:h-[100vh]">
      <div className="container mx-auto lg:pt-[160px]">
        <div className="relative w-full">
          <div className="flex justify-center">
            <div className="absolute z-10 flex flex-col items-center justify-center rounded-[20px] bg-white text-center lg:h-[490px] lg:w-[1030px]">
              <h1 className="text-ribbon-600 lg:text-[36px] lg:font-semibold lg:leading-[120%]">
                Registration Successfully
              </h1>
              <div className="flex items-center justify-center lg:mt-[40px]">
                <Image
                  src="/images/success.png"
                  width={100}
                  height={100}
                  alt="Success"
                  className="w-[100px]"
                />
              </div>
              <p className="font-semibold lg:mt-[40px] lg:text-[16px] lg:leading-[120%]">
                You are registered in the DKM event &quot;Book Review: Ber-Islam
                Secara <br /> Kaffah&quot; please check your email for more
                information.
              </p>
              <Link
                href="#"
                className="rounded-[20px] bg-ribbon-600 p-3 text-white lg:mt-[40px] lg:w-[400px]"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
