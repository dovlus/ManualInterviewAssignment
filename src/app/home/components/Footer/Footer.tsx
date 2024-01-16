import Image from 'next/image';
import style from './footer.module.css';
import Menu from './Menu/Menu';
import { TextMenuOptions } from './Menu/menu_options';
import SocialMediaMenu from './Menu/SocialMediaMenu';

export default function Footer() {
    return (
        <div className={style.container}>
            <div className={style.menu}>
                <Image
                    src={'/icons/manual_logo.svg'}
                    height={75}
                    width={75}
                    className={style.logo}
                    alt={'Logo image'}
                />
                <div className={style.menu_sub_container}>
                    {TextMenuOptions.map((option) => (
                        <Menu key={option.title} {...option} />
                    ))}
                    <SocialMediaMenu />
                </div>
            </div>
            <div className={style.copyright}>
                © 2021 Manual. All rights reserved
            </div>
        </div>
    );
}
