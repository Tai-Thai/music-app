function classNames(...classList) {
  const results = classList
    // eslint-disable-next-line array-callback-return
    .map((classItem) => {
      if (typeof classItem === 'string') {
        return ` ${this[classItem] || classItem}`;
        // eslint-disable-next-line valid-typeof
      } else if (Array.isArray(classItem)) {
        return classItem.flat().map((className) => {
          if (typeof className === 'object') {
            const results = classNames.call(this, className);
            return ` ${results}`;
          }
          return ` ${this[className] || className}`;
        });
      } else if (typeof classItem === 'object') {
        let list = '';
        for (let key in classItem) {
          if (classItem[key]) {
            list += ` ${this[key] || key}`;
          }
        }
        return list;
      }
    })
    .flat()
    .join('')
    .trim();

  return results;
}

export default classNames;
