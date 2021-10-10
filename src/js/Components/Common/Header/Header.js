import Logo from "./Logo";
import NavigationLinks from "./NavigationLinks";
import {useWindowDimensions} from "../../../Helpers/functions";
import {breakpoints} from "../../../Helpers/constants";
export default function Header() {
    const { width } = useWindowDimensions();

    return (
        <header className = "flex flex-row justify-between dark:bg-gray-1000 px-4 py-4">
            <div className="flex items-center">
                <Logo/>
                <span className="ml-2 text-gray-500 text-xs">Tradeview Lite</span>
            </div>
            {(width >= breakpoints.md) ? <NavigationLinks /> : 'Mobile'}
        </header>
    )
}