export class FilmShortInfoModel {
    title: string;
    image: string;
    releaseDate: string;
    genres: string[];
    overview: string;

    constructor(title: string, releaseDate: string, genres: string[], overview: string, image?: string) {
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
