import Image from "next/image"

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
              htmlFor="email"
              className="mt-[20px] font-normal lg:mt-[30px] lg:text-[16px] lg:leading-[120%]"
            >
              Email
            </label>
            <input
              type="text"
              className="mt-[6px] rounded-[20px] p-3 lg:mt-[10px]"
            />
            <label
              htmlFor="institution"
              className="mt-[20px] font-normal lg:mt-[30px] lg:text-[16px] lg:leading-[120%]"
            >
              Institution
            </label>
            <input
              type="text"
              className="mt-[6px] rounded-[20px] p-3 lg:mt-[10px]"
            />
            <label
              htmlFor="role"
              className="mt-[20px] font-normal lg:mt-[30px] lg:text-[16px] lg:leading-[120%]"
            >
              Role
            </label>
            <div className="relative">
              <select className="mt-[6px] w-full appearance-none rounded-[20px] p-3 lg:mt-[10px]">
                <option value="" selected></option>
                <option value="Student">Student</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 pt-1 lg:pt-2 lg:pr-4">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 10l5 5 5-5z" fill="#000" />
                </svg>
              </div>
            </div>
            <button className="mt-[20px] rounded-[20px] bg-ribbon-600 p-3 text-white lg:mt-[30px]">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
