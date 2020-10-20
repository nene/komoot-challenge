/**
 * A simplified implementation of https://www.npmjs.com/package/classnames
 */
export const classNames = (namesMap: Record<string, boolean>): string => {
  const classes = [];
  for (const [name, enabled] of Object.entries(namesMap)) {
    if (enabled) {
      classes.push(name);
    }
  }
  return classes.join(" ");
};
