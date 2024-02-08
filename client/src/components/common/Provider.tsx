const Provider: React.FC<{ logo_path: string, provider_id: number }> = ({ logo_path, provider_id }) => {
    return (
        <>
            <div className="w-14 cursor-pointer" key={provider_id}>
                <img className="rounded-md w-full" src={`http://image.tmdb.org/t/p/w92/${logo_path}`} alt={`Provider ${provider_id}`} />
            </div>
        </>
    );
}

export default Provider