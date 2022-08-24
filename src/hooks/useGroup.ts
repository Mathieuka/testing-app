import { GroupContext } from "../providers/GroupProvider";
import { useContext } from "react";

const useGroup = () => useContext(GroupContext);

export default useGroup;