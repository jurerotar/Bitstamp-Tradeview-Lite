import NavigationLink from "./NavigationLink";

export default function NavigationLinks() {
    const links = [
        {id: 1, text: 'Account', href: '#'},
        {id: 2, text: 'Markets', href: '#'},
        {id: 3, text: 'Deposit', href: '#'},
        {id: 4, text: 'Withdrawal', href: '#'},
        {id: 5, text: 'News', href: '#'},
    ];
    const navigationLinks = links.map(el => <li key = {el.id}><NavigationLink linkObject={el}/></li> );
    return (
        <ul className="flex flex-row">
            {navigationLinks}
        </ul>
    )
}