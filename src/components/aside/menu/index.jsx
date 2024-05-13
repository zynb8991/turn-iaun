import { 
    InboxIcon, 
    ListBulletIcon, 
    UserPlusIcon, 
    PencilSquareIcon, 
    CalendarIcon
  } from '@heroicons/react/24/outline'
import List from './liist'

const Menu = ({user}) => {
    const menus = [
        {
          title: "داشبورد",
          Icon:  <span><InboxIcon /></span>,
          link: '/dashboard',
          sub: null,
          roles: ['teacher', 'admin']
        },
        {
          title: "مدیریت مدیرگروه",
          Icon:  <span><ListBulletIcon /></span>,
          link: null,
          roles: ['admin'],
          sub: [
            {
              title: "افزودن",
              Icon:  <span><UserPlusIcon /></span>,
              link: '/dashboard/teacher/add'
            },
            {
              title: "لیست مدیرگروه",
              Icon:  <span><PencilSquareIcon /></span>,
              link: '/dashboard/teacher'
            }
          ]
        },
        {
          title: "مدیریت نوبت ها",
          Icon:  <span><CalendarIcon /></span>,
          link: '/dashboard/managementturn',
          roles: ['teacher', 'admin'],
          sub: null
        },
        {
          title: "مدیریت مقطع و رشته",
          Icon: <span><ListBulletIcon /></span>,
          link: null,
          roles: ['admin'],
          sub: [
            {
              title: "افزودن",
              Icon: <span><UserPlusIcon /></span>,
              link: '/dashboard/info/add'
            },
            {
              title: "لیست مقاطع و رشته ها",
              Icon: <span><PencilSquareIcon /></span>,
              link: '/dashboard/info'
            }
          ]
        }
    ]

    return(
        <ul className="menu menu-lg flex gap-2 p-0 pr-2 menu-aside">
            {
                menus.map((menu, index) => menu.roles.includes(user.role) && <List key={index} data={menu} />)
            }
        </ul>
    )
}


export default Menu