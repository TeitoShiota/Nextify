import Link from 'next/link'

import NavIcon from '@/components/Nav/NavIcon'

// STYLES
import './style.scss'

export default function Nav() {
    return (
        <nav className="primary-nav">
            <NavIcon type='PulseIcon' href='/' active/>
            <NavIcon type='MicrophoneIcon' href='/' />
            <NavIcon type='WifiIcon' href='/' backdrop/>
            <NavIcon type='ContrastIcon' href='/' />
            <NavIcon type='SettingsIcon' href='/' />
        </nav>
    )
}