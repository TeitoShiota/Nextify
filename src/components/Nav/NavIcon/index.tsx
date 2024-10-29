import Link from 'next/link'
import Image from 'next/image';


// ICONS
import PulseIcon from '@/assets/icons/pulse_icon.svg';
import MicrophoneIcon from '@/assets/icons/microphone_icon.svg';
import WifiIcon from '@/assets/icons/wifi_icon.svg';
import ContrastIcon from '@/assets/icons/contrast_icon.svg';
import SettingsIcon from '@/assets/icons/settings_icon.svg';

// STYLES
import './style.scss'

const TYPE_MAP = {
    PulseIcon: {
        icon: PulseIcon,
        alt: '',
    },
    MicrophoneIcon: {
        icon: MicrophoneIcon,
        alt: '',
    },
    WifiIcon: {
        icon: WifiIcon,
        alt: '',
    },
    ContrastIcon: {
        icon: ContrastIcon,
        alt: '',
    },
    SettingsIcon: {
        icon: SettingsIcon,
        alt: '',
    },
}

export default function NavIcoc({ type, href, active, backdrop } : { type : string, href : string, active? : boolean, backdrop?: boolean }) {
    return (
        <Link 
            href={ href }
            className={`nav-icon` + backdrop ? `nav-icon-backdrop` : null }
        >
            <Image
                src={ TYPE_MAP[ type ].icon }
                alt={ TYPE_MAP[ type ].alt }
                data-active={ active ? 'active' : null} 
            />
        </Link>
    )
}