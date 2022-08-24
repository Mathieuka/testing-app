import { Button, Div, Text, TextInput } from "@sharegate/orbit-ui";
import { ReactComponent as ShareGateLogo } from "../assets/logo_apricot.svg";
import { emailValid } from "../helpers/utils";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Login = () => {
    const { handleLogin } = useUser();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const onEmailChange = useCallback(
        (event: any, newValue: any) => {
            setEmail(newValue);
        },
        [setEmail]
    );

    useEffect(() => {
        const clientIdFromSessionStorage = sessionStorage.getItem("clientId");
        if (clientIdFromSessionStorage) {
            navigate("/cockpit");
        }
    }, []);

    return (
        <Div display="flex" justifyContent="center" alignItems="center" height="100%" >
            <Div
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                padding="48px 48px 48px 48px"
                boxShadow="0px 3px 5px 0px rgba(0,0,0,0.44)"
                borderRadius="5px 5px 5px 5px" height="360px"
                width={{ base: "330px", xs: "417px" }} >
                <Div marginBottom="32px">
                    <ShareGateLogo/>
                </Div>
                <Text textAlign="center" color="alias-primary" marginBottom="40px">
                    Signin with your Microsoft account to manage your collaborative governance efforts
                </Text>
                <Div>
                    <Text color="alias-primary" marginBottom="8px" >Business email</Text>
                    <TextInput aria-label="email" textAlign="center" value={email} onValueChange={onEmailChange} marginBottom="8px" />
                </Div>
                {!emailValid(email) && !!email.length && <Text color="alias-alert" textAlign="center" marginBottom="20px">
                    Please enter a valid Microsoft account email
                </Text>}
                <Button disabled={!emailValid(email)} width="100%" onClick={() => handleLogin(email)}>Log in</Button>
            </Div>
        </Div>
    );
};
export default Login;
