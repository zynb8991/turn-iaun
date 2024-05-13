"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function ClientPage() {
  const [isMounted, setIsMounted] = useState(false);

// for hydration errors
useEffect(() => {
setIsMounted(true);
}, []);
const router = useRouter();
const setCookie = async () => {
Cookies.set("user-pref", "some-value-by-client-comp", {
expires: 2,
});
router.refresh();
};

const getCookie = async () => {
const cookieValue = Cookies.get("user-pref");
};

const removeCookie = async () => {
// remove the token from db
Cookies.remove("turn-iaun-user");
router.refresh();
};

if (!isMounted) {
return null;
}
return (

<main className="flex px-3 flex-col items-center justify-center">
<h1 className="my-5 text-2xl text-center font-bold">
Getting and Setting Cookies in Next.js (Client Component)
</h1>

      <div>
        <h2 className="mt-10 text-center text-3xl font-semibold">Set Cookie</h2>

        <button
          onClick={setCookie}
          className="bg-blue-600 rounded-md px-6 py-2  mt-5 text-white"
        >
          Set Cookie
        </button>
      </div>

      <div className="mt-5">
        <h2 className="mt-10 text-center text-3xl font-semibold">
          Cookie Value
        </h2>

        {Cookies.get("user-pref") && (
          <div className="flex items-center justify-center flex-col gap-3">
            <p className="mt-5 text-xl">
              {"user-pref" + ": " + Cookies?.get("user-pref")}
            </p>

            <button
              onClick={removeCookie}
              className="bg-blue-600 rounded-md px-6 py-2 w-fit mx-auto text-white"
            >
              Remove cookie
            </button>
          </div>
        )}
      </div>
    </main>

);
}