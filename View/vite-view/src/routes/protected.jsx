import useAuth from "../hooks/useAuth";


export default function Protected() {

    const { auth } = useAuth();

    return (
        <>
        <h1>This is a protected place</h1>
        <br />
        <h2>Welcome, {auth.user}</h2>
        </>
    )
}