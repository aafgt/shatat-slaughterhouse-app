import { Outlet } from "react-router";

const RootLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-green-900 text-white flex flex-col">
            <header className="bg-green-950 h-16 px-5 flex items-center font-bold sticky top-0 z-50">
                <h1 className="hover:cursor-pointer">SHATAT SLAUGHTERHOUSE DASHBOARD</h1>
            </header>
            <Outlet />
        </div>
    )
}

export default RootLayout;