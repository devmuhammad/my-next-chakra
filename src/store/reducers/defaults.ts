
import {
    APP_CONFIG, ALL_PLANS
  } from "../actionTypes";


  const initialState = {
      allGradesNgn: <any[]>[],
      allPlansNgn: <any[]>[],
      appConfig : <any[]>[],
      allPlans: <any[]>[]
  };



  const DefaultsReducer = (state = initialState, action: any) => {
      switch (action.type) {
          
          case APP_CONFIG:
              return { ...state,
                // appConfig: action.payload,
                allGradesNgn: getNgnGrades(action.payload)
            };
          case ALL_PLANS:
              return {
                  ...state,
                //   allPlans: action.payload
                allPlansNgn: getNgnPlans(action.payload)
              }
          default:
              return {...state};
      }
  };

  const getNgnPlans = (allPlans: any) => {
    const plans = allPlans.filter((country: any) => {
        return country.country_id === 163;
      })
     
    const allplan = [...new Map(plans.map((item: any) =>
        [item['display_name'], item])).values()]
      return allplan
  }

  const getNgnGrades = (configData:any) => {
    const countryGroup = configData.countries.filter((country: any) => {
        return country.id === 163;
      });
      const gradeGroup = countryGroup[0].grade_groups;

      // const grades = gradeGroup.map((group: any) => group.grades);
      // const allgrades = grades.flat().sort((a: any, b: any) => a.id - b.id);

      return gradeGroup
  }
  export default DefaultsReducer;