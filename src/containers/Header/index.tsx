import ThemeSwitch from '@/components/Themes/ThemeSwitch'

// STYLES
import './style.scss'


export default function Header() {
    return (
        <header className="primary-header">
            <h2></h2>
            <ThemeSwitch />
        </header>
    )
}