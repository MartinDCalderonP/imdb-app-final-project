export enum Paths {
	home = '/',
	approved = '/approved',
	movies = '/movies',
	tvShows = '/tvShows',
	person = '/person',
	search = '/search=',
	page = '/page=',
	season = '/season',
	profile = '/profile',
	certification = '/certification',
	genre = '/genre',
	years = '/years',
	from = '/from=',
	to = '&to=',
	similar = '/similar',
	favorites = '/favorites',
}

export enum API {
	base = 'https://api.themoviedb.org/3/',
	requestToken = 'authentication/token/new',
	authenticate = `https://www.themoviedb.org/authenticate/`,
	redirect = '?redirect_to=http://localhost:3000/approved',
	authenticateWithToken = 'authentication/session/new',
	deleteSession = 'authentication/session',
	movies = 'movie/',
	tvShows = 'tv/',
	person = 'person/',
	popular = 'popular',
	certification = 'certification/',
	genre = 'genre/',
	discover = 'discover/',
	list = 'list',
	byCertification = '&sort_by=popularity.desc&certification_country=US&certification=',
	byGenre = '&sort_by=popularity.desc&with_genres=',
	moviesMinYear = '&sort_by=popularity.desc&primary_release_date.gte=',
	moviesMaxYear = '&primary_release_date.lte=',
	tvShowsMinYear = '&sort_by=popularity.desc&first_air_date.gte=',
	tvShowsMaxYear = '&first_air_date.lte=',
	images = 'https://image.tmdb.org/t/p/',
	imageWidth200 = 'w200',
	imageWidth300 = 'w300',
	imageOriginal = 'original',
	imagesInEnglish = '/images?&include_image_language=en,null',
	search = 'search/multi',
	similar = '/similar',
	reviews = '/reviews',
	credits = '/credits',
	season = '/season',
	account = 'account',
	favorite = '/favorite',
	accountStates = '/account_states',
	sessionId = 'session_id=',
}
