import style from './menu.module.css';
import { SocialMediaMenuOptions as menu } from './menu_options';
import Image from 'next/image';
import Link from 'next/link';

export default function SocialMediaMenu() {
    return (
        <div className={style.menu_box}>
            <h2 className={style.menu_box_title}>{menu.title}</h2>
            <div className={style.icon_container}>
                {menu.menuItems.map((item) => (
                    <Link key={item.altText} href={item.target}>
                        <Image
                            src={item.iconUrl}
                            height={20}
                            width={20}
                            alt={item.altText}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
