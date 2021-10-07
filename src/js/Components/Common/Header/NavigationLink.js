export default function NavigationLink({linkObject}) {
    return (
        <a href = {linkObject.href} className = "px-2 dark:text-gray-500 hover:underline">{linkObject.text}</a>
    )
}