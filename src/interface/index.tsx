export interface IGame {
  id: number | null,
  title: string,
  thumbnail: string,
  short_description: string,
  game_url: string,
  genre: string,
  platform: string,
  publisher: string,
  developer: string,
  release_date: string,
  freetogame_profile_url: string
  isFavorites?:boolean,
  description?:string
}
interface IGameDetail {
  id: number | null,
  title: string,
  thumbnail: string,
  short_description: string,
  game_url: string,
  genre: string,
  platform: string,
  publisher: string,
  developer: string,
  release_date: string,
  freetogame_profile_url: string,
  minimum_system_requirements: any,
  screenshots: any,
  isFavorites?:boolean,
  description?:string
}
interface ISortType {
  title: string,
  value: string
}
export interface IHomeState {
  sortType: Array<ISortType>,
  gameType:Array<string>,
  game: Array<IGame>,
  showGame: Array<IGame>,
  searchValue: string,
  searchRes:Array<IGame>,
  currentSortType: string,
  currentGameType: string,
  page: number,
  pageSize: number,
  total:number,
  loading: boolean
}
export interface IDetailState {
  Game: IGameDetail,
  isFromHome: boolean,
  inFavoritesList:boolean,
  inputValue:string,
  data?:any
}
export interface IFavoritesState {
  sortType: Array<ISortType>,
  gameType:Array<string>,
  game: Array<IGame>,
  showGame: Array<IGame>,
  searchValue: string,
  searchRes:Array<IGame>,
  currentSortType: string,
  currentGameType: string,
  page: number,
  pageSize: number,
  total:number,
  loading: boolean
}