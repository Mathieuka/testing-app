import { Button, Div, Divider, Flex, HtmlButton, Paragraph, SvgImage, Text,SortIcon } from "@sharegate/orbit-ui";
import { GROUP_COLUMN_TITLE, GROUP_PROP_NAME } from "../providers/GroupProvider";
import { ReactComponent as InactiveLogo } from "../assets/Inactive.svg";
import { ReactComponent as OrphanedLogo } from "../assets/Orphaned.svg";
import { ReactComponent as ShareGateLogo } from "../assets/logo_apricot.svg";
import { ReactComponent as SharingLogo } from "../assets/Sharing.svg";
import { ReactComponent as UncategorizedLogo } from "../assets/Uncategorized.svg";
import { capitalizeFirstLetter } from "../helpers/utils";
import { tGroup } from "../providers/GroupProvider";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useGroup from "../hooks/useGroup";
import useUser from "../hooks/useUser";

const groupsColumnsTitle: { title: GROUP_COLUMN_TITLE; propName: GROUP_PROP_NAME }[] = [
    { title: GROUP_COLUMN_TITLE.TEAMS, propName: GROUP_PROP_NAME.NAME },
    { title: GROUP_COLUMN_TITLE.PURPOSE_AND_SENSITIVITY, propName: GROUP_PROP_NAME.TAGS },
    { title: GROUP_COLUMN_TITLE.MEMBERS, propName: GROUP_PROP_NAME.MEMBERS_COUNT }
];

enum GroupFilters {
    IS_ORPHANED = "isOrphaned",
    IS_INACTIVE = "isInactive",
    IS_UNCATEGORIZED = "isUncategorized",
    HAS_EXTERNAL_SHARING = "hasExternalSharing"
}

const filterCardsConfig = [
    { logo: UncategorizedLogo, filter: GroupFilters.IS_UNCATEGORIZED, title: "Uncategorized" },
    { logo: OrphanedLogo, filter: GroupFilters.IS_ORPHANED, title: "Orphaned" },
    { logo: InactiveLogo, filter: GroupFilters.IS_INACTIVE, title: "Inactive" },
    { logo: SharingLogo, filter: GroupFilters.HAS_EXTERNAL_SHARING, title: "Sharing" }];



const FilterCards = ({ groups, handleSetGroupFiltersName }: { groups: tGroup[]; handleSetGroupFiltersName: (filter: GroupFilters | undefined) => void }) => (
    <Flex>
        {filterCardsConfig.map(({ logo, filter, title }) => (
            <Div key={filter}>
                <Div marginX="10px">
                    <HtmlButton onClick={() => handleSetGroupFiltersName(filter)} display="flex" alignItems="center">
                        <Flex direction="column" alignItems="start">
                            <Text>{groups.filter(group => group[filter]).length}</Text>
                            <Text>{title}</Text>
                        </Flex>
                        <SvgImage src={logo} aria-label="" margin={2}/>
                    </HtmlButton>
                </Div>
                <Text position="absolute" marginLeft="15px" marginTop="-20px" onClick={() => handleSetGroupFiltersName(undefined)}>Remove filter</Text>
            </Div>
        ))}
    </Flex>
);

const Cockpit = () => {
    const [groupFiltersName, setGroupFiltersName] = useState<GroupFilters>();
    const { user: { name, clientId }, handleLogout } = useUser();
    const { groups: allGroups, sortGroupBy, getPosts } = useGroup();
    const navigate = useNavigate();

    const groups = allGroups.filter(group => groupFiltersName ? group[groupFiltersName] : group);

    useEffect(() => {
        if (clientId) {
            (async function() {
                await getPosts(clientId);
            })();
        } else {
            navigate("/");
        }
    }, []);

    const handleSetGroupFiltersName = (filter: GroupFilters | undefined) => setGroupFiltersName(filter);

    return (
        <Div >
            <Div display="grid" gridTemplateColumns="1fr 140px" paddingX="56px" marginTop="20px">
                <ShareGateLogo/>
                <Div display="flex" gap="25px">
                    <Div display="flex" alignItems="center">
                        <Text>Admin</Text>
                    </Div>
                    <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                </Div>
            </Div>
            <Divider/>
            <Div paddingX="56px">
                <strong>
                    <Text marginBottom="8px" size="4xl">
                    Good morning, { capitalizeFirstLetter(name || "") }
                    </Text>
                </strong>
                <Paragraph marginBottom="32px">
                    Let's optimize your environment by reviewing the productivity-related item below.
                </Paragraph>
                <FilterCards groups={groups} handleSetGroupFiltersName={handleSetGroupFiltersName}/>
                <strong>
                    <Div display="flex" marginBottom="16px">
                    Total groups
                        <Div height="25px">
                            <Divider orientation="vertical"></Divider>
                        </Div>
                        {groups.length}
                    </Div>
                </strong>
                <Div display="grid" gridTemplateColumns="1fr 1fr 1fr" marginBottom="16px">
                    {groupsColumnsTitle.map(({ title,propName }) => (
                        <Div key={title} onClick={() => sortGroupBy(propName)} display="flex">{title}
                            <SortIcon />
                        </Div>
                    ))}
                </Div>
                <Divider/>
                {groups.map(({ id ,memberCount,name: groupName, tags }) => (
                    <Div key={id} marginBottom="24px">
                        <Div display="grid" gridTemplateColumns="1fr 1fr 1fr">
                            <strong><Div>{groupName}</Div></strong>
                            <Div display="flex">
                                <Div>{tags[0]}</Div>
                                {tags[1] && <Divider orientation="vertical"></Divider>}
                                <Div>{tags[1]}</Div>
                            </Div>
                            <Div>{memberCount}</Div>
                        </Div>
                        <Divider/>
                    </Div>))}
            </Div>
        </Div>);
};

export default Cockpit;