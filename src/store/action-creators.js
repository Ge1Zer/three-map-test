import actionField from './fieldsStore/action'
import actionUnits from './unitsStore/action'

export const allActionCreators = {
    ...actionField,
    ...actionUnits
}