import Image from "next/image"
import axios from "axios"
import { SetStateAction, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/router"

export const Absensi = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [inst, setInst] = useState("")
  const [role, setRole] = useState("")
  const [setBtnAct, isSetBtnAct] = useState<boolean>(false)

  const tempname = name.split(" ")
  const namejoin = tempname.join("")
  const regex = /^[a-zA-Z\s]+$/
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const router = useRouter()

  const handleName = (e: { target: { value: SetStateAction<string> } }) =>
    setName(e.target.value)

  const handleEmail = (e: { target: { value: SetStateAction<string> } }) =>
    setEmail(e.target.value)

  const handleInst = (e: { target: { value: SetStateAction<string> } }) =>
    setInst(e.target.value)

  const handleRole = (e: { target: { value: SetStateAction<string> } }) =>
    setRole(e.target.value)

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (name === "") {
      toast.warning("Mohon isi nama Anda terlebih dahulu")
    } else if (!namejoin.match(regex)) {
      toast.warning("Tidak menerima simbol dan angka pada kolom nama")
    } else if (email === "") {
      toast.warning("Mohon isi alamat email Anda terlebih dahulu")
    } else if (!email.match(pattern)) {
      toast.warning("Alamat email tidak valid")
    } else if (inst === "") {
      toast.warning("Mohon isi instansi Anda, jika tidak ada isi dengan (-)")
    } else if (role === "") {
      toast.warning("Mohon pilih status Anda terlebih dahulu")
    } else if (name === "" || email === "" || inst === "" || role === "") {
      toast.warning("Lengkapi data terlebih dahulu")
    } else {
      if (setBtnAct == false) {
        isSetBtnAct(true)
        toast.warning("Harap cek kembali data Anda sebelum submit")
      } else {
        const valEmail = email.toLowerCase()
        const min = 100000
        const max = 999999
        const noreg = Math.floor(Math.random() * (max - min) + min).toString()
        try {
          router.push("/succes-regist")
          const response = await fetch("/api/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify({ name, valEmail, inst, role, noreg }),
          })
            .then(function (response) {
              // first then()
              if (response.ok) {
                return response.text()
              }
              throw new Error("Something went wrong.")
            })
            .then(function (text) {
              // second then()
              console.log("Request successful", text)
            })
            .catch(function (error) {
              // catch
              console.log("Request failed", error)
            })

          const apis = await fetch("/api/spread", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify({ name, valEmail, inst, role, noreg }),
          })
            .then(function (apis) {
              // first then()
              if (apis.ok) {
                return apis.text()
              }
              throw new Error("Something went wrong.")
            })
            .then(function (text) {
              // second then()
              console.log("Request successful", text)
            })
            .catch(function (error) {
              // catch
              console.log("Request failed", error)
            })

          // baseURL: "https://dkm-paramadina.vercel.app", // Ganti dengan URL base API Anda
          // timeout: 3000, // Waktu maksimal (dalam milidetik) sebelum request dianggap timeout
          // headers: {
          //   "Content-Type": "application/json",
          //   // Anda dapat menambahkan header lain sesuai kebutuhan Anda
          // },
          // const response = await fetch("/api/testof-saveData", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   mode: "cors",
          //   body: JSON.stringify({ name, valEmail, inst, role }),
          // })
          //   .then(function (response) {
          //     // first then()
          //     if (response.ok) {
          //       return response.text()
          //     }
          //     throw new Error("Something went wrong.")
          //   })
          //   .then(function (text) {
          //     // second then()
          //     console.log("Request successful", text)
          //   })
          //   .catch(function (error) {
          //     // catch
          //     console.log("Request failed", error)
          //   })
        } catch (error) {
          console.error(error) // Handle any errors
        }
      }

      // const response = await axios.post("/api/saveData", {
      //   name,
      //   valEmail,
      //   inst,
      //   role,
      // })
      // console.log(response.data)
    }
  }
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
          <form
            className="mt-[30px] flex flex-col pb-[60px] lg:mt-[60px] lg:pb-0"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="fullName"
              className="font-normal lg:text-[16px] lg:leading-[120%]"
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleName}
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
              value={email}
              onChange={handleEmail}
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
              value={inst}
              onChange={handleInst}
              className="mt-[6px] rounded-[20px] p-3 lg:mt-[10px]"
            />
            <label
              htmlFor="role"
              className="mt-[20px] font-normal lg:mt-[30px] lg:text-[16px] lg:leading-[120%]"
            >
              Role
            </label>
            <div className="relative">
              <select
                className="mt-[6px] w-full appearance-none rounded-[20px] p-3 lg:mt-[10px]"
                value={role}
                onChange={handleRole}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Pilih Role --
                </option>
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
            {!setBtnAct ? (
              <button
                className="mt-[20px] rounded-[20px] bg-ribbon-600 p-3 text-white lg:mt-[30px]"
                type="submit"
              >
                Submit
              </button>
            ) : (
              <button
                className="mt-[20px] rounded-[20px]
                bg-ribbon-600 p-3 text-white lg:mt-[30px]"
                type="submit"
              >
                Submit
              </button>
            )}

            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  )
}
