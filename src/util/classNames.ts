type ClassNameInfo = Record<string, boolean> | string | undefined;

/**
 * Basic classNames implementation for toggling classes
 * @param classNameInfos Array of string or objects defining class names that should be included
 * @returns The className string with the enabled classes
 */
export default function classNames(...classNameInfos: ClassNameInfo[]): string {
  const classNames: string[] = [];

  classNameInfos.forEach((classNameInfo: ClassNameInfo) => {
    if (classNameInfo === undefined) {
      return;
    }

    // For strings, include as is
    if (typeof classNameInfo === 'string') {
      classNames.push(classNameInfo);
      return;
    }

    // For objects, include each property that is set to true
    Object.entries(classNameInfo).forEach(([className, isIncluded]) => {
      if (isIncluded) {
        classNames.push(className);
      }
    });
  });

  return classNames.join(' ');
}
