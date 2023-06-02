import { Success } from "@/svgs/success"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

export default function SuccesRegist() {
  const router = useRouter()
  const backTo = () => {
    router.push("/")
  }
  return (
    <div className="h-[100vh] w-full bg-primary-500 lg:h-[100vh]">
      <div className="absolute top-[60px] right-0 hidden md:block lg:right-[150px] lg:top-[90px]">
        <Image
          src="/images/bubble1.png"
          width={200}
          height={200}
          alt="bubble"
        />
      </div>
      <div className="absolute top-[35px] right-0 block md:hidden">
        <Image
          src="/images/bubble3.png"
          width={200}
          height={200}
          alt="bubble"
          className="w-[100px]"
        />
      </div>
      <div className="absolute left-0 bottom-0">
        <Image
          src="/images/bubble2.png"
          width={400}
          height={400}
          alt="bubble"
          className="w-[250px] lg:w-[400px]"
        />
      </div>
      <div className="container mx-auto">
        <div className="w-full pt-[106px] lg:pt-[160px]">
          <div className="flex justify-center">
            <div className="z-10 flex h-[600px] w-[327px] flex-col items-center justify-center rounded-[20px] bg-white text-center lg:h-[490px] lg:w-[1030px]">
              <h1 className="text-[21px] leading-[120%] text-ribbon-600 lg:text-[36px] lg:font-semibold lg:leading-[120%]">
                Registration Successful!
              </h1>
              <div className="mt-[40px] flex items-center justify-center lg:mt-[40px]">
                <Success />
              </div>
              <p className="mt-[40px] text-[16px] font-normal leading-[120%] lg:mt-[40px] lg:text-[16px] lg:font-semibold lg:leading-[120%]">
                You are registered in the DKM event &quot;Book Review: Ber-Islam
                Secara <br className="hidden lg:block" /> Kaffah&quot; please
                check your email for further information. <br></br>If you
                don&apos;t found it, please check in spam also.
              </p>
              <button
                className="mt-[20px] rounded-[20px] bg-ribbon-600
                p-3 px-12 text-white lg:mt-[30px]"
                type="submit"
                onClick={backTo}
              >
                Return to form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
