interface MoviesProps {

}

const Movies: React.FC<MoviesProps> = () => {
    return (
        <>
            <div className="wrapper max-w-7xl mx-auto flex flex-col justify-between items-center">
                <div>
                    <h5 className="mb-2">Willkommen bei MovieRanker</h5>
                    <div className="flex flex-col gap-2">
                        <p className="text-color-dark-white ">
                            Schön, dass du hier bist! Viel Spaß beim Stöbern und Entdecken deiner Lieblingsfilme und Serien zum Streamen.
                            Finde heraus, was du bei deinen Lieblings-Streaming-Diensten anschauen kannst.
                        </p>
                        <p className="text-color-dark-white ">
                            Welche Filme und Serien sind neu im Angebot? Wo finde ich die beliebtesten Filme und welche Serien sind gerade angesagt ?
                            MovieRanker stellt in dieser Übersicht dar, welche Filme und Serien du online anschauen kannst. Dabei zeigen wir dir ausschließlich legale Optionen. Du wirst also alle Möglichkeiten gezeigt bekommen, wo du deinen Film oder deine Lieblingsserie online kaufen, leihen oder bei welchem Anbieter du sie streamen kannst. Dazu haben wir effektive Filter-Möglichkeiten entwickelt: Du kannst deine Lieblings-Genres einfach auswählen und nach Erscheinungsjahr filtern.
                            Oder suche direkt nach Filmen und Serien, um herauszufinden, wo du sie legal online anschauen kannst.
                        </p>
                        <p className="text-color-dark-white ">
                            Mit MovieRaker kannst du auch entdecken, welche neuen Filme und Serien du in Deutschland bald streamen kannst. Du hast auch die Möglichkeit mithilfe von Filtern nach demnächst verfügbaren Filmen und Serien separat zu suchen.
                        </p>
                    </div>
                    <div className="mt-4 providers flex gap-2">
                        <div className="provider">
                            <img
                                className="rounded-md w-14"
                                src="https://www.justwatch.com/images/icon/207360008/s100/netflix" alt="" />
                        </div>
                        <div className="provider">
                            <img
                                className="rounded-md w-14"
                                src="https://www.justwatch.com/images/icon/52449539/s100/amazonprime" alt="" />
                        </div>
                        <div className="provider">
                            <img
                                className="rounded-md w-14"
                                src="https://www.justwatch.com/images/icon/147638351/s100/disneyplus" alt="" />
                        </div>

                    </div>
                    <div className="filter-options mt-4 flex gap-8 justify-between text-color-dark-white items-center">
                        <div className="contentType flex gap-4 text-2xl text-color-dark-white">
                            <div className="contentTypeOption font-extrabold">
                                Alle
                            </div>
                            <div className="contentTypeOption text-color-dark-white">
                                Filme
                            </div>
                            <div className="contentTypeOption text-color-dark-white">
                                Serien
                            </div>
                        </div>
                        <div className="filterOptions flex gap-4 text-md font-medium">
                            <div className="filterOption text-color-link">
                                Erscheinungsjahr
                            </div>

                            <div className="filterOption text-color-link">
                                Genres
                            </div>

                            <div className="filterOption text-color-link">
                                Preis
                            </div>

                            <div className="filterOption text-color-link">
                                Bewertung
                            </div>

                            <div className="filterOption text-color-link">
                                Produktionsland
                            </div>
                        </div>
                        <div className="resetOption text-color-link">
                            Zurücksetzen
                        </div>
                    </div>
                </div>

            </div >
        </>
    );
}

export default Movies;