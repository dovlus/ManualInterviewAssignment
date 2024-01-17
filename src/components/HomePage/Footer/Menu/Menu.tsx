import style from './menu.module.css';
import Link from 'next/link';

type MenuItem = {
    text: string;
    target: string;
};
type MenuProps = {
    title: string;
    menuItems: MenuItem[];
};

export default function Menu({ title, menuItems = [] }: MenuProps) {
    return (
        <div className={style.menu_box}>
            <h2 className={style.menu_box_title}>{title}</h2>
            {menuItems.map((item) => (
                <Link
                    key={item.text}
                    href={item.target}
                    className={style.menu_item}
                >
                    {item.text}
                </Link>
            ))}
        </div>
    );
}
