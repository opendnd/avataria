import { Genders } from "@opendnd/core";
import { IAvatariaOpts } from "./avataria";
import defaults from "./defaults";

const {
  genderOptions,
  races,
} = defaults;

export const sanitizeWizardOpts = (opts): IAvatariaOpts => {
  if (!genderOptions.includes(opts.gender)) { opts.gender = undefined; }
  if (opts.gender) { opts.gender = Genders[opts.gender]; }

  if (opts.race) {
    Object.values(races).forEach((race) => {
      if (race.name === opts.race) { opts.race = race; }
    });
  }

  // remove empty opts
  Object.keys(opts).forEach((key) => {
    if (opts[key] === "") { opts[key] = undefined; }
  });

  return opts;
};
