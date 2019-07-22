import pathToRegexp from 'path-to-regexp';


export function pathMatchRegexp(regexp, pathname) {
  // return pathToRegexp(regexp).exec(deLangPrefix(pathname));
  return pathToRegexp(regexp).exec(pathname);
}

export function queryLayout(layouts, pathname) {
  let result = 'public';

  const isMatch = regepx => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathMatchRegexp(regepx, pathname);
  };

  for (const item of layouts) {
    let include = false;
    let exclude = false;
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true;
          break;
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true;
          break;
        }
      }
    }

    if (include && !exclude) {
      result = item.name;
      break;
    }
  }

  return result;
}
