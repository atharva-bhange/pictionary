import { nameType } from "types/storeType";
import { setNameActionCreatorType } from "types/actionCreatorTypes";
interface HeaderPropType {
	name?: nameType;
	setName: setNameActionCreatorType;
}

export default HeaderPropType;
