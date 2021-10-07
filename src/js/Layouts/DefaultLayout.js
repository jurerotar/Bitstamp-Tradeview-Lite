import Header from "../Components/Common/Header/Header";
export default function DefaultLayout({children}) {
    return (
        <div className = "flex flex-col">
            <Header />
            {children}
        </div>
    )
}