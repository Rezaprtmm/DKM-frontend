import Image from "next/image";
export const Absensi = () => {
  return (
    <div className="bg-primary-500 w-full lg:h-[100vh]">
      <div className="container mx-auto lg:flex lg:w-full px-6 block">
        <div className="flex flex-col items-center justify-center lg:mt-[91px] lg:w-1/2 pt-[70px]">
          <Image
            src="/images/absensi/Logo-DKM.png"
            width={400}
            height={400}
            alt="DKM Paramadina"
            className="lg:w-[200px] lg:h-[84px] w-[100px] h-[42px]"
          />
          <Image
            src="/images/absensi/Vector-DKM.png"
            width={400}
            height={400}
            alt="DKM Paramadina"
            className="w-full lg:mt-[60px] m-0"
          />
        </div>
        <div className="lg:w-1/2 flex flex-col lg:mt-[61px] lg:ml-[105px] mt-[30px]">
          <h1 className="lg:text-[36px] font-semibold text-ribbon-600 text-center text-[21px] leading-[120%] mt-[30px]">
            DKM Registration System
          </h1>
          <p className="text-center mt-[30px] hidden lg:block">
            Event: eventName
          </p>
          <form className="flex flex-col lg:mt-[60px] mt-[30px]">
            <label
              htmlFor="fullName"
              className="lg:text-[16px] lg:leading-[120%] font-normal"
            >
              Full Name
            </label>
            <input
              type="text"
              className="rounded-[20px] p-3 lg:mt-[10px] mt-[6px]"
            />
            <label
              htmlFor="fullName"
              className="lg:text-[16px] lg:leading-[120%] font-normal lg:mt-[30px] mt-[20px]"
            >
              Email
            </label>
            <input
              type="text"
              className="rounded-[20px] p-3 lg:mt-[10px] mt-[6px]"
            />
            <label
              htmlFor="fullName"
              className="lg:text-[16px] lg:leading-[120%] font-normal lg:mt-[30px] mt-[20px]"
            >
              Institution
            </label>
            <input
              type="text"
              className="rounded-[20px] p-3 lg:mt-[10px] mt-[6px]"
            />
            <label
              htmlFor="fullName"
              className="lg:text-[16px] lg:leading-[120%] font-normal lg:mt-[30px] mt-[20px]"
            >
              Role
            </label>
            <input
              type="text"
              className="rounded-[20px] p-3 lg:mt-[10px] mt-[6px]"
            />
            <button className="rounded-[20px] p-3 lg:mt-[30px] mt-[20px] bg-ribbon-600 text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
