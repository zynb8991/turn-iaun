'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const List = ({data}) => {
    const pathName = usePathname();
    return(
        <>
            {!data.sub && <LiLink to={data.link} title={data.title} icon={data.Icon} currentTo={pathName} />}
            {data.sub && <SubMenu subs={data.sub} title={data.title} icon={data.Icon} currentTo={pathName} />}
        </>
    )
}

const LiLink = ({to, title, icon, currentTo}) => {
    return (
        <li>
            <Link href={to} className={`${to === currentTo && 'active'}`}>
                {icon}
                {title}
            </Link>
        </li>
    )
}

const SubMenu = ({title, icon, subs, currentTo}) => {
    return (
        <li>
            <details>
                <summary className='text-base'>
                    {icon}
                    {title}
                </summary>
                <ul>
                    {subs.map((sub, index) => <LiLink key={index} to={sub.link} title={sub.title} icon={sub.Icon} currentTo={currentTo} />)}
                </ul>
            </details>
        </li>
    )
}

 export default List