import AuthProvider from "../../providers/auth/authProvider"
import MainLayout from "../../components/layout/mainLayout"

const EditUserContainer = () => {
    return (
        <AuthProvider>
            <MainLayout></MainLayout>
        </AuthProvider>
    )
}

export default EditUserContainer