/**
 * Search exercises and workout
 * @param arr list of items to search through
 * @param query
 */
import utilsConstants from "./utilsConstants";

const searchExerciseOrWorkout = (arr, query) => {
  const filteredByEquipments = filterByEquipments(arr, query);
  const filteredByBodyParts = filterByBodyParts(arr, query);
  const filteredByTitle = filterByTitle(arr, query);
  return Array.from(
    new Set([
      ...filteredByEquipments,
      ...filteredByBodyParts,
      ...filteredByTitle,
    ]),
  );
};

/**
 * Filter by equipments
 * @param arr list of items to search through
 * @param query
 * @returns {unknown[]}
 */
const filterByEquipments = (arr, query) => {
  return arr.filter(item => {
    if (!item.equipments) {
      return false;
    }
    const lowerCaseEquipments = item.equipments.map(equipment =>
      equipment.toLowerCase(),
    );
    const matches = lowerCaseEquipments.filter(equipment => {
      if (equipment.indexOf(query.toLowerCase()) !== -1) {
        return true;
      }
    });
    return matches.length > 0;
  });
};

/**
 * Filter by body parts
 * @param arr list of items to search through
 * @param query
 * @returns {unknown[]}
 */
const filterByBodyParts = (arr, query) => {
  return arr.filter(item => {
    if (!item.equipments) {
      return false;
    }
    const lowerCaseBodyParts = item.bodyParts.map(part => part.toLowerCase());
    const matches = lowerCaseBodyParts.filter(part => {
      if (part.indexOf(query.toLowerCase()) !== -1) {
        return true;
      }
    });
    return matches.length > 0;
  });
};

/**
 * Filter by title
 * @param arr list of items to search through
 * @param query
 * @returns {unknown[]}
 */
const filterByTitle = (arr, query) => {
  return arr.filter(item => {
    if (!item.equipments) {
      return false;
    }
    const lowerCaseTitle = item.title.toLowerCase();
    return lowerCaseTitle.includes(query.toLowerCase());
  });
};

/**
 * Display body parts selected or empty
 * @returns {string[][]|*}
 */
const displayEmptyBodyPartsInfo = (selectedBodyParts) => {
  const bodyParts = selectedBodyParts.filter(item => item !== utilsConstants.defaults.DEFAULT_VALUE_BODYPART)
  return bodyParts.length === 0 ? [utilsConstants.defaults.DEFAULT_VALUE_BODYPART] : bodyParts
}

/**
 * Display equipments selected or empty
 * @returns {string[][]|*}
 */
const displayEmptyEquipmentsInfo = (selectedEquipments) => {
  const equipments = selectedEquipments.filter(item => item !== utilsConstants.defaults.DEFAULT_VALUE_EQUIPMENT)
  return equipments.length === 0 ? [utilsConstants.defaults.DEFAULT_VALUE_EQUIPMENT] : equipments
}

export {
  searchExerciseOrWorkout,
  displayEmptyBodyPartsInfo,
  displayEmptyEquipmentsInfo
};
