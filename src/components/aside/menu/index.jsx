import { 
    InboxIcon, 
    ListBulletIcon, 
    UserPlusIcon, 
    PencilSquareIcon, 
    CalendarIcon
  } from '@heroicons/react/24/outline'
import List from './liist'

const Menu = () => {
    const menus = [
        {
          title: "داشبورد",
          Icon:  <span><InboxIcon /></span>,
          link: '/',
          sub: null
        },
        {
          title: "مدیریت مدیرگروه",
          Icon:  <span><ListBulletIcon /></span>,
          link: null,
          sub: [
            {
              title: "افزودن",
              Icon:  <span><UserPlusIcon /></span>,
              link: '/'
            },
            {
              title: "لیست مدیرگروه",
              Icon:  <span><PencilSquareIcon /></span>,
              link: '/'
            }
          ]
        },
        {
          title: "مدیریت نوبت ها",
          Icon:  <span><CalendarIcon /></span>,
          link: '/',
          sub: null
        },
        {
          title: "مدیریت مقطع و رشته",
          Icon: <span><ListBulletIcon /></span>,
          link: null,
          sub: [
            {
              title: "افزودن",
              Icon: <span><UserPlusIcon /></span>,
              link: '/info/add'
            },
            {
              title: "لیست مقاطع و رشته ها",
              Icon: <span><PencilSquareIcon /></span>,
              link: '/'
            }
          ]
        }
    ]

    return(
        <ul className="menu menu-lg flex gap-2 p-0 pr-2 menu-aside">
            {
                menus.map((menu, index) => <List key={index} data={menu} />)
            }
        </ul>
    )
}


export default Menu