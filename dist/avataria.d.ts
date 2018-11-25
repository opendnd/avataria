import { Genders, IDNA, ILinkRace } from "@opendnd/core";
import { IAvatariaDefaults } from "./defaults";
export interface IAvatariaOpts {
    defaults?: IAvatariaDefaults;
    DNA?: IDNA;
    race?: ILinkRace;
    gender?: Genders;
}
declare class Avataria {
    opts: IAvatariaOpts;
    defaults: IAvatariaDefaults;
    race: ILinkRace;
    gender: Genders;
    constructor(opts?: IAvatariaOpts);
    validateOpts(opts?: IAvatariaOpts): IAvatariaOpts;
    generateSkinColor(trait: string): string;
    generateHairColor(trait: string): string;
    generateEyeColor(trait: string): string;
    generate(opts?: IAvatariaOpts): string;
}
export default Avataria;
