import { AiOutlineAlipay } from "react-icons/ai";
import { BsChat, BsChatSquareText, BsChatText, BsGear, BsGoogle, BsGrid, BsPeople, BsPersonLinesFill } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { GiAlarmClock } from "react-icons/gi";
import { IoCalendarNumberOutline, IoNewspaperOutline, IoPersonOutline } from "react-icons/io5";


interface DashBoardSideBarProps {
    Icon: React.ReactNode;
    Title: string;
    Href: string;
    // onClose?: () => void;
}

interface BannerProps {
    _id: string;
    image: string;
}

interface TopRightProps {
    title?: string;
    linkDir: string;
    icon?: React.ReactNode;
}
interface FooterProps {
    title?: string;
    icon?: React.ReactNode;
}
interface docsConfigProps {
    Banner: BannerProps[],
    NaveBar: {
        MainNav: TopRightProps[],
        topRight: TopRightProps[],
    },
    SideBar: {
        DashBoard: DashBoardSideBarProps[],
    },
    Footer: {
        categoryOne: FooterProps[],
        categoryTwo: FooterProps[],
        contactInfo: FooterProps[],
        SocailIcons: FooterProps[],
    }
}
export const siteFeatures: docsConfigProps = {
    Banner: [
        {
            _id: '1',
            image: '/Images/Banner/01.jpg',
        }, {
            _id: '2',
            image: '/Images/Banner/02.jpg',
        }, {
            _id: '3',
            image: '/Images/Banner/03.jpg',
        }, {
            _id: '4',
            image: '/Images/Banner/04.jpg',
        },

    ],
    NaveBar: {
        MainNav: [
            { title: 'Super Deals', linkDir: '/' },
            { title: 'New Arrival', linkDir: '/' },
            { title: 'Hot Products', linkDir: '/' },
            { title: 'Features Brand', linkDir: '/' },
            { title: 'Top Sells', linkDir: '/' },
        ],
        topRight: [
            { title: 'Track Your Order', linkDir: '/' },
            { title: '$ Dollar (US)', linkDir: '/' },
        ]
    },
    SideBar: {
        DashBoard: [
            {
                Icon: <BsGrid size={15} />,
                Title: 'Dashboard',
                Href: '/dashboard/overflow'
            },
            {
                Icon: <IoCalendarNumberOutline size={17} />,
                Title: 'Customers',
                Href: '/dashboard/customers'
            },
            {
                Icon: <GiAlarmClock size={17} />,
                Title: 'Products',
                Href: '/dashboard/products'
            },
            {
                Icon: <GiAlarmClock size={17} />,
                Title: 'Add Product',
                Href: '/dashboard/add-product'
            },
            {
                Icon: <GiAlarmClock size={17} />,
                Title: 'Add Features',
                Href: '/dashboard/add-features/category'
            },
            {
                Icon: <GiAlarmClock size={17} />,
                Title: 'orders',
                Href: '/dashboard/orders'
            },
            {
                Icon: <BsChat size={17} />,
                Title: 'Emails',
                Href: '/dashboard/emails'
            },
            {
                Icon: <BsChatText size={17} />,
                Title: 'Messages',
                Href: '/dashboard/messages'
            },
            {
                Icon: <BsPeople size={17} />,
                Title: 'Staff',
                Href: '/dashboard/team'
            },
            {
                Icon: <BsChatSquareText size={17} />,
                Title: 'Product Reviews',
                Href: '/dashboard/product-reviews'
            },
            {
                Icon: <AiOutlineAlipay size={17} />,
                Title: 'Payment Information',
                Href: '/dashboard/payment'
            },
            {
                Icon: <BsGear size={17} />,
                Title: 'Profile',
                Href: '/dashboard/profile'
            },
            {
                Icon: <BsPersonLinesFill size={17} />,
                Title: 'Profile Settings',
                Href: '/dashboard/settings'
            },
            {
                Icon: <IoNewspaperOutline size={17} />,
                Title: 'FAQs',
                Href: '/dashboard/faqs'
            },
        ]
    },
    Footer: {
        categoryOne: [
            { title: 'Laptops, Ultrabooks & Computers' },
            { title: 'Cameras & Photography' },
            { title: 'Smart Phones & Tablets' },
            { title: 'Video Games B Consoles' },
            { title: 'TV &Audio' },
            { title: 'Gadgets' },
            { title: 'Car Electronic & GPS' },
        ],
        categoryTwo: [
            { title: 'Printer & lnk' },
            { title: 'Software' },
            { title: 'Office Supplies' },
            { title: 'Computer Components' },
            { title: 'Virtual Reality' },
            { title: 'Smartwatches' },
        ],
        contactInfo: [
            { title: 'My Account' },
            { title: 'Track your Order' },
            { title: 'Wishlist' },
            { title: 'Returns & Exchange' },
            { title: 'FAQ' },
            { title: 'Product Support' },
        ],
        SocailIcons: [
            { title: 'FaceBook', icon: <FaFacebookF /> },
            // { title: 'Twitter', icon: <BsTwitter /> },
            { title: 'Google', icon: <BsGoogle /> },
            { title: 'Returns & Exchange' },
            { title: 'FAQ' },
            // { title: 'Product Support' },
        ]
    },
}