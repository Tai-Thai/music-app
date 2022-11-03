function classNames(...classList) {
  const results = classList
    // eslint-disable-next-line array-callback-return
    .map((classItem) => {
      if (typeof classItem === 'string') {
        return `${(this && this[classItem]) || classItem}`;
        // eslint-disable-next-line valid-typeof
      } else if (Array.isArray(classItem)) {
        return classItem.flat().map((className) => {
          if (typeof className === 'object') {
            const results = classNames.call(this, className);
            return `${results}`;
          }
          return `${(this && this[className]) || className}`;
        });
      } else if (typeof classItem === 'object') {
        let list = '';
        for (let key in classItem) {
          if (classItem[key]) {
            list += `${(this && this[key]) || key} `;
          }
        }
        return list;
      }
    })
    .flat()
    .filter(Boolean)
    .join(' ')
    .trim();

  // console.log({ results });
  return results;
}

export default classNames;
