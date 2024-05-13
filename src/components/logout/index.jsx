"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function LogOut() {
    const router = useRouter();

    const removeCookie = async () => {
        // remove the token from db
        Cookies.remove("turn-iaun-user");
        router.refresh();
    };
return (
        <li className='text-red-500' onClick={removeCookie}>
            <a className='py-4'>
                <ArrowLeftEndOnRectangleIcon className='w-5' />
                خروج از حساب کاربری
            </a>
        </li>
    );
}