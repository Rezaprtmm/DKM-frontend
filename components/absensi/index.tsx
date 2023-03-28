import Image from "next/image";

export const Absensi = () => {
  return (
    <div className="w-full bg-primary-500 lg:h-[100vh]">
      <div className="container mx-auto block px-6 lg:flex lg:w-full">
        <div className="flex flex-col items-center justify-center pt-[70px] lg:mt-[91px] lg:w-1/2">
          <Image
            src="/images/absensi/Logo-DKM.png"
            width={400}
            height={400}
            alt="DKM Paramadina"
            className="h-[42px] w-[100px] lg:h-[84px] lg:w-[200px]"
          />
          <Image
            src="/images/absensi/Vector-DKM.png"
            width={400}
            height={400}
            alt="DKM Paramadina"
            className="m-0 w-full lg:mt-[60px]"
          />
        </div>
        <div className="mt-[30px] flex flex-col lg:mt-[61px] lg:ml-[105px] lg:w-1/2">
          <h1 className="mt-[30px] text-center text-[21px] font-semibold leading-[120%] text-ribbon-600 lg:text-[36px]">
            DKM Registration System
          </h1>
          <p className="mt-[30px] hidden text-center lg:block">
            Event: eventName
          </p>
          <form className="mt-[30px] flex flex-col pb-[60px] lg:mt-[60px] lg:pb-0">
            <label
              htmlFor="fullName"
              className="font-normal lg:text-[16px] lg:leading-[120%]"
            >
              Full Name
            </label>
            <input
              type="text"
              className="mt-[6px] rounded-[20px] p-3 lg:mt-[10px]"
            />
            <label
              htmlFor="fullName"
              className="mt-[20px] font-normal lg:mt-[30px] lg:text-[16px] lg:leading-[120%]"
            >
              Email
            </label>
            <input
              type="text"
              className="mt-[6px] rounded-[20px] p-3 lg:mt-[10px]"
            />
            <label
              htmlFor="fullName"
              className="mt-[20px] font-normal lg:mt-[30px] lg:text-[16px] lg:leading-[120%]"
            >
              Institution
            </label>
            <input
              type="text"
              className="mt-[6px] rounded-[20px] p-3 lg:mt-[10px]"
            />
            <label
              htmlFor="fullName"
              className="mt-[20px] font-normal lg:mt-[30px] lg:text-[16px] lg:leading-[120%]"
            >
              Role
            </label>
            <input
              type="text"
              className="mt-[6px] rounded-[20px] p-3 lg:mt-[10px]"
            />
            <button className="mt-[20px] rounded-[20px] bg-ribbon-600 p-3 text-white lg:mt-[30px]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
