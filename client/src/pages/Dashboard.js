const Dashboard = () => {
    return (
        <>
            <h1>
                Dashboard
            </h1>
            <p>Hallo {sessionStorage.getItem("username")}</p>
        </>
    );
}

export default Dashboard;