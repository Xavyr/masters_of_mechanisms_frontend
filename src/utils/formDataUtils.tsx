export const cleanQuotes = (quotes, name) => {
  return quotes
    .map(entity => {
      if (!entity.message) return;
      entity["titan"] = name;
      return entity;
    })
    .filter(el => el);
};

export const cleanPractices = (practices, name) => {
  return practices
    .map(entity => {
      if (!entity.practice || !entity.description) return;
      entity["titan"] = name;
      return entity;
    })
    .filter(el => el);
};

export const cleanParadigms = (paradigms, name) => {
  return paradigms
    .map(entity => {
      if (!entity.paradigm || !entity.background) return;
      entity["titan"] = name;
      return entity;
    })
    .filter(el => el);
};

export const cleanRoutines = (routines, name) => {
  return routines
    .map(entity => {
      if (!entity.routine) return;
      entity["titan"] = name;
      return entity;
    })
    .filter(el => el);
};

export const cleanInspirationals = (inspirationals, name) => {
  return inspirationals
    .map(entity => {
      if (!entity.source || !entity.story) return;
      entity["titan"] = name;
      return entity;
    })
    .filter(el => el);
};
