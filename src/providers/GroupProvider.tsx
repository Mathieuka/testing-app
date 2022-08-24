import { cloneDeep, sortBy } from "lodash";
import React, { createContext, useMemo, useState, ReactElement} from "react";
import axios from "axios";

export enum GROUP_COLUMN_TITLE {
    TEAMS = "Teams",
    PURPOSE_AND_SENSITIVITY = "Purpose & Sensitivity",
    MEMBERS = "Member(s)"
}

export enum GROUP_PROP_NAME {
    NAME = "name",
    TAGS = "tags",
    MEMBERS_COUNT = "memberCount"
}

export interface tGroup {
    hasExternalSharing: boolean;
    id: string;
    isInactive: boolean;
    isOrphaned: boolean;
    isUncategorized: boolean;
    memberCount: number;
    name: string;
    tags: string[];
}

interface tGroupContext {
    groups: tGroup[];
    sortGroupBy: (prop: GROUP_PROP_NAME) => void;
    getPosts: (clientId: string) => Promise<void>;
}

export const GroupContext = createContext<tGroupContext>({} as tGroupContext);

const useGroupContext = (): tGroupContext => {
    const [groups, setGroups] = useState<tGroup[]>([]);
    const [sortAsc, setSortAsc] = useState(true);
    
    const getPosts = async (clientId: string) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/groups/?clientId=${clientId}`);
            
            if (response.status === 200) {
                setGroups(response?.data?.groups);
            }
        } catch(e: unknown) {
            console.error("Something Wrong");
        }
    };

    const sortGroupBy = (prop: GROUP_PROP_NAME) => {
        const result = sortBy(cloneDeep(groups), o => o[prop]);
        setGroups(sortAsc ? result : result.reverse());
        setSortAsc(!sortAsc);
    };

    const contextValue = useMemo(
        () => ({
            groups,
            sortGroupBy,
            getPosts
        }),
        [groups]
    );

    return contextValue;
};

const UserProvider = ({ children }: { children: ReactElement }) => {
    const context = useGroupContext();

    return <GroupContext.Provider value={context}>{children}</GroupContext.Provider>;

};

export default UserProvider;