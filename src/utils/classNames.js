function classNames(...classList) {
  console.log(classList);
  //   let results = '';
  //   for (let classItem in classList) {
  //     if (typeof classItem === 'string') {
  //       if (this[className]) results += this[classItem];
  //     }
  //   }

  const results = classList
    .map((classItem) => {
      if (typeof classItem === 'string') {
        return ` ${this[classItem] || classItem}`;
      } else if (typeof classItem === 'array') {
        classItem.flat().map((className) => ` ${this[className] || className}`);
      } else if (typeof classItem === 'object') {
        let list = '';
        for (let key in classItem) {
          console.log({ value: classItem[key], key });
          if (classItem[key]) {
            list += ` ${this[key] || key}`;
          }
        }
        console.log(list);
        return list;
      }
    })
    .filter(Boolean)
    .join('')
    .trim();

  return results;
}

export default classNames;
