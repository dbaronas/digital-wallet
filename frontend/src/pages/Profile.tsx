import useAuth from '../hooks/useAuth.tsx';

function Profile() {
    const {auth} = useAuth();

    return (
        <section className="max-w-md mx-auto mt-6">
            <h2 className="text-primary text-4xl font-medium mb-4 text-center">
                My profile
            </h2>
            <table className="w-full table-fixed border-2 border-gray-300 rounded-md">
                <tbody>
                <tr className="border-2 border-gray-300 font-medium">
                    <td className="w-1/2 p-2 border-2 border-gray-300">Name</td>
                    <td className="w-1/2 p-2 truncate whitespace-nowrap overflow-hidden">
                        {auth?.name}
                    </td>
                </tr>
                <tr className="border-2 border-gray-300 font-medium">
                    <td className="w-1/2 p-2 border-2 border-gray-300">Balance</td>
                    <td className="w-1/2 p-2 truncate whitespace-nowrap overflow-hidden">
                        {auth?.balance}
                    </td>
                </tr>
                <tr className="border-2 border-gray-300 font-medium">
                    <td className="w-1/2 p-2 border-2 border-gray-300">Currency</td>
                    <td className="w-1/2 p-2">{auth?.currency}</td>
                </tr>
                </tbody>
            </table>
        </section>
    );
}

export default Profile;