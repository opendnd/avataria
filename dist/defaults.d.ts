import { ILinkRace, IRace } from "@opendnd/core";
export interface IColorDictionary {
    [trait: string]: string;
}
export interface IRacesColorDictionary {
    [race: string]: IColorDictionary;
}
export interface IAvatariaDefaults {
    hairColors: IRacesColorDictionary;
    skinColors: IRacesColorDictionary;
    eyeColors: IRacesColorDictionary;
    races: {
        [uuid: string]: ILinkRace;
    };
    raceOptions?: string[];
    racesDict: {
        [uuid: string]: IRace;
    };
    genderOptions?: string[];
}
declare let defaults: IAvatariaDefaults;
export default defaults;
