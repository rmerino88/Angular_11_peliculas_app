export class FilmShortInfoModel {
    id: string;
    title: string;
    image: string;
    releaseDate: string;
    genres: string[];
    overview: string;

    constructor(id: string, title: string, releaseDate: string, genres: string[], overview: string, image?: string) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.genres = genres;
        this.overview = overview;
        this.image = '';
        if (image) {
            this.image = image;
        }

    }
}
