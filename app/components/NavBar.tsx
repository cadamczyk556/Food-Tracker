
function NavBar() {
    return (

        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <img src="/vercel.svg" alt="Logo" className="h-8 w-8 inline-block mr-2 justify-end" />
            <ul className="flex space-x-4 justify-center items-center">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Active</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <div className="w-8"></div>

        </div>

    )

}

export default NavBar;

